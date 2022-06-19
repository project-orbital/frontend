import { Avatar, Heading, HStack, Link, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
    return (
        <HStack
            w="100%"
            p="1.5em 20%"
            justify="space-between"
            bg="black"
            shadow="2xl"
        >
            <Avatar size="sm" name="D P" bg="white" color="black" />
            <Heading as="h3" size="lg" color="white">
                DollarPlanner
            </Heading>
            <Spacer />
            <Link as={RouterLink} to="/sign-in" p="0 20px" color="white">
                Sign in
            </Link>
            <Link
                as={RouterLink}
                to="/sign-up"
                p="6px 10px"
                fontWeight="semibold"
                color="white"
                border="1px solid white"
                borderRadius="5px"
            >
                Sign up
            </Link>
        </HStack>
    );
}
