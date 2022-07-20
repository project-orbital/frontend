import {
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import BlogPostCard from "./BlogPostCard";
import NavButton from "../../../common/components/buttons/NavButton";
import Pic1 from "../assets/set1/a.jpg";
import Pic2 from "../assets/set1/b.jpg";
import Pic3 from "../assets/set1/c.jpg";
import Pic4 from "../assets/set1/d.jpg";
import { Outlet } from "react-router-dom";
import { format } from "date-fns";
import {
    useReadContributionsQuery,
    useReadReportsQuery,
    useReadLikesQuery,
} from "../../../app/api";
import BudgetingTab from "./BudgetingTab";
import InvestmentTab from "./InvestmentTab";
import BaseCard from "../../../common/components/cards/BaseCard";

export default function Content() {
    // Grab the contributions and reactions from the API.
    const {
        data: contributions,
        isLoading: isContributionsLoading,
        isError: isContributionsError,
    } = useReadContributionsQuery();

    const {
        data: reportedContributions,
        isLoading: isReportsLoading,
        isError: isReportsError,
    } = useReadReportsQuery();

    const {
        data: likedContributions,
        isLoading: isLikesLoading,
        isError: isLikesError,
    } = useReadLikesQuery();
    // Wait for the API to return data.
    if (isContributionsLoading || isReportsLoading || isLikesLoading) {
        // We need this check to ensure that we don't get `undefined` data.
        return null;
    }
    if (isContributionsError || isReportsError || isLikesError) {
        // Ideally, we want to display some form of error message here,
        // but in the interest of time, we'll just return null and display nothing.
        return null;
    }

    const pics = [Pic4, Pic3, Pic2, Pic1];
    const cards = contributions.map((contribution, index) => (
        <BlogPostCard
            id={contribution._id}
            Picture={pics[index % 4]}
            Header={contribution.header}
            Summary={contribution.summary}
            Link={contribution.link}
            ContributedBy={contribution.username}
            SubmissionDate={format(contribution.submissionDate, "dd LLLL yyyy")}
            LikeButton
            ReportButton
            isLiked={likedContributions.includes(contribution._id)}
            isReported={reportedContributions.includes(contribution._id)}
            likeCount={contribution.likedBy.length}
        />
    ));

    const SubmitArticleCard = () => (
        <BaseCard
            heading="Have something to share with the community?"
            subheading="Let us know what's on your mind."
        >
            <NavButton to="./contribute" text="Contribute an article" />
        </BaseCard>
    );
    const CommunityContributedTab = () => (
        <SimpleGrid columns={4} spacing={8}>
            {cards}
            <SubmitArticleCard />
        </SimpleGrid>
    );

    return (
        <Tabs size="lg" colorScheme="gray">
            <TabList mx={4} gap={4}>
                <Tab>Budgeting</Tab>
                <Tab>Investment</Tab>
                <Tab>Community Contributed</Tab>
            </TabList>
            <TabPanels pt={4}>
                <TabPanel>
                    <BudgetingTab />
                </TabPanel>
                <TabPanel>
                    <InvestmentTab />
                </TabPanel>
                <TabPanel>
                    <CommunityContributedTab />
                </TabPanel>
            </TabPanels>
            <Outlet />
        </Tabs>
    );
}
