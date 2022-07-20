import { useNavigate } from "react-router-dom";
import BaseCard from "../../../common/components/cards/BaseCard";
import { Text, VStack } from "@chakra-ui/react";
import ActionButton from "../../../common/components/buttons/ActionButton";
import { MdOutlineReportGmailerrorred, MdOutlineThumbUp } from "react-icons/md";

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
            <VStack align="start">
                {LikeButton && (
                    <ActionButton
                        variant="like"
                        leftIcon={<MdOutlineThumbUp />}
                    >
                        {isLiked ? "Liked" : "Like"}
                    </ActionButton>
                )}
                {ReportButton && (
                    <ActionButton
                        onClick={() => navigate(`./report/${id}`)}
                        variant="report"
                        leftIcon={<MdOutlineReportGmailerrorred />}
                    >
                        {isReported ? "Reported" : "Report"}
                    </ActionButton>
                )}
            </VStack>
        </BaseCard>
    );
}
