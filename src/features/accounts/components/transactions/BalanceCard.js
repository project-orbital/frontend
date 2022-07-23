import { useParams } from "react-router-dom";
import { useReadTransactionsInAccountQuery } from "../../../../app/api";
import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { format, formatDistanceToNow, isSameMonth } from "date-fns";
import AreaChart from "../../../../common/components/visuals/AreaChart";
import { discretize, newest } from "../../../../common/utils/chrono";
import BaseCard from "../../../../common/components/cards/BaseCard";
import currency from "currency.js";

export default function BalanceCard() {
    const { id: accountId } = useParams();
    const {
        data: transactions,
        isLoading,
        isError,
    } = useReadTransactionsInAccountQuery(accountId);

    const accentGradient = useColorModeValue(
        "linear(to-t, accent, fg)",
        "linear(to-t, fg, fg)"
    );

    if (isError) {
        return;
    }

    // Don't display this card when there are no transactions.
    if (!isLoading && transactions.length === 0) {
        return;
    }

    const { balance, date } = isLoading
        ? { balance: currency(0), date: new Date() }
        : newest(transactions);
    const monthEndBalances = isLoading
        ? {}
        : discretize(transactions, (a, b) => isSameMonth(a.date, b.date)).map(
              (tx) => ({
                  x: format(tx.date, "LLLL yyyy"),
                  y: parseFloat(tx.balance),
              })
          );

    return (
        <BaseCard title="Balance" isLoading={isLoading}>
            <Box>
                <Heading bgGradient={accentGradient} bgClip="text">
                    {balance.format({ symbol: "SGD " })}
                </Heading>
                <Text fontSize="sm" color="fg-light">
                    {`as of ${formatDistanceToNow(date, {
                        addSuffix: true,
                    })}, on ${format(date, "dd LLLL yyyy")}`}
                </Text>
            </Box>
            <AreaChart data={monthEndBalances} />
        </BaseCard>
    );
}
