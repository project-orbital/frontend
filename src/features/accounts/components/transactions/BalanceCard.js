import { useParams } from "react-router-dom";
import { useReadTransactionsInAccountQuery } from "../../../../app/api";
import Card from "../../../../common/components/Card";
import { Text, VStack } from "@chakra-ui/react";
import { format, formatDistanceToNowStrict, isSameMonth } from "date-fns";
import AreaChart from "../../../../common/components/visuals/AreaChart";
import { discretize, newest } from "../../../../common/utils/chrono";

export default function BalanceCard() {
    const { id: accountId } = useParams();
    const {
        data: transactions,
        isLoading,
        isError,
    } = useReadTransactionsInAccountQuery(accountId);
    // Don't display this card while loading for now.
    // TODO: When skeleton cards are implemented, display that instead.
    if (isLoading || isError) {
        return;
    }
    // Don't display this card when there are no transactions.
    if (transactions.length === 0) {
        return;
    }

    const lastTransaction = newest(transactions);
    const monthEndBalances = discretize(transactions, isSameMonth).map(
        (tx) => ({
            x: format(tx.date, "LLLL yyyy"),
            y: parseFloat(tx.balance),
        })
    );

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
                <AreaChart data={monthEndBalances} />
            </Card>
        </Card>
    );
}
