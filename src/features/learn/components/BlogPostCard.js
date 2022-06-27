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
} from "@chakra-ui/react";

//need to make the cards stretch when browser size changes
export default function BlogPostCard({ Header, Summary, Link, Picture }) {
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
                        <Image
                            borderRadius="full"
                            boxSize="210px"
                            src={Picture}
                        />
                    </Box>
                    <Heading size="md" my="2">
                        <LinkOverlay href={Link} target="_blank">
                            {Header}
                        </LinkOverlay>
                    </Heading>
                    <Text>{Summary}</Text>
                </VStack>
            </LinkBox>
        </Center>
    );
}
