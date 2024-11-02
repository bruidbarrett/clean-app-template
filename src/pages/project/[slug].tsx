import { useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "../../store";
import { Text, Flex, Image, Center, Box, Button, color, Spacer } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import colors from "../../styles/colors";
import { CategoryTag } from "../../components/CategoryTag";
import tristanData from "../../tristanData.json";
import useWindowSize from "../../hooks/useWindowSize";

const ProjectPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);
  const { height, width } = useWindowSize();
  const isMobileView = width < 600;

  const project = tristanData.projects.find((p) => p.slug === slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    return <Text>Project not found</Text>;
  }

  const handlePreviousClick = () => {
    setCurrentImageIndex((oldIndex) => (oldIndex > 0 ? oldIndex - 1 : project.images.length - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((oldIndex) => (oldIndex + 1) % project.images.length);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <Flex direction={"column"}>
      <Navbar />
      <Center flexDirection="column" my={isMobileView ? "-60px" : "15px"} pt="135px">
        <Flex justify="center" align="center" width="full" px="25px">
          <Image
            // open image in new tab
            onClick={() => window.open(project.images[currentImageIndex], "_blank")}
            src={project.images[currentImageIndex]}
            w="100%"
            maxH={"67vh"}
            objectFit="contain"
          />
        </Flex>

        {project.images.length > 1 && (
          <Flex mt="40px" px={isMobileView ? "20px" : "none"}>
            <Button _active={{ bg: "#555" }} _focus={{ bg: "#555" }} _hover={{ bg: "#555" }} bg={"#222"} onClick={handlePreviousClick}>
              &lt;
            </Button>
            <Flex mx="20px">
              {project.images.map((image, index) => (
                <Box key={index} borderWidth={2} borderColor={index === currentImageIndex ? "blue.500" : "gray.200"} borderRadius="md" overflow="hidden" cursor="pointer" onClick={() => handleImageClick(index)} mx="5px">
                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    boxSize="50px"
                    objectFit="cover"

                    // quality={25} // Add this line
                  />
                </Box>
              ))}
            </Flex>
            <Button _active={{ bg: "#555" }} _focus={{ bg: "#555" }} _hover={{ bg: "#555" }} bg={"#222"} onClick={handleNextClick}>
              &gt;
            </Button>
          </Flex>
        )}

        <Flex mb={isMobileView ? "30px" : "0px"} direction={isMobileView ? "column" : "row"} mt={!isMobileView ? (project.images.length > 1 ? "-45px" : "35px") : "50px"} w="100%" px={!isMobileView ? `${300 - project.images.length * 50}px` : "30px"}>
          <Flex textAlign="left" direction="column" flex={3} pr="40px">
            <Text fontSize="30px" mt="-20px" fontWeight="bold">
              {project.name}
            </Text>
            <Text fontSize="16px" mt="-2px" color={colors.newGray}>
              {project.date.toUpperCase()}
            </Text>

            <Text mt="4px" fontSize={"15px"}>
              {project.description}
            </Text>
          </Flex>
          {isMobileView ? (
            <Flex direction="row" flex={1} mt="4px" align={"flex-start"} justify={"flex-start"}>
              {project.collaborators?.length > 0 && (
                <>
                  <Flex direction={"column"}>
                    <Text mt="10px" fontFamily={"helvetica"} fontSize={"12px"} color="#eee" fontWeight={"bold"}>
                      COLLABORATORS:
                    </Text>
                    {project.collaborators?.map((collaborator, index) => {
                      if (index % 2 === 0) {
                        return (
                          <a href={project.collaborators[index + 1]} key={index} target="_blank" rel="noopener noreferrer">
                            <Text color={"#666"} textDecoration="underline" mt="4px" fontSize={"10px"} textUnderlineOffset={"4px"}>
                              {collaborator}
                            </Text>
                          </a>
                        );
                      }
                      return null;
                    })}
                  </Flex>
                  <Spacer />
                </>
              )}
              <Flex my="10px">
                {project.tags.map((category, index) => (
                  <Flex pr="10px">
                    <CategoryTag key={index} text={category} fontSize="10px" borderR="8px" borderW="2px" />
                  </Flex>
                ))}
              </Flex>{" "}
            </Flex>
          ) : (
            <Flex direction="row" flex={1} align={"flex-start"} justify={"flex-end"}>
              {project.collaborators?.length > 0 && (
                <Flex direction={"column"}>
                  <Text fontFamily={"helvetica"} fontSize={"15px"} fontWeight={"bold"}>
                    COLLABORATORS:
                  </Text>
                  {project.collaborators?.map((collaborator, index) => {
                    if (index % 2 === 0) {
                      return (
                        <a href={project.collaborators[index + 1]} key={index} target="_blank" rel="noopener noreferrer">
                          <Text color={"#666"} textDecoration="underline" textUnderlineOffset={"4px"}>
                            {collaborator}
                          </Text>
                        </a>
                      );
                    }
                    return null;
                  })}
                </Flex>
              )}
              <Flex ml="20px">
                {project.tags.map((category, index) => (
                  <Flex pl="10px">
                    <CategoryTag key={index} text={category} />
                  </Flex>
                ))}
              </Flex>
            </Flex>
          )}
        </Flex>
      </Center>
    </Flex>
  );
};

export default ProjectPage;
