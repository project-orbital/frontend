import PageTemplate from "../../../../common/components/PageTemplate";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../../../common/components/Breadcrumbs";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useReadAccountQuery } from "../../../../app/api";
import TransactionsCard from "../transactions/TransactionsCard";
import BalanceCard from "../transactions/BalanceCard";
import ParseCard from "../transactions/ParseCard";

/**
 * The page view for a specific account.
 * Distinct from `AccountCard` which only displays a brief summary of the account.
 */
export default function Account() {
    const navigate = useNavigate();
    const accountId = useParams().id;
    const {
        data: accounts,
        isLoading,
        isError,
    } = useReadAccountQuery(accountId);
    const { name, nickname } = accounts ?? {};

    if (isError) {
        navigate("/accounts/not-found", { replace: true });
    }

    return (
        <PageTemplate isLoading={isLoading} page="accounts">
            <Breadcrumbs
                path={`Home/Accounts/${name}`}
                links={["/dashboard", "/accounts", `.`]}
            />
            <Box h="100%" w="100%">
                <SimpleGrid minChildWidth="550px" spacing="30px" mb="40px">
                    <BalanceCard />
                    <TransactionsCard />
                    <ParseCard />
                </SimpleGrid>
            </Box>
            <Outlet context={[accountId, name, nickname]} />
        </PageTemplate>
    );
}
