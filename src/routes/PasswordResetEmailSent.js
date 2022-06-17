import {
    Center,
    Heading,
    Spacer,
    Text,
    Button,
    VStack
} from "@chakra-ui/react";

import { Link as RouterLink} from "react-router-dom";

export default function EmailSent() {
    // === === ===
    // Form component.

    return <Center h="100vh" w="100vw" bg="gray.50">
    <VStack>
        <Spacer p="20px"/>
        <VStack p="60px" align="stretch" borderRadius="20px" bg="white" shadow="lg">
            <form>
            <Heading as="h1">Password Reset</Heading>
            <Text> A password reset request will be sent to your email shortly.</Text>
                <VStack spacing="20px" align="stretch">
                <Button as={RouterLink} to='/' type='submit' h="60px" w="100%" bg="black" color="white">
                Homepage</Button>
                </VStack>
            </form>
        </VStack>
    </VStack>
</Center>
}
