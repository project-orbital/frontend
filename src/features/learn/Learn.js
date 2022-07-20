import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import Content from "./components/Content";
import { Text } from "@chakra-ui/react";

export default function Learn() {
    return (
        <PageTemplate page="learn">
            <Breadcrumbs path="Home/Learn" links={["/dashboard", "/learn"]} />
            <Text fontWeight="semibold" bg="dim" color="fg" p={5} rounded="xl">
                Here are some materials on financial literacy our team has
                carefully selected! You can also share your knowledge by
                publishing your very own articles under the Community
                Contributed tab!
            </Text>
            <Content />
        </PageTemplate>
    );
}
