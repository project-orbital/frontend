import BlogPostCard from "./BlogPostCard";
import { SimpleGrid } from "@chakra-ui/react";
import CollegeStudent from "../assets/collegestudent.png";
import YoungAdult from "../assets/youngadult.png";
import WorkingAdult from "../assets/workingadult.png";
import Parents from "../assets/parents.png";

export default function BudgetingTab() {
    return (
        <SimpleGrid spacing={8} minChildWidth={60}>
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
        </SimpleGrid>
    );
}
