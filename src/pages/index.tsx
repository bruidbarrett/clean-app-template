import useWindowSize from "../hooks/useWindowSize";
import { useRouter } from "next/router";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import colors from "../styles/colors";

const Home = () => {
  const { height, width } = useWindowSize();
  const isSmallScreen = width < 1200;
  const router = useRouter();
  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <Flex h="100vh" width="100%" direction="column" alignItems="center" justifyContent="flex-start" bg={colors.offBlack}>
      <Text mt="50px">Start Here - index.tsx</Text>
      <Text mt="10px">Clean NextJS App Template</Text>
    </Flex>
  );
};

export default Home;
