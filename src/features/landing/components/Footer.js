import { Center, Text } from "@chakra-ui/react";

export default function Footer(props) {
    return (
        <Center w="100%" h="400px" p="40px" bg="gray.500">
            <Text fontSize="6xl" color="white">
                {props.text}
            </Text>
        </Center>
    );
}
