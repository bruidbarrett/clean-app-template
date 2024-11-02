import useWindowSize from "../hooks/useWindowSize";
import { useRouter } from "next/router";
import { Flex, Spacer, Text, Image, Button } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import colors from "../styles/colors";
import { ArtGallery } from "../components/ArtGallery";
import { Footer } from "../components/Footer";

const About = () => {
  const { height, width } = useWindowSize();
  const isMobileView = width < 700;
  const router = useRouter();
  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <Flex h={isMobileView ? "none" : "100vh"} width="100%" direction="column" alignItems="center" justifyContent="flex-start">
      <Navbar text="HOME" showAbout={false} />
      <Flex h="100%" w="100%" align={isMobileView ? "none" : "center"} justify="center">
        <Flex mt={isMobileView ? "100px" : "-75px"} w="900px" h="360px" direction={isMobileView ? "column" : "row"}>
          <Image px={isMobileView ? "5vw" : "0px"} h={isMobileView ? "500px" : "450px"} src="/images/aboutme.png" objectFit="contain" />
          <Flex pl={isMobileView ? "5vw" : "30px"} pr={isMobileView ? "5vw" : "0px"} direction="column">
            <Text letterSpacing={"0.5px"} mt={isMobileView ? "30px" : "-4px"} fontSize={"14px"}>
              <strong>tristan.art</strong> is an ongoing series of artistic endeavors and experiments, created and curated as a form of self-expression, free will, and exploration to better understand reality, consciousness, and creativity to the fullest extent.
              <br />
              <br />
              Creation is the purest form of magic, and curiosity about the world around and within us fuels an endless fountain of inspiration along the journey. <br />
              <br />
              Stay curious my friends.
            </Text>
            <Flex justify={isMobileView ? "center" : ""}>
              <Button mt="150px" h="30px" fontSize={"12px"} w="110px" bg={colors.appbarGray} onClick={() => handleNavigation("/contact")}>
                Contact Me
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* <Spacer /> */}
      <Flex mt={isMobileView ? "580px" : "0px"}>
        <Footer />
      </Flex>
    </Flex>
  );
};

export default About;
