import useWindowSize from "../hooks/useWindowSize";
import { useRouter } from "next/router";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import colors from "../styles/colors";
import { ArtGallery } from "../components/ArtGallery";
import { Footer } from "../components/Footer";
import { useEffect } from "react";

const Contact = () => {
  const { height, width } = useWindowSize();
  const isSmallScreen = width < 1200;
  const router = useRouter();
  const handleNavigation = (route: string) => {
    router.push(route);
  };

  // useEffect(() => {
  //   // redirect to Instagram
  //   window.location.href =
  //     "https://www.instagram.com/tristanbarrett19";
  // }, []);

  return (
    <Flex h="100vh" width="100%" direction="column" alignItems="center" justifyContent="flex-start" bg={colors.offBlack}>
      <Navbar text="CONTACT" />
      <Flex h="100%" align="center" direction={"column"} justify="center" color={colors.offWhite}>
        <Text>EMAIL ME</Text>
        <Text>bruidbarrett@gmail.com</Text>
      </Flex>
      <Spacer />
      <Footer />
    </Flex>
  );
};

export default Contact;
