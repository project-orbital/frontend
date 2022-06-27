import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import { Box } from "@chakra-ui/react";
import Content from "./components/Content";

export default function Learn() {
    return (
        <PageTemplate page="learn">
            <Breadcrumbs path="Home/Learn" links={["/dashboard", "/learn"]} />
            <Box
                fontWeight="semibold"
                bg="gray.300"
                w="100%"
                p={5}
                color="black"
                rounded="xl"
            >
                Here are some materials on financial literacy our team has
                carefully selected! You can also share your knowledge by
                publishing your very own articles under the Community
                Contributed tab!
            </Box>
            <Content />
        </PageTemplate>
    );
}
