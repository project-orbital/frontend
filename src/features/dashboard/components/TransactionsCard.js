import Table from "../../../common/components/visuals/Table";
import Card from "../../../common/components/Card";
import { useReadTransactionsQuery } from "../../../app/api";
import { compareDesc, format } from "date-fns";

export default function TransactionsCard() {
    const {
        data: transactions,
        isLoading,
        isError,
    } = useReadTransactionsQuery();
    // Don't display this card while loading for now.
    // TODO: When skeleton cards are implemented, display that instead.
    if (isLoading || isError) {
        return;
    }
    if (transactions.length === 0) {
        return (
            <Card
                isCentered
                heading="No transactions to display."
                subheading="Get started by creating one manually, or upload a bank statement."
            />
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
        <Card heading="Transactions">
            <Table values={tableValues} />
        </Card>
    );
}
