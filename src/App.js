import {Heading, Link, VStack} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom"

export default function App() {
    return <VStack>
        <Heading as="h1">Landing page.</Heading>;
        <Link as={RouterLink} to='/'>Home</Link>
        <Link as={RouterLink} to='/sign-up'>Sign up</Link>
        <Link as={RouterLink} to='/sign-in'>Sign in</Link>
    </VStack>
}
