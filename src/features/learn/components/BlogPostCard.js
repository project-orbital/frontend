import BaseCard from "../../../common/components/cards/BaseCard";
import { Box, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import NavButton from "../../../common/components/buttons/NavButton";
import {
    useLikeContributionMutation,
    useUnlikeContributionMutation,
} from "../../../app/api";

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
    likeCount,
}) {
    const [likeContribution] = useLikeContributionMutation();
    const [unlikeContribution] = useUnlikeContributionMutation();
    const toast = useToast();

    async function likeOnClick() {
        toast.closeAll();
        try {
            await likeContribution({ id: id }).unwrap();
            toast({
                title: "Liked!",
                status: "success",
            });
        } catch (error) {
            toast({
                ...error,
                status: "error",
            });
        }
    }

    async function unlikeOnClick() {
        toast.closeAll();
        try {
            await unlikeContribution({ id: id }).unwrap();
            toast({
                title: "Unliked!",
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
            link={Link.startsWith("http://") ? Link : `http://${Link}`}
            isExternal
        >
            <VStack align="center" spacing={4}>
                {LikeButton && (
                    <NavButton
                        to={`./`}
                        onClick={isLiked ? unlikeOnClick : likeOnClick}
                        variant="primary"
                        w="100%"
                        leftIcon={isLiked ? <AiFillLike /> : <AiOutlineLike />}
                    >
                        {isLiked ? "Liked" : "Like"} {likeCount}
                    </NavButton>
                )}
                {ReportButton && (
                    <NavButton
                        to={`./report/${id}`}
                        isDisabled={isReported}
                        variant="danger"
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
