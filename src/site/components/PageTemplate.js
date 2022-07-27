import {
    Box,
    Heading,
    Spacer,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
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
    const accentGradient = useColorModeValue(
        "linear(to-t, accent, fg)",
        "linear(to-t, fg, fg)"
    );
    return (
        <VStack
            justify="start"
            spacing="0"
            w="100vw"
            minH="100vh"
            px={[4, 8, 16, 32, 64]}
            overflowX="hidden"
        >
            <Navbar buttons={buttons} />
            <Spacer />
            <Spacer />
            <Heading
                pb={16}
                align="center"
                lineHeight={["1.75em", "1.5em", "1.25em"]}
                bgGradient={accentGradient}
                bgClip="text"
                size={["xl", "2xl", "3xl"]}
            >
                {heading}
            </Heading>
            <Box>{children}</Box>
            <Spacer />
            <Spacer />
            <Spacer />
        </VStack>
    );
}
