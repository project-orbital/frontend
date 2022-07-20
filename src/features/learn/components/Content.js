import {
    Box,
    Button,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import BlogPostCard from "./BlogPostCard";
import NavButton from "../../../common/components/buttons/NavButton";
import Pic1 from "../assets/set1/a.jpg";
import Pic2 from "../assets/set1/b.jpg";
import Pic3 from "../assets/set1/c.jpg";
import Pic4 from "../assets/set1/d.jpg";
import { Outlet } from "react-router-dom";
import {
    useReadContributionsQuery,
    useReadReactionsQuery,
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
        isLoading: isReactionsLoading,
        isError: isReactionsError,
    } = useReadReactionsQuery();

    // Wait for the API to return data.
    if (isContributionsLoading || isReactionsLoading) {
        // We need this check to ensure that we don't get `undefined` data.
        return null;
    }
    if (isContributionsError || isReactionsError) {
        // Ideally, we want to display some form of error message here,
        // but in the interest of time, we'll just return null and display nothing.
        return null;
    }

    const pics = [Pic4, Pic3, Pic2, Pic1];
    const cards = contributions.map((contribution, index) => (
        <BlogPostCard
            id={contribution.id}
            Picture={pics[index % 4]}
            Header={contribution.header}
            Summary={contribution.summary}
            Link={contribution.link}
            ContributedBy={contribution.username}
            SubmissionDate={contribution.submissionDate.slice(0, 10)}
            LikeButton
            ReportButton
            isReported={reportedContributions.includes(contribution.id)}
        />
    ));

    const UserContributed = () => {
        return <SimpleGrid columns={4}>{cards}</SimpleGrid>;
    };

    const SubmitArticleCard = () => {
        return (
            <BaseCard>
                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        Have something to share with the community?
                    </Text>
                    <Text>Let us know what's on your mind.</Text>
                </Box>
                <NavButton to="./contribute" text="Contribute an article" />
            </BaseCard>
        );
    };

    return (
        <Tabs size="sm">
            <TabList>
                <Tab>
                    <Button>Budgeting</Button>
                </Tab>
                <Tab>
                    <Button>Investment</Button>
                </Tab>
                <Tab>
                    <Button>Community Contributed</Button>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <BudgetingTab />
                </TabPanel>
                <TabPanel>
                    <InvestmentTab />
                </TabPanel>
                <TabPanel>
                    <UserContributed />
                    <SubmitArticleCard />
                </TabPanel>
            </TabPanels>
            <Outlet />
        </Tabs>
    );
}
