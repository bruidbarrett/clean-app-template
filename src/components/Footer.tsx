import { Flex, FlexProps, Spacer, Text, Image } from "@chakra-ui/react";
import colors from "../styles/colors";
import useWindowSize from "../hooks/useWindowSize";

export const Footer = (props: FlexProps) => {
  const { height, width } = useWindowSize();
  const isMobileView = width < 600;

  return (
    <Flex width="100%" justify="center">
      <Flex direction="column" pb="30px" textAlign={"center"}>
        <Text userSelect="none" fontSize={isMobileView ? "12px" : "20px"} mt="4px" fontWeight={"700"} color={colors.offWhite}>
          スペースゴッド
        </Text>
        <Text userSelect="none" fontSize={"13px"} fontStyle={"italic"} fontWeight={"600"} color={colors.offWhite}>
          THE INFINITE QUEST
        </Text>
      </Flex>
    </Flex>
  );
};
