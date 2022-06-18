import PageTemplate from "../components/sidebar/PageTemplate";
import {Outlet, useParams} from "react-router-dom";
import Card from "../components/visuals/Card";
import {useSelector} from "react-redux";
import {selectAccounts} from "../states/accounts";
import Breadcrumbs from "../components/visuals/Breadcrumbs";
import {Box, SimpleGrid} from "@chakra-ui/react";
import {format, formatDistanceToNow} from "date-fns";

export default function Account() {
    const params = useParams();
    const accounts = useSelector(selectAccounts);
    const account = accounts.find(acc => acc.id === parseInt(params.id));

    const AccountNotFound = () => <Card
        isCentered
        heading="We couldn't find that account."
        subheading="Click here to view all your accounts."
        link="/accounts"
    />;

    if (account === undefined) {
        return <PageTemplate>
            <Breadcrumbs
                path="Home/Accounts/Unknown Account"
                links={["/dashboard", "/accounts", `/accounts/${params.id}`]}
            />
            <AccountNotFound/>
        </PageTemplate>;
    }

    const {id, createdAt, name, nickname} = account;
    return <PageTemplate page="accounts">
        <Breadcrumbs
            path={`Home/Accounts/${name}`}
            links={["/dashboard", "/accounts", `/accounts/${id}`]}
        />
        <Box h="100%" w="100%">
            <SimpleGrid minChildWidth="400px" spacing="30px">
                <Card
                    heading="Balance"
                >
                </Card>
                <Card
                    heading="Account Details"
                    subheading="You can modify some of these details at any time by clicking on them."
                >
                    <Card isNested heading="Name" subheading={name} link="./rename"/>
                    <Card isNested heading="Nickname" subheading={nickname} link="./rename"/>
                    <Card isNested heading="Created"
                          subheading={`${formatDistanceToNow(createdAt)} ago, at ${format(createdAt, "MMM d, yyyy h:mm a")}`}/>
                </Card>
            </SimpleGrid>
        </Box>
        <Outlet context={[id, name, nickname]}/>
    </PageTemplate>;
}
