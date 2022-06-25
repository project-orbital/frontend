import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import Card from "../../common/components/Card";
import { MdConstruction } from "react-icons/md";
import { Box } from "@chakra-ui/react";

export default function Portfolio() {
    return (
        <PageTemplate page="portfolio">
            <Breadcrumbs
                path="Home/Portfolio"
                links={["/dashboard", "/portfolio"]}
            />
            <Box w="100%" h="100%">
                <Card
                    isCentered
                    icon={<MdConstruction size="200px" />}
                    heading="This page is under construction."
                    subheading="Please check back again in milestone 3!"
                />
            </Box>
        </PageTemplate>
    );
}
