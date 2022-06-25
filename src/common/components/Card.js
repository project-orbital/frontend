import {
    Badge,
    Box,
    Heading,
    LinkBox,
    LinkOverlay,
    SimpleGrid,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

/**
 * A dynamically-sized card component designed to be used in a grid or on its own.
 *
 * If the card is meant to be used on its own, pass the `isStandalone` prop.
 * This makes the header bigger, and removes the background color and drop shadow from the card.
 *
 * A card is expected to have at least a heading.
 * A subheading and an information badge are optional and can be passed in as props as strings.
 * The body of a card will comprise of the children elements.
 *
 * A card can be nested within another card's body with the `isNested` prop.
 * However, nesting more than once should be avoided as it will look pretty ugly.
 * If this is necessary, consider using custom components as children instead of nesting cards.
 *
 * A card can also be made to be clickable by passing a `link` prop,
 * which accepts a URL to navigate to when any part of the card is clicked.
 * Nested clickable components such as buttons will still work even though the entire card is clickable.
 *
 * @param info an optional information text, e.g. an index number, to display in a badge above the heading
 * @param icon an optional icon to display above the heading
 * @param heading the optional heading text
 * @param subheading the optional subheading text
 * @param link an optional link to redirect to when any part of the card is clicked
 * @param children the body content
 * @param isNested `true` if this card is nested inside another card, `false` otherwise
 * @param isCentered `true` if the contents of this card should be centered, `false` otherwise
 * @param isStandalone `true` if this card should be displayed on its own, `false` otherwise
 * @param isDarkModeReady `true` if this card should be respond to color mode toggles, `false` otherwise
 * @param isExternalLink `true` if this card's link is an external link, `false` otherwise
 * @return the card component
 */
export default function Card({
    info,
    icon,
    heading,
    subheading,
    link,
    children,
    isNested,
    isCentered,
    isStandalone,
    isDarkModeReady,
    isExternalLink,
}) {
    const accentGradient = useColorModeValue(
        "linear(to-t, accent, fg)",
        "linear(to-t, fg, fg)"
    );

    const header = (
        <VStack
            pb={children ? "20px" : "0px"}
            mb={children && !isNested ? "20px" : "0px"}
            align={isCentered ? "center" : "start"}
            borderBottom={isNested || isCentered ? "none" : "1px solid black"}
        >
            {icon && <Box color="fg">{icon}</Box>}
            {info && <Badge fontWeight="bold">{info}</Badge>}
            {heading && (
                <Heading
                    as="h2"
                    align={isCentered ? "center" : "start"}
                    size={isNested ? "md" : isStandalone ? "4xl" : "lg"}
                    pb={subheading || children ? "0px" : "20px"}
                    lineHeight={isStandalone ? "1.25em" : null}
                    bgGradient={isStandalone ? accentGradient : null}
                    bgClip={isStandalone ? "text" : null}
                >
                    {heading}
                </Heading>
            )}
            {subheading && (
                <Text
                    fontSize={isNested ? "md" : "sm"}
                    mb="20px"
                    align={isCentered ? "center" : "start"}
                >
                    {subheading}
                </Text>
            )}
        </VStack>
    );

    const body = isStandalone ? (
        children
    ) : (
        <Box h={isCentered ? null : "100%"} w="100%">
            <SimpleGrid spacing="20px">{children}</SimpleGrid>
        </Box>
    );

    const card = (
        <VStack
            h="100%"
            align={isCentered ? "center" : "start"}
            justify={isCentered ? "center" : "start"}
            p={isNested ? "20px" : "30px"}
            bg={
                isStandalone
                    ? "none"
                    : isDarkModeReady
                    ? "bg-light"
                    : isNested
                    ? "gray.50"
                    : "white"
            }
            borderRadius="10px"
            shadow={isStandalone ? null : "sm"}
        >
            {(heading || subheading) && header}
            {children && body}
        </VStack>
    );

    // If the card isn't clickable, then we don't need to wrap it with a link overlay.
    if (!link) {
        return card;
    }

    // Make the entire card clickable with a hover animation.
    return (
        <LinkBox
            transition="transform .2s"
            _hover={{
                transform: "scale(1.01)",
                shadow: "md",
            }}
        >
            {isExternalLink ? (
                <LinkOverlay href={link} isExternal>
                    {card}
                </LinkOverlay>
            ) : (
                <LinkOverlay as={Link} to={link}>
                    {" "}
                    {card}
                </LinkOverlay>
            )}
        </LinkBox>
    );
}
