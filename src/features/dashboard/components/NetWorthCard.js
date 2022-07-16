import { useReadTransactionsQuery } from "../../../app/api";
import { discretize, newest } from "../../../common/utils/chrono";
import { compareAsc, format, formatDistanceToNow, isSameMonth } from "date-fns";
import currency from "currency.js";
import { groupBy } from "../../../common/utils/arrays";
import AreaChart from "../../../common/components/visuals/AreaChart";
import BaseCard from "../../../common/components/cards/BaseCard";
import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export default function NetWorthCard() {
    const accentGradient = useColorModeValue(
        "linear(to-t, accent, fg)",
        "linear(to-t, fg, fg)"
    );

    const {
        data: transactions,
        isLoading,
        isError,
    } = useReadTransactionsQuery();

    if (isError) {
        return;
    }

    const NetWorth = () => {
        const isSameAccount = (a, b) => a.accountId === b.accountId;
        const lastTransactions =
            isLoading || transactions.length === 0
                ? []
                : discretize(transactions, isSameAccount);
        const asOf =
            isLoading || transactions.length === 0
                ? new Date()
                : newest(lastTransactions).date;
        const netWorth =
            isLoading || transactions.length === 0
                ? currency(0)
                : lastTransactions.reduce(
                      (acc, tx) => acc.add(tx.balance),
                      currency(0)
                  );
        return (
            <Box>
                <Heading bgGradient={accentGradient} bgClip="text">
                    {netWorth.format({ symbol: "SGD " })}
                </Heading>
                <Text fontSize="sm" color="fg-light">
                    {`as of ${formatDistanceToNow(asOf, {
                        addSuffix: true,
                    })}, on ${format(asOf, "dd LLLL yyyy")}`}
                </Text>
            </Box>
        );
    };

    const History = () => {
        if (isLoading || transactions.length === 0) {
            return (
                <Box w="100%">
                    <AreaChart data={{}} />
                </Box>
            );
        }
        const months = groupBy(transactions, "accountId")
            .flatMap((account) => discretize(account, isSameMonth))
            .map((tx) => ({
                ...tx,
                label: format(tx.date, "LLLL yyyy"),
            }));
        const history = groupBy(months, "label")
            .sort((a, b) => compareAsc(a[0].date, b[0].date))
            .map((month) => ({
                x: month[0].label,
                y: parseFloat(
                    month.reduce((acc, tx) => acc.add(tx.balance), currency(0))
                ),
            }));
        return (
            <Box w="100%">
                <AreaChart data={history} />
            </Box>
        );
    };

    return (
        <BaseCard
            title="Net Worth"
            subtitle="The sum of your account balances."
            isLoading={isLoading}
        >
            <NetWorth />
            <History />
        </BaseCard>
    );
}
