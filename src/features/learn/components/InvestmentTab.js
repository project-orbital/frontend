import BlogPostCard from "./BlogPostCard";
import { SimpleGrid } from "@chakra-ui/react";
import newbie from "../assets/newbie.png";
import WarrenBuffett from "../assets/warrenbuffett.png";
import Longterm from "../assets/longterm.png";

export default function InvestmentTab() {
    return (
        <SimpleGrid minChildWidth={60} spacing={8}>
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
        </SimpleGrid>
    );
}
