import { Text, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";

export default function Article({ Header, Summary }) {
    return (
        <LinkBox maxW="sm" p="5" borderWidth="1px" rounded="md">
            <Heading size="md" my="2">
                <LinkOverlay href="#">{Header}</LinkOverlay>
            </Heading>
            <Text>{Summary}</Text>
        </LinkBox>
    );
}
