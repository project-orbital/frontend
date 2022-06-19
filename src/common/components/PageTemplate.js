import { Box, VStack } from "@chakra-ui/react";
import Sidebar from "./sidebar/Sidebar";

/**
 * Template component for a page with the sidebar included.
 *
 * The children elements of the page will be vertically stacked.
 * A typical body of a page includes a breadcrumb trail before the rest of the content.
 *
 * @param children the children elements of the page
 * @param page the page that will be selected in the sidebar
 * @return the page populated with the sidebar and children elements
 */
export default function PageTemplate({ children, page }) {
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
