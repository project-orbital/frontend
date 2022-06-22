import {
    Stack,
    TabList,
    TabPanels,
    Tab,
    Tabs,
    TabPanel,
    Heading,
    Button,
} from "@chakra-ui/react";
import Article from "./Article";
import BlogPostCard from "./BlogPostCard";
import CollegeStudent from "../learn/Pictures/collegestudent.jpeg";
import YoungAdult from "../learn/Pictures/youngadult.jpeg";
import WorkingAdult from "../learn/Pictures/workingadult.jpeg";
import Parents from "../learn/Pictures/parents.jpeg";

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
                    <Button>User-Contributed</Button>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Stack direction={"row"} spacing={10} align={"center"}>
                        <BlogPostCard
                            Header="For college students"
                            Summary="6 important tips on how to manage money for college students."
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
                    <p>asda</p>
                </TabPanel>
                <TabPanel>
                    <p>Work In progress!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
