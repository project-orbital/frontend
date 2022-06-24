import {
    Heading,
    Link,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import NavButton from "../../../common/components/buttons/NavButton";

export default function Hero() {
    const value = useColorModeValue(
        "linear(to-t, accent, fg)",
        "linear(to-t, fg, fg)"
    );

    return (
        <VStack w="100%" px="25%" py="50px" bg="bg">
            <Heading
                as="h1"
                align="center"
                bgGradient={value}
                bgClip="text"
                fontSize="120px"
                lineHeight="1.05em"
            >
                Take charge of your personal finances.
            </Heading>
            <Text
                w="60%"
                pt="50px"
                align="center"
                color="fg-light"
                fontSize="2xl"
                lineHeight="1.35em"
            >
                DollarPlanner is your one-stop web application to manage and
                analyze your multiple bank accounts!
            </Text>
            <VStack pt="40px">
                <NavButton
                    to="/sign-up"
                    text="Sign up"
                    h="60px"
                    w="300px"
                    fw="semibold"
                    fs="lg"
                    bg="accent"
                    c="white"
                />
                <Text pt="10px" color="fg-light">
                    Already have an account?{" "}
                    <Link
                        as={RouterLink}
                        to="/sign-in"
                        fontWeight="semibold"
                        color="fg-light"
                        zIndex={2}
                    >
                        Sign in ►
                    </Link>
                </Text>
            </VStack>
        </VStack>
    );
}
