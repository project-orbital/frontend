import { Box, VStack } from "@chakra-ui/react";
import Card from "./Card";
import Navbar from "../../common/components/navbar/Navbar";

/**
 * Template component for a page with the sidebar included.
 *
 * The children elements of the page will be vertically stacked.
 * A typical body of a page includes a breadcrumb trail before the rest of the content.
 *
 * @param heading the heading only used for the authentication pages
 * @param children the children elements of the page
 * @param buttons an array of components to be displayed in the navbar
 * @return the page populated with the sidebar and children elements
 */
export default function PageTemplate({ heading, children, buttons = [] }) {
    return (
        <VStack
            justify="center"
            spacing="0"
            w="100%"
            minH="100vh"
            overflowX="hidden"
        >
            <Navbar buttons={buttons} />
            <Box w={["100vw", "100vw", "100vw", "80vw", "60vw"]} px={[2]}>
                <Card isCentered isStandalone heading={heading}>
                    {children}
                </Card>
            </Box>
        </VStack>
    );
}
