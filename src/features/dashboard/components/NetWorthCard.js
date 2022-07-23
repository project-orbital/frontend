import {
    useReadLiabilitiesQuery,
    useReadOrdersQuery,
    useReadPaymentsQuery,
    useReadTransactionsQuery,
} from "../../../app/api";
import { discretize, newest } from "../../../common/utils/chrono";
import { compareAsc, format, formatDistanceToNow, isSameMonth } from "date-fns";
import currency from "currency.js";
import { groupBy } from "../../../common/utils/arrays";
import AreaChart from "../../../common/components/visuals/AreaChart";
import BaseCard from "../../../common/components/cards/BaseCard";
import { Box, SimpleGrid } from "@chakra-ui/react";
import Stat from "../../../common/components/Stat";

export default function NetWorthCard() {
    const {
        data: transactions,
        isLoading: isTransactionsLoading,
        isError: isTransactionsError,
    } = useReadTransactionsQuery();

    const {
        data: orders,
        isLoading: isOrdersLoading,
        isError: isOrdersError,
    } = useReadOrdersQuery();

    const {
        data: liabilities,
        isLoading: isLiabilitiesLoading,
        isError: isLiabilitiesError,
    } = useReadLiabilitiesQuery();

    const {
        data: payments,
        isLoading: isPaymentsLoading,
        isError: isPaymentsError,
    } = useReadPaymentsQuery();

    if (
        isTransactionsLoading ||
        isOrdersLoading ||
        isLiabilitiesLoading ||
        isPaymentsLoading
    ) {
        return null;
    }
    if (
        isTransactionsError ||
        isOrdersError ||
        isLiabilitiesError ||
        isPaymentsError
    ) {
        return;
    }

    if (
        transactions.length === 0 &&
        orders.length === 0 &&
        liabilities.length === 0
    ) {
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

    function computeAccountsHistory() {
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
    const accountsHistory = computeAccountsHistory();
    const accountsValue =
        accountsHistory[accountsHistory.length - 1]?.y ?? currency(0);

    const assetsValue = orders.reduce(
        (acc, order) =>
            acc.add(order.price.multiply(order.amount)).subtract(order.fee),
        currency(0)
    );

    const liabilitiesValue = liabilities
        .reduce((acc, liability) => acc.add(liability.amount), currency(0))
        .subtract(
            payments.reduce(
                (acc, payment) => acc.add(payment.amount),
                currency(0)
            )
        );

    const NetWorth = () => {
        const netWorth = accountsValue
            .add(assetsValue)
            .subtract(liabilitiesValue);
        const asOf = newest(transactions)?.date ?? new Date();
        return (
            <Stat
                variant="primary"
                value={netWorth.format({ symbol: "SGD " })}
                label={`as of ${formatDistanceToNow(asOf, {
                    addSuffix: true,
                })}, on ${format(asOf, "dd LLLL yyyy")}`}
            />
        );
    };

    const Stats = () => {
        return (
            <SimpleGrid spacing={8} columns={[2, null, null, 3]}>
                <Stat
                    label="From Accounts"
                    value={accountsValue.format({ symbol: "SGD " })}
                />
                <Stat
                    label="From Assets"
                    value={assetsValue.format({ symbol: "SGD " })}
                />
                <Stat
                    label="From Liabilities"
                    value={liabilitiesValue
                        .multiply(-1)
                        .format({ symbol: "SGD " })}
                />
            </SimpleGrid>
        );
    };

    const History = () => {
        return (
            <Box w="100%">
                <AreaChart
                    data={accountsHistory.map((tx) => ({
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
            subtitle="The sum of your account balances and assets, minus your liabilities."
        >
            <NetWorth />
            <Stats />
            <History />
        </BaseCard>
    );
}
