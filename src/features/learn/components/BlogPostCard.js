import {
    Box,
    Center,
    Heading,
    Image,
    LinkBox,
    LinkOverlay,
    Text,
    useColorModeValue,
    VStack,
    Spacer,
} from "@chakra-ui/react";

export default function BlogPostCard({
    Header,
    Summary,
    Link,
    Picture,
    ContributedBy,
}) {
    return (
        <Center py={6}>
            <LinkBox
                as="article"
                maxW={"445px"}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"md"}
                h="400px"
                w="260px"
                p={6}
                overflow={"hidden"}
            >
                <VStack>
                    <Box>
                        {Picture && (
                            <Image
                                borderRadius="50"
                                boxSize="210px"
                                src={Picture}
                            />
                        )}
                    </Box>
                    <Heading size="md" my="2">
                        <LinkOverlay href={Link} target="_blank">
                            {Header}
                        </LinkOverlay>
                    </Heading>
                    <Spacer />
                    <Text>{Summary}</Text>
                    <Spacer />
                    {ContributedBy && (
                        <Text>Contributed By: {ContributedBy}</Text>
                    )}
                </VStack>
            </LinkBox>
        </Center>
    );
}
