import {
    Button,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
} from "@chakra-ui/react";
import Card from "../../../common/components/Card";
import BlogPostCard from "./BlogPostCard";
import NavButton from "../../../common/components/buttons/NavButton";
import Pic1 from "../assets/set1/a.jpg";
import Pic2 from "../assets/set1/b.jpg";
import Pic3 from "../assets/set1/c.jpg";
import Pic4 from "../assets/set1/d.jpg";
import { Outlet } from "react-router-dom";
import { useReadContributionsQuery } from "../../../app/api";
import { indexOf } from "lodash";
import BudgetingTab from "./BudgetingTab";
import InvestmentTab from "./InvestmentTab";

export default function Content() {
    const { data: contributions, isLoading } = useReadContributionsQuery();
    const LastContributions =
        isLoading || contributions.length === 0 ? [] : contributions;
    const arr = [Pic4, Pic3, Pic2, Pic1];
    const HorizontalRowOf4 = (contributions) => {
        return (
            <Stack direction={"row"} spacing={10} align={"left"}>
                {contributions.map((c) => {
                    return (
                        <BlogPostCard
                            id={c._id}
                            Picture={arr[indexOf(contributions, c)]}
                            Header={c.header}
                            Summary={c.summary}
                            Link={c.link}
                            ContributedBy={c.username}
                            SubmissionDate={c.submissionDate.slice(0, 10)}
                            LikeButton
                            ReportButton
                        />
                    );
                })}
            </Stack>
        );
    };

    //Make array an array of smaller sub arrays.
    function chunk(array, size) {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i++) {
            const last = chunkedArray[chunkedArray.length - 1];
            if (!last || last.length === size) {
                chunkedArray.push([array[i]]);
            } else {
                last.push(array[i]);
            }
        }
        return chunkedArray;
    }
    const chunked = chunk(LastContributions, 4);
    const UserContributed = () => {
        return <VStack>{chunked.map((c) => HorizontalRowOf4(c))}</VStack>;
    };

    const SubmitArticleCard = () => {
        return (
            <Card
                heading="Do you have something to share?"
                subheading="Let us know what's on your mind."
            >
                <NavButton to="./contribute" text="Contribute" />
            </Card>
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
