import { useReadTransactionsQuery } from "../../../app/api";
import { compareDesc, format } from "date-fns";
import TableCard from "../../../common/components/cards/TableCard";
import ActionButton from "../../../common/components/buttons/ActionButton";
import { MdModeEditOutline } from "react-icons/md";
import { Skeleton } from "@chakra-ui/react";
import BaseCard from "../../../common/components/cards/BaseCard";
import NavButton from "../../../common/components/buttons/NavButton";

export default function TransactionsCard() {
    const {
        data: transactions,
        isLoading,
        isError,
    } = useReadTransactionsQuery();

    if (isError) {
        return;
    }

    if (isLoading) {
        return (
            <BaseCard
                title="Transaction History"
                subtitle="Your ten latest transactions."
                button={
                    <ActionButton
                        variant="tertiary"
                        leftIcon={<MdModeEditOutline />}
                    >
                        Edit
                    </ActionButton>
                }
            >
                <Skeleton h="200px" />
            </BaseCard>
        );
    }

    if (transactions.length === 0) {
        return (
            <BaseCard
                heading="You haven't added any transactions yet."
                subheading="Once you've added a transaction to an account, you'll
                        see your transactions here."
            >
                <NavButton to="/accounts" text="Go to accounts" withArrow />
            </BaseCard>
        );
    }

    // Convert the transaction data into human-readable values for the table.
    const tableValues = transactions
        .slice()
        .sort((a, b) => compareDesc(a.date, b.date))
        .map((tx) => ({
            date: format(tx.date, "dd LLLL yyyy"),
            description: tx.description,
            category: tx.category,
            // Hide the $ symbol for less visual clutter.
            amount: tx.amount.format({ symbol: "" }),
            balance: tx.balance.format({ symbol: "" }),
        }));

    return (
        <TableCard
            title="Transaction History"
            subtitle="Your ten latest transactions."
            tableProps={{
                headers: [
                    "date",
                    "description",
                    "category",
                    "amount",
                    "balance",
                ],
                values: tableValues,
                isNumeric: [false, false, false, true, true],
                rowLimit: 10,
            }}
        />
    );
}
