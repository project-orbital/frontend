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
import { MdOutlineThumbUp, MdOutlineReportGmailerrorred } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function BlogPostCard({
    Header,
    Summary,
    Link,
    Picture,
    ContributedBy,
    SubmissionDate,
    LikeButton,
    ReportButton,
    id,
    isLiked,
    isReported,
}) {
    const navigate = useNavigate();
    return (
        <Center py={6}>
            <Box
                as="article"
                maxW={"445px"}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"md"}
                h="430px"
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
                        <ActionButton
                            variant="like"
                            leftIcon={<MdOutlineThumbUp />}
                        >
                            Like{isLiked ? "d" : ""}
                        </ActionButton>
                    )}
                    <Spacer />
                    {ReportButton && (
                        <ActionButton
                            onClick={() => navigate(`./report/${id}`)}
                            variant="report"
                            leftIcon={<MdOutlineReportGmailerrorred />}
                        >
                            Report{isReported ? "ed" : ""}
                        </ActionButton>
                    )}
                </Flex>
            </Box>
        </Center>
    );
}
