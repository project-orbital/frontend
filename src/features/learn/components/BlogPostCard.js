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
    Flex,
} from "@chakra-ui/react";
import ActionButton from "../../../common/components/buttons/ActionButton";

export default function BlogPostCard({
    Header,
    Summary,
    Link,
    Picture,
    ContributedBy,
    SubmissionDate,
    LikeButton,
    ReportButton,
}) {
    return (
        <Center py={6}>
            <Box
                as="article"
                maxW={"445px"}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"md"}
                h="420px"
                w="260px"
                p={6}
                overflow={"hidden"}
            >
                <LinkBox>
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
                            <Text>Contributed by: {ContributedBy}</Text>
                        )}
                        {SubmissionDate && (
                            <Text>Date submitted: {SubmissionDate} </Text>
                        )}
                    </VStack>
                </LinkBox>
                <Spacer />
                <Flex>
                    {LikeButton && (
                        <ActionButton>
                            <Text pl="10px">Like{true ? "" : "d"}</Text>
                        </ActionButton>
                    )}
                    <Spacer />
                    {ReportButton && (
                        <ActionButton>
                            <Text pl="10px">Report{true ? "" : "d"}</Text>{" "}
                        </ActionButton>
                    )}
                </Flex>
            </Box>
        </Center>
    );
}
