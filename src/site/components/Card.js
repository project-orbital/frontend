import {
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
 * @param badge a badge to display on the card above the heading and icon (if any)
 * @param icon an optional icon to display above the heading
 * @param heading the optional heading text
 * @param subheading the optional subheading text
 * @param link an optional link to redirect to when any part of the card is clicked
 * @param children the body content
 * @param isNested `true` if this card is nested inside another card, `false` otherwise
 * @param isCentered `true` if the contents of this card should be centered, `false` otherwise
 * @param isStandalone `true` if this card should be displayed on its own, `false` otherwise
 * @param isExternalLink `true` if this card's link is an external link, `false` otherwise
 * @return the card component
 */
export default function Card({
    badge,
    icon,
    heading,
    subheading,
    link,
    children,
    isNested,
    isCentered,
    isStandalone,
    isExternalLink,
}) {
    const accentGradient = useColorModeValue(
        "linear(to-t, accent, fg)",
        "linear(to-t, fg, fg)"
    );

    const header = (
        <VStack
            width="100%"
            pb={children ? "20px" : "0px"}
            mb={children && !isNested ? "20px" : "0px"}
            align={["start", "center"]}
            borderBottom={isNested || isCentered ? "none" : "1px solid"}
            borderColor="fg-light"
            spacing={0}
        >
            {icon && (
                <Box boxSize={[8, 12, 16]} m={0} color="fg" my={[6, 4]}>
                    {icon}
                </Box>
            )}
            {badge}
            {heading && isStandalone ? ( // If this card is standalone, render it in serif.
                <Heading
                    align="center"
                    lineHeight="1.25em"
                    bgGradient={accentGradient}
                    bgClip="text"
                    size="4xl"
                >
                    {heading}
                </Heading> // Otherwise, render it in sans-serif (regular text).
            ) : (
                <Text
                    align={["start", "center"]}
                    fontWeight="bold"
                    fontSize={["sm", "md"]}
                    pt={badge ? "10px" : "0px"}
                    pb={subheading ? "2px" : children ? "0px" : "20px"}
                >
                    {heading}
                </Text>
            )}
            {subheading && (
                <Text
                    fontSize={["xs", "sm"]}
                    pb={children ? "0px" : "15px"}
                    mb="20px"
                    align={["start", "center"]}
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
            bg={isStandalone ? "none" : isNested ? "bg" : "bg-light"}
            borderRadius="10px"
            shadow={isStandalone ? null : isNested ? "sm" : "md"}
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
