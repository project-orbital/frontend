import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export default function Stat({ variant = "secondary", label, value }) {
    const accentGradient = useColorModeValue(
        "linear(to-t, accent, fg)",
        "linear(to-t, fg, fg)"
    );
    if (variant === "primary") {
        return (
            <Box>
                <Heading bgGradient={accentGradient} bgClip="text">
                    {value}
                </Heading>
                <Text fontSize="sm" color="fg-light">
                    {label}
                </Text>
            </Box>
        );
    } else if (variant === "secondary") {
        return (
            <Box>
                <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color="gray.500"
                    textTransform="uppercase"
                >
                    {label}
                </Text>
                <Text fontSize="sm">{value}</Text>
            </Box>
        );
    }
    return null;
}
