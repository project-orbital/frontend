import { useReadTransactionsQuery } from "../../../app/api";
import { discretize, newest } from "../../../common/utils/chrono";
import { compareAsc, format, formatDistanceToNow, isSameMonth } from "date-fns";
import currency from "currency.js";
import { groupBy } from "../../../common/utils/arrays";
import AreaChart from "../../../common/components/visuals/AreaChart";
import BaseCard from "../../../common/components/cards/BaseCard";
import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Stat from "../../../common/components/Stat";

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

    if (isLoading) {
        return null;
    }
    if (isError) {
        return;
    }

    if (transactions.length === 0) {
        return (
            <BaseCard title="Net Worth">
                <Stat
                    variant="primary"
                    value="SGD 0.00"
                    label={`as of ${format(new Date(), "dd LLLL yyyy")}`}
                />
                <Box w="50%">
                    <AreaChart data={{}} />
                </Box>
            </BaseCard>
        );
    }

    function computeHistory() {
        const months = groupBy(transactions, "accountId")
            .flatMap((account) =>
                discretize(account, (a, b) => isSameMonth(a.date, b.date))
            )
            .map((tx) => ({
                ...tx,
                label: format(tx.date, "LLLL yyyy"),
            }));
        return groupBy(months, "label")
            .sort((a, b) => compareAsc(a[0].date, b[0].date))
            .map((month) => ({
                x: month[0].label,
                y: month.reduce((acc, tx) => acc.add(tx.balance), currency(0)),
            }));
    }

    const NetWorth = () => {
        const history = computeHistory();
        const netWorth = history[history.length - 1].y;
        const asOf = newest(transactions).date;
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
        return (
            <Box w="100%">
                <AreaChart
                    data={computeHistory().map((tx) => ({
                        x: tx.x,
                        y: parseFloat(tx.y),
                    }))}
                />
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
