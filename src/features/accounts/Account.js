import PageTemplate from "../../common/components/PageTemplate";
import { Outlet, useParams } from "react-router-dom";
import Card from "../../common/components/Card";
import { useSelector } from "react-redux";
import { selectAccounts } from "./state/accounts";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import {
    format,
    formatDistanceToNow,
    formatDistanceToNowStrict,
} from "date-fns";
import {
    selectLastTransactionFromAccount,
    selectMonthEndBalancesFromAccount,
    selectTransactionsFromAccount,
} from "../transactions/state/transactions";
import AreaChart from "../../common/components/visuals/AreaChart";
import AccountNotFound from "./AccountNotFound";
import NavButton from "../../common/components/buttons/NavButton";
import Table from "../../common/components/visuals/Table";

export default function Account() {
    const params = useParams();
    const accountId = parseInt(params.id);

    const accounts = useSelector(selectAccounts);
    const transactions = useSelector(
        selectTransactionsFromAccount(accountId)
    ).map((t) => ({
        date: format(t.date, "dd LLLL yyyy"),
        description: t.description,
        category: t.category,
        amount: t.amount.toFixed(2),
        balance: t.balance.toFixed(2),
    }));

    const monthEndBalances = useSelector(
        selectMonthEndBalancesFromAccount(accountId)
    );
    const lastTransaction = useSelector(
        selectLastTransactionFromAccount(accountId)
    );

    // Validate the account and get its details.
    const account = accounts.find((acc) => acc.id === accountId);
    if (account === undefined) {
        return <AccountNotFound />;
    }
    const { id, createdAt, name, nickname } = account;
    const data = monthEndBalances.map(({ date, balance }) => ({
        x: format(date, "MMM yyyy"),
        y: balance,
    }));

    const TransactionCard = () => {
        if (transactions.length === 0) {
            return (
                <Card
                    isCentered
                    heading="No transactions to display."
                    subheading="Get started by creating a transaction."
                >
                    <NavButton
                        to="./create-spending-transaction"
                        text="Create a spending transaction"
                    />
                    <NavButton
                        to="./create-receiving-transaction"
                        text="Create a receiving transaction"
                    />
                </Card>
            );
        } else {
            return (
                <Card heading="All Transactions">
                    <Card isNested>
                        <Table values={transactions} />
                    </Card>
                    <NavButton
                        to="./create-spending-transaction"
                        text="Create a spending transaction"
                    />
                    <NavButton
                        to="./create-receiving-transaction"
                        text="Create a receiving transaction"
                    />
                </Card>
            );
        }
    };

    const BalanceCard = () => {
        if (lastTransaction === null) {
            return (
                <Card
                    isCentered
                    heading="No balance information."
                    subheading="Please update your transaction history."
                ></Card>
            );
        }
        return (
            <Card heading="Account Balance">
                <Card isNested>
                    <VStack spacing={0}>
                        <Text
                            fontWeight="bold"
                            fontSize="2xl"
                        >{`SGD ${lastTransaction.balance}`}</Text>
                        <Text fontSize="sm">{`as of ${formatDistanceToNowStrict(
                            lastTransaction.date,
                            { addSuffix: true }
                        )}, on ${format(
                            lastTransaction.date,
                            "dd LLLL yyyy"
                        )}`}</Text>
                    </VStack>
                </Card>
                <Card isNested>
                    <AreaChart data={data} />
                </Card>
            </Card>
        );
    };

    // === === ===
    // Combine the components.
    return (
        <PageTemplate page="accounts">
            <Breadcrumbs
                path={`Home/Accounts/${name}`}
                links={["/dashboard", "/accounts", `/accounts/${id}`]}
                title={""}
            />
            <Box h="100%" w="100%">
                <SimpleGrid minChildWidth="500px" spacing="30px">
                    <BalanceCard />
                    <TransactionCard />
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
                                createdAt
                            )} ago, at ${format(
                                createdAt,
                                "MMM d, yyyy h:mm a"
                            )}`}
                        />
                    </Card>
                </SimpleGrid>
            </Box>
            <Outlet context={[id, name, nickname]} />
        </PageTemplate>
    );
}
