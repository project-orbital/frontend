import PageTemplate from "../../common/components/PageTemplate";
import { Outlet, useParams } from "react-router-dom";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useReadAccountQuery } from "../../app/api";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import Card from "../../common/components/Card";

export default function Account() {
    const accountId = useParams().id;
    const { data, isLoading } = useReadAccountQuery(accountId);
    const { createdAt, name, nickname, _id } = data ?? {};

    const DetailsCard = () => {
        return (
            <Card
                heading="Account Details"
                subheading="You can modify some of these details at any time by clicking on them."
            >
                <Card
                    isNested
                    heading="Name"
                    subheading={name}
                    link="./rename"
                />
                <Card
                    isNested
                    heading="Nickname"
                    subheading={nickname}
                    link="./rename"
                />
                <Card
                    isNested
                    heading="Created"
                    link="./delete"
                    subheading={`${formatDistanceToNow(
                        parseISO(createdAt)
                    )} ago, at ${format(
                        parseISO(createdAt),
                        "MMM d, yyyy h:mm a"
                    )}`}
                />
            </Card>
        );
    };

    // === === ===
    // Combine the components.
    return (
        <PageTemplate isLoading={isLoading} page="accounts">
            <Breadcrumbs
                path={`Home/Accounts/${name}`}
                links={["/dashboard", "/accounts", `.`]}
            />
            <Box h="100%" w="100%">
                <SimpleGrid minChildWidth="500px" spacing="30px" mb="40px">
                    {isLoading || <DetailsCard />}
                </SimpleGrid>
            </Box>
            <Outlet context={[_id, name, nickname]} />
        </PageTemplate>
    );
}
