import React, { useState, useEffect } from "react";
import { Flex, Text, Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";

const Graph = () => {
  const [clarity, setClarity] = useState(50);
  const [output, setOutput] = useState(50);

  useEffect(() => {
    setOutput(100 - clarity);
  }, [clarity]);

  useEffect(() => {
    setClarity(100 - output);
  }, [output]);

  return (
    <Flex direction="column" align="center" justify="center" w="100%" maxW="600px" p={10}>
      <Text fontSize="xl" mb="30px" fontWeight="bold">
        Vision Clarity vs Output Graph
      </Text>
      <Flex position="relative" w="100%" h="300px">
        {/* Clarity Slider (X-axis) */}
        <Flex position="absolute" top="0" ml="30px" w="460px" left="0" right="0" alignItems="center">
          <Slider value={clarity} onChange={setClarity} min={0} max={100} w="100%">
            <SliderTrack bg="gray.200">
              <SliderFilledTrack bg="rgba(10, 120, 255, 0.9)" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
            <Text position="absolute" top="-20px" left="50%" transform="translateX(-50%)" fontSize="sm" color="blue.500">
              Clarity: {clarity}%
            </Text>
          </Slider>
        </Flex>

        {/* Output Slider (Y-axis) */}
        <Flex position="absolute" top="0" left="0" bottom="0" h="240px" mt="30px" flexDirection="column" alignItems="center">
          <Slider
            value={100 - output} // Flip the value
            onChange={(val) => setOutput(100 - val)} // Flip the onChange value
            min={0}
            max={100}
            orientation="vertical"
            h="100%"
          >
            <SliderTrack bg="green.500">
              <SliderFilledTrack bg="gray.200" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
            <Text position="absolute" left="-75px" top="50%" transform="translateY(-50%) rotate(-90deg)" fontSize="sm" whiteSpace="nowrap" color="green.500">
              Output: {output}%
            </Text>
          </Slider>
        </Flex>

        {/* Rectangle and Triangle */}
        <Box position="absolute" top="30px" left="30px" right="30px" bottom="30px" border="2px solid gray">
          <Box position="absolute" top="0" left="0" width={`${clarity}%`} height={`${output}%`} bg={output > 50 ? "rgba(0, 255, 0, 0.3)" : "rgba(10, 120, 255, 0.9)"} transition="all 0.3s ease" />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Graph;
