import { Flex, Text } from "@chakra-ui/react";
import { useStore } from "../store";
import { useRouter } from "next/router";
import Masonry from "react-masonry-css";
import NextImage from "next/image";
import colors from "../styles/colors";
import { CategoryTag } from "./CategoryTag";
import useWindowSize from "../hooks/useWindowSize";
import tristanData from "../tristanData.json";

export const ArtGallery = ({ type }) => {
  const router = useRouter();
  const { width } = useWindowSize();
  const isSmallScreen = width < 1000;
  const isMobileView = width < 600;

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  // Sort the projects by date
  const visibleProjects = [...tristanData.projects].filter((project) => !project.hidden);
  const photos = tristanData.photos;
  const videos = tristanData.videos;

  const contentToShow = () => {
    console.log("type", type);
    if (type == "photos") {
      return photos;
    } else if (type == "videos") {
      return videos;
    }
    return visibleProjects;
  };

  return (
    <>
      <Flex mb="0px" p="10px" w="100%" bg="black " mt={isMobileView ? "0px" : `${-60 + width * 0.04}px`}>
        <Masonry breakpointCols={isSmallScreen ? (isMobileView ? 1 : 2) : 3} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
          {type === "art" &&
            contentToShow().map((project, index) => (
              <div key={index} className="image-container" onClick={() => handleNavigation(`project/${project.slug}`)}>
                <div className="overlay-container">
                  <NextImage src={project.images[0]} layout="responsive" width={100} height={100} objectFit="cover" alt={project.name} />
                  {!isSmallScreen && (
                    <div className="overlay">
                      <Flex direction="column" align="center" color={colors.offWhite}>
                        <Text fontSize={"20px"}>{project.date.toUpperCase()}</Text>
                        <Text align={"center"} lineHeight={"40px"} py="35px" textAlign={"center"} px="5px" fontWeight={"bold"} fontSize={"2.4vw"} mt="-10px">
                          {project.name.toUpperCase()}
                        </Text>
                        <Flex direction="row" mt="-6px" bg="none" w="100%" justify="center">
                          {project.tags.map((tag, tagIndex) => (
                            <Flex px="5px" key={tagIndex}>
                              {" "}
                              {/* Moved key here */}
                              <CategoryTag text={tag} />
                            </Flex>
                          ))}
                        </Flex>
                      </Flex>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </Masonry>
      </Flex>
      <style jsx global>
        {`
          .my-masonry-grid {
            display: flex;
            width: 100%;
          }

          .my-masonry-grid_column {
            padding-left: 5px; /* gutter size */
            padding-right: 5px; /* gutter size */
            background-clip: padding-box;
          }

          .my-masonry-grid_column span {
            width: 100% !important;
          }

          .next-image {
            object-fit: cover;
          }

          .image-container {
            padding-bottom: 10px;
            cursor: pointer; /* Changes cursor on hovering over the image */
          }

          .overlay-container {
            position: relative;
          }

          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .image-container:hover .overlay {
            opacity: 1; /* Show overlay on hover */
          }
        `}
      </style>
    </>
  );
};

export default ArtGallery;
