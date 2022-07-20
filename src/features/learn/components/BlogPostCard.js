import BaseCard from "../../../common/components/cards/BaseCard";
import { Text, VStack } from "@chakra-ui/react";
import { MdOutlineReportGmailerrorred, MdOutlineThumbUp } from "react-icons/md";
import NavButton from "../../../common/components/buttons/NavButton";

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
            <VStack align="start">
                {ContributedBy && <Text>Contributed by: {ContributedBy}</Text>}
                {SubmissionDate && (
                    <Text>Date submitted: {SubmissionDate} </Text>
                )}
            </VStack>
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
        </BaseCard>
    );
}
