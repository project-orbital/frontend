import { Box, VStack } from "@chakra-ui/react";
import Sidebar from "./sidebar/Sidebar";
import Card from "./Card";
import Navbar from "./navbar/Navbar";

/**
 * Template component for a page with the sidebar included.
 *
 * The children elements of the page will be vertically stacked.
 * A typical body of a page includes a breadcrumb trail before the rest of the content.
 *
 * @param variant "auth" for authentication pages, "app" for application pages
 * @param heading the heading only used for the authentication pages
 * @param children the children elements of the page
 * @param page the page that will be selected in the sidebar
 * @return the page populated with the sidebar and children elements
 */
export default function PageTemplate({ variant, heading, children, page }) {
    if (variant === "auth") {
        return (
            <VStack spacing="0" bg="bg">
                <Navbar />
                <VStack justify="center" minH="100vh" spacing="0" w="60%">
                    <Card
                        isCentered
                        isDarkModeReady
                        isStandalone
                        heading={heading}
                    >
                        {children}
                    </Card>
                </VStack>
            </VStack>
        );
    }
    return (
        <Box>
            <Sidebar selected={page} />
            <VStack
                w="calc(100vw - 160px)"
                h="100vh"
                ml="160px" // accounts for the width of the sidebar
                p="40px"
                spacing="40px"
                align="start"
                overflowX="auto"
                float="left"
            >
                {children}
            </VStack>
        </Box>
    );
}
