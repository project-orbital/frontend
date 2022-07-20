import BaseCard from "../../../common/components/cards/BaseCard";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { MdOutlineReportGmailerrorred, MdOutlineThumbUp } from "react-icons/md";
import NavButton from "../../../common/components/buttons/NavButton";
import { format, parse } from "date-fns";

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
    return (
        <BaseCard
            heading={Header}
            subheading={Summary}
            image={Picture}
            link={Link}
            isExternal
        >
            <VStack align="center" spacing={4}>
                {LikeButton && (
                    <NavButton
                        to="./"
                        variant="primary"
                        w="100%"
                        leftIcon={<MdOutlineThumbUp />}
                    >
                        {isLiked ? "Liked" : "Like"}
                    </NavButton>
                )}
                {ReportButton && (
                    <NavButton
                        to={`./report/${id}`}
                        isDisabled={isReported}
                        variant="secondary"
                        w="100%"
                        leftIcon={<MdOutlineReportGmailerrorred />}
                    >
                        {isReported ? "Reported" : "Report"}
                    </NavButton>
                )}
            </VStack>
            <HStack w="100%" spacing={8}>
                {ContributedBy && (
                    <Box>
                        <Text
                            fontSize="xs"
                            fontWeight="bold"
                            color="gray.500"
                            textTransform="uppercase"
                        >
                            Contributor
                        </Text>
                        <Text fontSize="sm">{ContributedBy}</Text>
                    </Box>
                )}
                {SubmissionDate && (
                    <Box>
                        <Text
                            fontSize="xs"
                            fontWeight="bold"
                            color="gray.500"
                            textTransform="uppercase"
                        >
                            Submitted
                        </Text>
                        <Text fontSize="sm">
                            {format(
                                parse(SubmissionDate, "yyyy-MM-dd", new Date()),
                                "dd LLL yyyy"
                            )}{" "}
                        </Text>
                    </Box>
                )}
            </HStack>
        </BaseCard>
    );
}
