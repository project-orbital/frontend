import {Badge, Heading, LinkBox, LinkOverlay, Text, VStack} from "@chakra-ui/react";
import {Link} from "react-router-dom";

/**
 * A dynamically-sized card component designed to be used in a grid.
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
 * @param heading the optional heading text
 * @param subheading the optional subheading text
 * @param link an optional link to redirect to when any part of the card is clicked
 * @param children the body content
 * @param isNested `true` if this card is nested inside another card, `false` otherwise
 * @param isCentered `true` if the contents of this card should be centered, `false` otherwise
 * @return the card component
 */
export default function Card({info, heading, subheading, link, children, isNested, isCentered}) {
    const header = <VStack
        pb={children ? "20px" : "0px"}
        mb={children ? "20px" : "0px"}
        align={isCentered ? "center" : "start"}
        borderBottom={isNested || isCentered ? "none" : "1px solid black"}
    >
        {info && <Badge fontWeight="bold">{info}</Badge>}
        {heading && <Heading
            as="h2"
            align={isCentered ? "center" : "start"}
            size={isNested ? "md" : "lg"}
            pb={subheading ? "0px" : "20px"}
        >
            {heading}
        </Heading>}
        {subheading && <Text
            fontSize={isNested ? "md" : "sm"}
            mb="20px"
        >
            {subheading}
        </Text>}
    </VStack>;

    const body = <VStack align="start">
        {children}
    </VStack>;

    const card = <VStack
        align={isCentered ? "center" : "start"}
        justify={isCentered ? "center" : "start"}
        p={isNested ? "20px" : "30px"}
        bg={isNested ? "gray.50" : "white"}
        borderRadius="10px"
        shadow="sm"
    >
        {(heading || subheading) && header}
        {children && body}
    </VStack>;

    // If the card isn't clickable, then we don't need to wrap it with a link overlay.
    if (!link) {
        return card;
    }

    // Make the entire card clickable with a hover animation.
    return <LinkBox
        transition="transform .2s"
        _hover={{
            transform: "scale(1.01)", shadow: "md"
        }}>
        <LinkOverlay as={Link} to={link}/>
        {card}
    </LinkBox>;
}
