import {
    Button,
    Center,
    Heading,
    Spacer,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function EmailSent() {
    // === === ===
    // Form component.

    return (
        <Center h="100vh" w="100vw" bg="gray.50">
            <VStack>
                <Spacer p="20px" />
                <VStack
                    p="60px"
                    align="stretch"
                    borderRadius="20px"
                    bg="white"
                    shadow="lg"
                >
                    <form>
                        <Heading as="h1">Account Confirmation</Heading>
                        <Text>
                            {" "}
                            An account verification email will be sent to you
                            shortly.
                        </Text>
                        <VStack spacing="20px" align="stretch">
                            <Button
                                as={RouterLink}
                                to="/"
                                type="submit"
                                h="60px"
                                w="100%"
                                bg="black"
                                color="white"
                            >
                                Homepage
                            </Button>
                        </VStack>
                    </form>
                </VStack>
            </VStack>
        </Center>
    );
}
