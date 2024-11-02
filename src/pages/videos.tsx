import useWindowSize from "../hooks/useWindowSize";
import { useRouter } from "next/router";
import { Flex, Spacer } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import colors from "../styles/colors";
import { ArtGallery } from "../components/ArtGallery";
import { Footer } from "../components/Footer";
import { CategoryTag } from "../components/CategoryTag";

const Videos = () => {
  const { height, width } = useWindowSize();
  const isSmallScreen = width < 1200;
  const router = useRouter();
  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <Flex
      h="100vh"
      width="100%"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={colors.offBlack}
    >
      <Navbar text="ART" />
      <ArtGallery type={"videos"} />
      <Spacer />
      <Footer />
    </Flex>
  );
};

export default Videos;
