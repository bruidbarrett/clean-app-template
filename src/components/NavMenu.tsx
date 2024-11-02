import { Flex, Menu, MenuButton, MenuList, MenuItem, Button, Box, useDisclosure } from "@chakra-ui/react";
import { IoMenu, IoCamera, IoVideocam, IoChatbubble, IoList, IoMail, IoBrush } from "react-icons/io5";
import colors from "../styles/colors";
import useWindowSize from "../hooks/useWindowSize";
import { useRouter } from "next/router";
import { RiSkipBackFill } from "react-icons/ri";
import { useRef, useEffect, useState } from "react";

export const NavMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { height, width } = useWindowSize();
  const isMobileView = width < 600;
  const router = useRouter();

  const dropdownRef = useRef(null); // Step 1: Create a ref for the dropdown
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);

  // Step 2: Add event listener to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownMenu(false); // Close the dropdown if click is outside
      }
    };

    // Add when the dropdown is open and remove when it is closed
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Step 3: Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownMenu]);

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const calculateWidth = (text) => {
    const baseWidth = 50;
    const perCharacterWidth = 17;
    return `${Math.max(baseWidth + text.length * perCharacterWidth, 100)}px`;
  };

  const currentPage = () => {
    const route = router.pathname;
    if (route.includes("/photos")) return "PHOTOS";
    if (route.includes("/videos")) return "VIDEOS";
    if (route.includes("/quotes")) return "QUOTES";
    if (route.includes("/tierlists")) return "TIERLISTS";
    if (route.includes("/contact")) return "CONTACT";
    return "ART"; // Default to "ART" if none of the above
  };

  const selectIconForRoute = (route) => {
    if (route.includes("/photos")) return <IoCamera size="20px" />;
    if (route.includes("/videos")) return <IoVideocam size="20px" />;
    if (route.includes("/quotes")) return <IoChatbubble size="20px" />;
    if (route.includes("/tierlists")) return <IoList size="20px" />;
    if (route.includes("/contact")) return <IoMail size="20px" />;
    return <IoBrush size="20px" />;
  };

  const current = currentPage();
  const currentIcon = selectIconForRoute(router.pathname);

  const MenuItem = ({ route, children, icon }) => (
    <Flex
      onClick={() => {
        router.push(route);
      }}
      alignItems="center"
      bg={openDropdownMenu && current === children ? "#333" : "none"}
      color={openDropdownMenu && current === children ? "white.300" : "offWhite"}
      ml="-18px"
      _active={openDropdownMenu ? { bg: "none" } : {}}
      mt={isMobileView ? "1px" : "1px"}
      _hover={isMobileView ? { bg: "none" } : { bg: "#222" }}
      py="5px"
      px="9px"
      transition="all 0.2s ease-in-out"
      borderRadius="md"
      gap="2"
    >
      {isMobileView && !openDropdownMenu ? <IoList size="20px" /> : icon}
      {isMobileView && openDropdownMenu && children}
      {!isMobileView && children}
    </Flex>
  );

  return (
    <Flex direction="column" position="relative" ref={dropdownRef}>
      {router.pathname.includes("/project") || router.pathname.includes("/about") ? (
        <Flex>
          <Button
            as={Button}
            bg={"none"} // Adjust to match your flex container's background
            borderRadius="12px"
            border="2px solid transparent"
            // onMouseEnter={onOpen}
            // onMouseLeave={onClose}
            _hover={{
              // border: "2px solid #FAF4E8",
              bg: colors.offBlack,
              textDecoration: "underline",
              textUnderlineOffset: "8px",
            }}
            _active={{
              bg: "none",
            }}
            onClick={() => handleNavigation("/")}
            px="0px"
            fontWeight="normal"
            color={colors.offWhite}
            fontSize={isMobileView ? "16" : "22px"}
          >
            <Flex mt={isMobileView ? "-9px" : "5px"}>
              <Flex mt={isMobileView ? "0px" : "-1px"} mr="4px">
                <RiSkipBackFill size={isMobileView ? "17px" : "28px"} />
              </Flex>
              BACK
            </Flex>
          </Button>
        </Flex>
      ) : (
        // NAV MENU
        <Flex
          align={"flex-start"}
          justify={"flex-start"}
          direction={"column"}
          as={Button}
          bg={"none"}
          borderRadius="8px"
          position={"fixed"}
          _active={openDropdownMenu ? { bg: "none" } : {}}
          w={openDropdownMenu ? "185px" : calculateWidth(currentPage())}
          h={openDropdownMenu ? "202px" : "43px"}
          border="2px solid transparent"
          _hover={{
            background: "none",
          }}
          transition="all 0.2s ease-in-out"
          onClick={() => setOpenDropdownMenu(!openDropdownMenu)}
          // py="10px"
          mt={isMobileView ? "-4px" : "0px"}
          fontWeight="normal"
          color={colors.offWhite}
          fontSize={isMobileView ? "16" : "22px"}
        >
          <Flex
            onClick={() => {
              if (openDropdownMenu) {
                handleNavigation("/");
              }
            }}
            w="100%"
          >
            {openDropdownMenu ? (
              <MenuItem route="/" icon={<IoBrush size="20px" />}>
                ART
              </MenuItem>
            ) : (
              <>
                {router.pathname === "/" && (
                  <MenuItem route="/" icon={<IoBrush size="20px" />}>
                    ART
                  </MenuItem>
                )}
                {router.pathname === "/photos" && (
                  <MenuItem route="/photos" icon={<IoCamera size="20px" />}>
                    PHOTOS
                  </MenuItem>
                )}
                {router.pathname === "/videos" && (
                  <MenuItem route="/videos" icon={<IoVideocam size="20px" />}>
                    VIDEOS
                  </MenuItem>
                )}
                {router.pathname === "/quotes" && (
                  <MenuItem route="/quotes" icon={<IoChatbubble size="20px" />}>
                    QUOTES
                  </MenuItem>
                )}
                {router.pathname === "/tierlists" && (
                  <MenuItem route="/tierlists" icon={<IoList size="20px" />}>
                    TIERLISTS
                  </MenuItem>
                )}
                {router.pathname === "/contact" && (
                  <MenuItem route="/contact" icon={<IoMail size="20px" />}>
                    CONTACT
                  </MenuItem>
                )}
              </>
            )}
          </Flex>
          {openDropdownMenu && (
            <Flex direction={"column"}>
              {/* <MenuItem route="/photos" icon={<IoCamera size="20px" />}>
                PHOTOS
              </MenuItem>
              <MenuItem route="/videos" icon={<IoVideocam size="20px" />}>
                VIDEOS
              </MenuItem> */}
              {/* <MenuItem route="/quotes" icon={<IoChatbubble size="20px" />}>
                QUOTES
              </MenuItem> */}
              <MenuItem route="/tierlists" icon={<IoList size="20px" />}>
                TIERLISTS
              </MenuItem>
              <MenuItem route="/contact" icon={<IoMail size="20px" />}>
                CONTACT
              </MenuItem>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};
