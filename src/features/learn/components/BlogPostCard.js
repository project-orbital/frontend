import BaseCard from "../../../common/components/cards/BaseCard";
import { Text, VStack, Box, HStack } from "@chakra-ui/react";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import NavButton from "../../../common/components/buttons/NavButton";
import { useLikeContributionMutation } from "../../../app/api";
import { useToast } from "@chakra-ui/react";

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
    const [likeContribution] = useLikeContributionMutation();
    const toast = useToast();

    async function likeOnClick() {
        toast.closeAll();
        try {
            await likeContribution({ id: id }).unwrap();
            toast({
                title: "Thank you for your contribution!",
                status: "success",
            });
        } catch (error) {
            toast({
                ...error,
                status: "error",
            });
        }
    }

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
                        to={likeOnClick}
                        isDisabled={isLiked}
                        variant="secondary"
                        w="100%"
                        leftIcon={isLiked ? <AiFillLike /> : <AiOutlineLike />}
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
                        <Text fontSize="sm">{SubmissionDate}</Text>
                    </Box>
                )}
            </HStack>
        </BaseCard>
    );
}
