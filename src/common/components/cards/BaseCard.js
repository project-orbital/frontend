import {
    Box,
    HStack,
    LinkBox,
    LinkOverlay,
    Skeleton,
    Spacer,
    Text,
    useColorMode,
    VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function BaseCard({
    title,
    subtitle,
    badge,
    button,
    link,
    isLoading,
    children,
    ...props
}) {
    const { colorMode } = useColorMode();

    const Children = () => {
        if (children instanceof Array) {
            return children.map((child, i) => (
                <Skeleton
                    isLoaded={!isLoading}
                    key={i}
                    w="100%"
                    align={props.align}
                >
                    {child}
                </Skeleton>
            ));
        }
        return (
            <Skeleton isLoaded={!isLoading} w="100%" align={props.align}>
                {children}
            </Skeleton>
        );
    };

    const Body = () => {
        return (
            <VStack
                w="100%"
                h="100%"
                p={8}
                spacing={8}
                justify="start"
                align="start"
                bgGradient="linear(to-br, bg-light, bg-lighter)"
                borderBottomRadius="lg"
                shadow="4px 8px 8px 0px #662B4218"
                {...props}
            >
                <Children />
            </VStack>
        );
    };

    const Card = () => {
        if (!title && !subtitle) {
            return <Body />;
        }
        return (
            <VStack spacing={0}>
                <HStack
                    w="100%"
                    px={8}
                    py={6}
                    bgGradient="linear(to-br, accent, accent-dark)"
                    borderRadius="lg"
                    borderBottomRadius="md"
                    shadow={
                        colorMode === "light"
                            ? "2px 4px 20px 0px #662B4244"
                            : null
                    }
                    zIndex={2}
                >
                    <VStack align="start" spacing="2px">
                        {badge && <Box pb={2}>{badge}</Box>}
                        <Text fontSize="xl" fontWeight="bold" color="gray.200">
                            {title}
                        </Text>
                        <Text fontSize="sm" color="gray.200">
                            {subtitle}
                        </Text>
                    </VStack>
                    <Spacer />
                    {button && <Box>{button}</Box>}
                </HStack>
                <Body />
            </VStack>
        );
    };

    // If the card isn't clickable, then we don't need to wrap it with a link overlay.
    if (!link) {
        return <Card />;
    }

    // Make the entire card clickable with a hover animation.
    return (
        <LinkBox
            as="article"
            transition="transform .2s"
            _hover={{
                transform: "scale(1.01)",
            }}
        >
            <LinkOverlay as={Link} to={link}>
                <Card />
            </LinkOverlay>
        </LinkBox>
    );
}
