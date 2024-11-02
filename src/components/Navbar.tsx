import { Box, Button, Flex, FlexProps, Spacer, Text } from "@chakra-ui/react";
import colors from "../styles/colors";
import useWindowSize from "../hooks/useWindowSize";
import { useRouter } from "next/router";
import { IoMenu } from "react-icons/io5";
import { NavMenu } from "./NavMenu";

interface Props extends FlexProps {
  text?: string;
  showAbout?: boolean;
}

export const Navbar = ({ text, showAbout = true }: Props) => {
  const { height, width } = useWindowSize();
  const isMobileView = width < 600;
  const router = useRouter();
  const fontSize = isMobileView ? "20px" : "20px";
  let displayText = "ARCHIVES"; // Default text

  if (router.pathname === "/library") {
    displayText = "LIBRARY";
  }
  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <Flex
      width="100%"
      bg={router.pathname === "/" ? "rgba(10, 10, 10, 0.4)" : "none"} // Downward drop shadow
      direction={"column"}
      backdropFilter={router.pathname === "/" ? "blur(10px)" : router.pathname === "/tierlists" ? "blur(10px)" : "none"} // Apply blur for glass effect
      opacity={0.9}
      position={router.pathname === "/" ? "fixed" : router.pathname === "/tierlists" ? "fixed" : "absolute"}
      pb="20px"
      top={0}
      left={0}
      right={0}
      zIndex={1000} // Ensure it's above other content
      boxShadow={router.pathname === "/" ? "0px 10px 12px rgba(0, 0, 0, 0.4)" : router.pathname === "/tierlists" ? "0px 10px 12px rgba(0, 0, 0, 0.4)" : "none"} // Downward drop shadow
    >
      <Flex direction="row" w="100%" px={"14px"} pt="12px">
        <Flex flex="1">
          <NavMenu />
        </Flex>
        <Flex direction="column" align={"center"}>
          <Flex alignItems="center" mt="5px" direction="column">
            <Text color={colors.offWhite} fontSize={"15px"} mb="-10px">
              TRISTAN BARRETT
            </Text>
            <Text color={colors.offWhite} fontSize={"2.5vw"} fontWeight="bold" py="4px" mb="-8px">
              スペースゴッド
            </Text>
            {!isMobileView && (
              <Text color={colors.offWhite} fontSize={"15px"}>
                ARCHIVES
              </Text>
            )}
          </Flex>
        </Flex>
        {/* CONTACT BUTTON */}
        <Flex flex="1" justify={"flex-end"}>
          {showAbout ? (
            <Flex h="35px" onClick={() => handleNavigation("/about")} cursor={"pointer"} py="2px">
              <Button
                bg="none"
                borderRadius="5px"
                border="2px solid transparent"
                _active={{
                  bg: "none",
                }}
                _hover={{
                  // border: "2px solid #FAF4E8",
                  textDecoration: "underline",
                  textUnderlineOffset: "8px",
                }}
                mt={isMobileView ? "-6px" : "0px"}
                px={"0px"}
                fontWeight="normal"
                color={colors.offWhite}
                fontSize={isMobileView ? "16" : "22px"}
              >
                ABOUT
              </Button>
            </Flex>
          ) : (
            <Flex h="35px" w="706px" cursor={"pointer"} py="2px">
              <Button
                bg="none"
                _hover={{
                  bg: "none",
                }}
                _active={{
                  bg: "none",
                }}
                cursor={"default"}
                px={"6px"}
                fontWeight="normal"
                color={colors.offWhite}
                fontSize={"22px"}
              ></Button>
            </Flex>
          )}
        </Flex>
      </Flex>
      {/* <Flex alignItems="center" justifyContent="center" direction="column"></Flex> */}
    </Flex>
  );
};
