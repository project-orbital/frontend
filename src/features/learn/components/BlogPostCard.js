import BaseCard from "../../../common/components/cards/BaseCard";
import { Button, Text, VStack } from "@chakra-ui/react";
import { MdOutlineReportGmailerrorred, MdOutlineThumbUp } from "react-icons/md";
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
            <VStack align="start">
                {ContributedBy && <Text>Contributed by: {ContributedBy}</Text>}
                {SubmissionDate && (
                    <Text>Date submitted: {SubmissionDate} </Text>
                )}
            </VStack>
            <VStack align="start" spacing={4}>
                {LikeButton && (
                    <Button
                        onClick={likeOnClick}
                        variant="primary"
                        leftIcon={<MdOutlineThumbUp />}
                    >
                        {isLiked ? "Liked" : "Like"}
                    </Button>
                )}
                {ReportButton &&
                    (isReported ? (
                        <Button
                            variant="secondary"
                            leftIcon={<MdOutlineReportGmailerrorred />}
                            bg="bg"
                        >
                            Reported
                        </Button>
                    ) : (
                        <NavButton
                            to={`./report/${id}`}
                            variant="secondary"
                            leftIcon={<MdOutlineReportGmailerrorred />}
                        >
                            Report
                        </NavButton>
                    ))}
            </VStack>
        </BaseCard>
    );
}
