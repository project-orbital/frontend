import {Button, Heading, Spacer, Text, VStack} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";

export default function EmailVerified() {
    return <VStack h="100vh" w="100vw" justify="center" bg="gray.200">
        <VStack p="60px" align="center" borderRadius="20px" bg="white" shadow="sm">
            <Heading as="h1">Account verified!</Heading>
            <Text>Please proceed to log in.</Text>
            <Spacer py="20px"/>
            <Button as={RouterLink} to="/sign-in" h="60px" w="100%" bg="black" color="white">
                Click here to sign in
            </Button>
        </VStack>
    </VStack>;
}
