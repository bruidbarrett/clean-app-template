import useWindowSize from "../hooks/useWindowSize";
import { useRouter } from "next/router";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import NextImage from "next/image";
import { Navbar } from "../components/Navbar";
import colors from "../styles/colors";
import { ArtGallery } from "../components/ArtGallery";
import { Footer } from "../components/Footer";
import { CategoryTag } from "../components/CategoryTag";
import { useStore } from "../store";
import tristanData from "../tristanData.json";

const Tierlists = () => {
  const router = useRouter();
  const { width } = useWindowSize();
  const isSmallScreen = width < 1000;
  const isMobileView = width < 600;

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const { movies, shows, books, videogames } = tristanData.tierlists[0];

  return (
    <Flex mt={isMobileView ? "80px" : `${-20 + width * 0.04}px`} width="100%" direction="column">
      <Navbar text="ART" />

      <Flex direction={"column"} align={"center"} justify={"center"} p="10px" w="100%" mt={isMobileView ? "0px" : "118px"}>
        <Flex direction={"column"} align={"center"} mt="0px">
          <Text textAlign={"center"} fontSize={"22"}>
            GOD TIER ART FORMS
            <br />
          </Text>

          <Text textAlign={"center"} align={"center"} px={isMobileView ? "10px" : ""} mt="5px" maxW="440px" fontSize={"12px"}>
            Here lay a colleciton of media that are are god tier demonstrations of production, attention to detail, impact, emotion, and overall quality. I perpetually update this list as I discover new gold.
          </Text>
        </Flex>
        <Flex w="100%" maxW="870px" mb={isMobileView ? "30px" : "20px"} mt={isMobileView ? "20px" : "50px"} direction="column" align="center">
          <MediaSection title="MOVIES" items={movies} />
          <MediaSection title="SHOWS" items={shows} />
          <MediaSection title="BOOKS" items={books} />
          <MediaSection title="VIDEO GAMES" items={videogames} />
        </Flex>
      </Flex>
      <Spacer />
      <Footer />
    </Flex>
  );
};

const MediaSection = ({ title, items }) => {
  const router = useRouter();
  const { width } = useWindowSize();
  const isSmallScreen = width < 1000;
  const isMobileView = width < 600;

  const handleNavigation = (route) => {
    router.push(route);
  };

  return (
    <Flex w={isSmallScreen ? "" : "100%"} align={isSmallScreen ? "center" : "flex-start"} direction="column">
      <Text ml={isMobileView ? "" : ""} mb={isMobileView ? "-10px" : ""} mt={isMobileView ? "40px" : ""} fontSize="30px">
        {title}
      </Text>
      <Flex align={isSmallScreen ? "center" : "flex-start"} px="10px" mt="20px" gap="10px" mb={isMobileView ? "0px" : "50px"} wrap="wrap" justify={isSmallScreen ? "center" : "flex-start"}>
        {items.map((item) => (
          <div key={item.id} className="image-container">
            <Flex shrink="0" height={"240px"} w={"162px"} position="relative" overflow="hidden">
              <NextImage alt={item.title} src={item.image} fill style={{ objectFit: "cover" }} />
            </Flex>
            <div className="overlay">
              <Flex direction="column" align="center" px="10px">
                <Text textAlign="center" fontSize="12px">
                  {item.name}
                </Text>
                <Text textAlign="center" fontSize="8px">
                  {item.creator}
                </Text>
              </Flex>
            </div>
          </div>
        ))}
      </Flex>
      <style jsx>{`
        .image-container {
          position: relative;
          user-select: none;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .image-container:hover .overlay {
          opacity: 1;
        }
      `}</style>
    </Flex>
  );
};

export default Tierlists;
