import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import { Box } from "@chakra-ui/react";
import Card from "../../common/components/Card";
import { MdConstruction } from "react-icons/md";

export default function Settings() {
    return (
        <PageTemplate page="settings">
            <Breadcrumbs
                path="Home/Settings"
                links={["/dashboard", "/Settings"]}
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
