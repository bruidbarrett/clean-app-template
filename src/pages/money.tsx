import React, { useState, useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { useRouter } from "next/router";
import { Flex, Spacer, Text, Image, Button, Input, Switch } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import colors from "../styles/colors";
import { Footer } from "../components/Footer";

const Money = () => {
  const { height, width } = useWindowSize();
  const isMobileView = width < 700;
  const router = useRouter();

  // State management for Tab4 logic
  const [dailyVolume, setDailyVolume] = useState("");
  const [protocolFee, setProtocolFee] = useState("0.1");
  const [personalFee, setPersonalFee] = useState("32");
  const [showYearlyProfit, setShowYearlyProfit] = useState(false);
  const [profit, setProfit] = useState("");

  const formatNumber = (num) => {
    if (num === "") return "";
    return "$" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const unformatNumber = (str) => {
    return str.replace(/[$,]/g, "");
  };

  const calculateProfit = (volume) => {
    const volumeValue = parseFloat(unformatNumber(volume)) || 0;
    const protocolFeeDecimal = parseFloat(protocolFee) / 100;
    const personalFeeDecimal = parseFloat(personalFee) / 100;

    const dailyProfit = volumeValue * protocolFeeDecimal * personalFeeDecimal;
    const yearlyProfit = dailyProfit * 365;

    return formatNumber((showYearlyProfit ? yearlyProfit : dailyProfit).toFixed(2));
  };

  const calculateVolume = (inputProfit) => {
    const protocolFeeDecimal = parseFloat(protocolFee) / 100;
    const personalFeeDecimal = parseFloat(personalFee) / 100;
    const profitValue = parseFloat(unformatNumber(inputProfit)) || 0;

    const calculatedVolume = profitValue / (protocolFeeDecimal * personalFeeDecimal);
    return showYearlyProfit ? calculatedVolume / 365 : calculatedVolume;
  };

  const handleDailyVolumeChange = (e) => {
    const unformattedText = unformatNumber(e.target.value);
    if (!isNaN(unformattedText) || unformattedText === "") {
      setDailyVolume(formatNumber(unformattedText));
      setProfit(calculateProfit(unformattedText));
    }
  };

  const handleProfitChange = (e) => {
    const unformattedText = unformatNumber(e.target.value);
    if (!isNaN(unformattedText) || unformattedText === "") {
      setProfit(formatNumber(unformattedText));
      const calculatedVolume = calculateVolume(unformattedText);
      setDailyVolume(formatNumber(calculatedVolume.toFixed(2)));
    }
  };

  useEffect(() => {
    if (dailyVolume !== "") {
      setProfit(calculateProfit(dailyVolume));
    }
  }, [protocolFee, personalFee, showYearlyProfit]);

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <Flex h={isMobileView ? "none" : "100vh"} width="100%" direction="column" alignItems="center" justifyContent="flex-start">
      <Flex h="100%" w="100%" align={isMobileView ? "none" : "center"} justify="center">
        <Flex mt={isMobileView ? "100px" : "-75px"} w={isMobileView ? "90vw" : "900px"} h="auto" direction="column" alignItems="center">
          {/* Daily Volume Input */}
          <Flex direction="column" w="100%" maxW="600px" mb={5}>
            <Text fontSize="14px" color="#39ff14" mb={1}>
              Bridge Volume
            </Text>
            <Input value={dailyVolume} onChange={handleDailyVolumeChange} placeholder="$0" color="#39ff14" borderColor="#39ff14" _placeholder={{ color: "#f0f0f0" }} fontSize="18px" />
          </Flex>

          {/* Protocol Fee and Personal Fee Inputs */}
          <Flex w="100%" maxW="600px" justify="space-between" mb={5}>
            <Flex direction="column" w="48%">
              <Text fontSize="14px" color="#666" mb={1}>
                Protocol Fee (%)
              </Text>
              <Input value={protocolFee} onChange={(e) => setProtocolFee(e.target.value)} placeholder="0.05" color="#666" borderColor="#666" _placeholder={{ color: "#f0f0f0" }} fontSize="18px" />
            </Flex>
            <Flex direction="column" w="48%">
              <Text fontSize="14px" color="#666" mb={1}>
                Personal Fee (%)
              </Text>
              <Input value={personalFee} onChange={(e) => setPersonalFee(e.target.value)} placeholder="32" color="#666" borderColor="#666" _placeholder={{ color: "#f0f0f0" }} fontSize="18px" />
            </Flex>
          </Flex>

          {/* Profit Input */}
          <Flex direction="column" w="100%" maxW="600px" mb={5}>
            <Text fontSize="14px" color="#39ff14" mb={1}>
              Profit
            </Text>
            <Input value={profit} onChange={handleProfitChange} placeholder="$0" color="#39ff14" borderColor="#39ff14" _placeholder={{ color: "#f0f0f0" }} fontSize="18px" />
          </Flex>

          {/* Yearly/Daily Toggle */}
          <Flex w="100%" maxW="600px" justify="flex-end" align="center">
            <Text color="#f0f0f0" mr={2}>
              {showYearlyProfit ? "Annualized" : "Daily"}
            </Text>
            <Switch isChecked={showYearlyProfit} onChange={() => setShowYearlyProfit(!showYearlyProfit)} colorScheme="green" />
          </Flex>
        </Flex>
      </Flex>

      <Flex mt={isMobileView ? "580px" : "0px"}></Flex>
    </Flex>
  );
};

export default Money;
