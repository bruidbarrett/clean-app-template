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
import { useEffect, useState } from "react";

const Quotes = () => {
  const router = useRouter();
  const { width } = useWindowSize();
  const isMobileView = width < 600;

  const [quoteOTD, setQuoteOTD] = useState({ text: "", author: "" });
  const [remainingQuotes, setRemainingQuotes] = useState([]);

  useEffect(() => {
    const quotes = tristanData.quotes;
    // Generate today's date in PST
    const today = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const date = new Date(today);
    const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

    // Seed random to consistently select a random quote of the day
    const randomIndex = Math.floor(seedRandom(seed) * quotes.length);
    const selectedQuote = quotes[randomIndex];
    setQuoteOTD(selectedQuote);

    // Filter out the quote of the day from the rest of the quotes
    const filteredQuotes = quotes.filter((quote, index) => index !== randomIndex);
    setRemainingQuotes(filteredQuotes);
  }, []);

  // Custom seed-based random generator
  const seedRandom = (seed) => {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return (
    <Flex mt={isMobileView ? "80px" : `${0 + width * 0.04}px`} width="100%" direction="column" alignItems="center" justifyContent="flex-start" bg={colors.offBlack}>
      <Navbar text="ART" />

      <Flex direction={"column"} align={"center"} mb="0px" px="20px" w="100%" mt={isMobileView ? "0px" : "100px"}>
        <Flex>
          <Flex direction="column" mb={isMobileView ? "30px" : "60px"} mt="0px">
            <Text mt="0px" mb="8px" fontSize={"13px"}>
              QUOTE OF THE DAY:
            </Text>
            <Flex bg="#181818" w="100%" maxW="600px" px="20px" py="20px" border="2px solid #ddd" borderRadius={"12px"} direction={"column"}>
              <Text fontStyle={"italic"} fontSize={"17px"}>
                {quoteOTD.text}
              </Text>
              <Text color="gray.400" ml="30px" mt="12px" fontSize={"14px"}>
                -{quoteOTD.author}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" maxW="800px" direction="column" mt="10px" justify="flex-start">
          {/* MAPPING of movies, tv shows, & books */}
          {remainingQuotes.map((quote, index) => (
            <Flex key={index} direction="column" mb="60px">
              <Text fontStyle={"italic"} fontSize={"17px"}>
                {quote.text}
              </Text>
              <Text color="gray.400" ml="30px" mt="12px" fontSize={"14px"}>
                -{quote.author}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Spacer />
      <Footer />
    </Flex>
  );
};

export default Quotes;
