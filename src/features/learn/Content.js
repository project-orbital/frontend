import {
    Stack,
    TabList,
    TabPanels,
    Tab,
    Tabs,
    TabPanel,
    Button,
} from "@chakra-ui/react";
import BlogPostCard from "./BlogPostCard";
import CollegeStudent from "../learn/Pictures/collegestudent.jpeg";
import YoungAdult from "../learn/Pictures/youngadult.jpeg";
import WorkingAdult from "../learn/Pictures/workingadult.jpeg";
import Parents from "../learn/Pictures/parents.jpeg";
import newbie from "../learn/Pictures/newbie.jpeg";
import WarrenBuffett from "../learn/Pictures/warrenbuffett.png";
import Longterm from "../learn/Pictures/longterm.jpeg";

export default function Content() {
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
                    <Stack direction={"row"} spacing={10} align={"center"}>
                        <BlogPostCard
                            Header="For college students"
                            Summary="6 important tips on how to manage money for college students with little to no income."
                            Link="https://www.forbes.com/sites/jimwang/2019/10/09/6-crucial-money-tips-for-college-students/?sh=5f1f04b33aaf"
                            Picture={CollegeStudent}
                        />
                        <BlogPostCard
                            Header="For young adults"
                            Summary="8 essential budgeting tips on how to spend less and save more. "
                            Link="https://smartwealth.sg/50-30-20-budget-rule/"
                            Picture={YoungAdult}
                        />
                        <BlogPostCard
                            Header="For working adults"
                            Summary="Learn more about the 50/30/20 Budgeting Rule to allocate your monthly salary better."
                            Link="https://smartwealth.sg/50-30-20-budget-rule/"
                            Picture={WorkingAdult}
                        />
                        <BlogPostCard
                            Header="For parents"
                            Summary="Start early and teach your children the smart money habits."
                            Link="https://www.investopedia.com/guide-allowances-and-kids-5217591"
                            Picture={Parents}
                        />
                    </Stack>
                </TabPanel>
                <TabPanel>
                    <Stack direction={"row"} spacing={10} align={"center"}>
                        <BlogPostCard
                            Header="For newbies"
                            Summary="It's important to know you what you are doing even before you get started."
                            Link="https://www.strawberryinvest.com/knowledge-hub/top-10-tips-for-first-time-investors/"
                            Picture={newbie}
                        />
                        <BlogPostCard
                            Header="From Warren Buffett"
                            Summary="Let's hear from one of the most successful investors in the world. "
                            Link="https://www.simplysafedividends.com/intelligent-income/posts/37-top-10-pieces-of-investment-advice-from-warren-buffett"
                            Picture={WarrenBuffett}
                        />
                        <BlogPostCard
                            Header="Long term investing"
                            Summary="For the majority of us, we should think about long term when it comes to investing."
                            Link="https://www.investopedia.com/articles/00/082100.asp "
                            Picture={Longterm}
                        />
                    </Stack>
                </TabPanel>
                <TabPanel>
                    <p>Feature coming soon!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
