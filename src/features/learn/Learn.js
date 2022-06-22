import BlogPostCard from "./BlogPostCard";
import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import { Heading } from "@chakra-ui/react";
import Content from "./Content";
//3 main pages
//
export default function Learn() {
    return (
        <PageTemplate>
            <Breadcrumbs path="Home/Learn" links={["/dashboard", "/learn"]} />
            <Heading size="xl">A sub-header</Heading>
            <Content />
        </PageTemplate>
    );
}
