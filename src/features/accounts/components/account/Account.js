import PageTemplate from "../../../../common/components/PageTemplate";
import { Navigate, Outlet, useParams } from "react-router-dom";
import Breadcrumbs from "../../../../common/components/Breadcrumbs";
import { Badge, Box, SimpleGrid } from "@chakra-ui/react";
import { useReadAccountQuery } from "../../../../app/api";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import Card from "../../../../common/components/Card";
import TransactionsCard from "../transactions/TransactionsCard";
import BalanceCard from "../transactions/BalanceCard";
import NavButton from "../../../../common/components/buttons/NavButton";

/**
 * The page view for a specific account.
 * Distinct from `AccountCard` which only displays a brief summary of the account.
 */
export default function Account() {
    const accountId = useParams().id;
    const {
        data: accounts,
        isLoading: isLoadingAccount,
        isError: isErrorAccount,
    } = useReadAccountQuery(accountId);
    const { createdAt, name, nickname } = accounts ?? {};

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

    // TODO: Fix the link here.
    const ParseCard = () => {
        return (
            <Card
                heading="Document Parser"
                subheading="You can upload documents to parse for transactions."
                badge={<Badge colorScheme="red">Experimental</Badge>}
            >
                <NavButton to="./upload-disclaimer" text="Parse documents" />
            </Card>
        );
    };

    return (
        <PageTemplate isLoading={isLoadingAccount} page="accounts">
            <Breadcrumbs
                path={`Home/Accounts/${name}`}
                links={["/dashboard", "/accounts", `.`]}
            />
            <Box h="100%" w="100%">
                <SimpleGrid minChildWidth="500px" spacing="30px" mb="40px">
                    <BalanceCard />
                    <TransactionsCard />
                    <ParseCard />
                    {isErrorAccount ? (
                        <Navigate to="/accounts/not-found" replace={true} />
                    ) : (
                        isLoadingAccount || <DetailsCard />
                    )}
                </SimpleGrid>
            </Box>
            <Outlet context={[accountId, name, nickname]} />
        </PageTemplate>
    );
}
