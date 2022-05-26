import {Heading, Link, Spacer, Text, VStack} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";

export default function Hero(props) {
    return <VStack w="100%" p="100px 25%" bg="gray.800" spacing="40px">
        <Heading as="h1" size="4xl" align="center" color="white">
            {props.title}
        </Heading>
        <Text fontSize="2xl" w="60%" lineHeight="1.35em" align="center" color="white">
            {props.subtitle}
        </Text>
        <VStack>
            <Link as={RouterLink} to="/sign-up" p="10px 80px" bg="white" fontSize="lg" fontWeight="semibold"
                  color="black" border="1px solid white" borderRadius="5px">
                Sign up
            </Link>
            <Spacer/>
            <Text color="white">
                Already have an account?{' '}
                <Link as={RouterLink} to='/sign-in' fontWeight="semibold" color="white">Sign in ►</Link>
            </Text>
        </VStack>
    </VStack>
}
