import { Box, Flex, Text } from "@chakra-ui/react";
import colors from "../styles/colors";
import useWindowSize from "../hooks/useWindowSize";
import { useRouter } from "next/router";

interface Props {
  text?: string;
  fontSize?: string;
  borderW?: string;
  borderR?: string;
}

export const CategoryTag = ({ text = "ARCHIVES", fontSize = "16px", borderW = "3px", borderR = "11px" }: Props) => {
  const { width } = useWindowSize();
  const isSmallScreen = width < 600;
  const router = useRouter();

  const getColor = (text) => {
    const lowerCaseText = text.toLowerCase();
    if (["painting", "drawing", "web"].includes(lowerCaseText)) {
      return "#449AFF";
    } else if (["3d art", "3d animation", "2d animation"].includes(lowerCaseText)) {
      return "#FF4444";
    } else if (["ux"].includes(lowerCaseText)) {
      return "#E9E9E9";
    } else if (["graphics"].includes(lowerCaseText)) {
      return "#FF9F47";
    } else if (["apparel"].includes(lowerCaseText)) {
      return "#46D023";
    }
    return colors.offWhite;
  };

  const color = getColor(text);
  const displayText = text.toUpperCase();

  const hexToRGBA = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <Flex direction={"column"} alignItems="center">
      <Box bg={hexToRGBA(color, 0.1)} border={`${borderW} solid ${color}`} borderRadius={borderR} display="inline-flex" alignItems="center" justifyContent="center" px="10px" py="5px">
        <Text fontWeight="bold" color={color} fontSize={fontSize} my="-2px" mx="3px">
          {displayText}
        </Text>
      </Box>
    </Flex>
  );
};
