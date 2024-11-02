import { extendTheme } from "@chakra-ui/react";
import colors from "./styles/colors";

const fonts = { mono: `'Menlo', monospace` };

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "black",
        fontFamily: "Aux Mono",
        color: colors.offWhite,
      },
      text: {
        fontFamily: "Aux Mono",
        color: colors.offWhite,
      },
    },
  },
  fonts,
  components: {
    Box: {
      variants: {
        project: {
          "&:hover": {
            ".overlay": {
              opacity: 0.5,
            },
            ".text": {
              opacity: 1,
            },
          },
        },
      },
    },
  },
});

export default theme;
