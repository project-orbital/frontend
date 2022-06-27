import { selectTransactions } from "../../transactions/state/transactions";
import { useSelector } from "react-redux";
import Table from "../../../common/components/visuals/Table";
import Card from "../../../common/components/Card";
import { format } from "date-fns";

export default function TransactionsCard() {
    const transactions = useSelector(selectTransactions).map((transaction) => {
        return {
            date: format(transaction.date, "dd LLLL yyyy"),
            description: transaction.description,
            amount: transaction.amount.toFixed(2),
            balance: transaction.balance.toFixed(2),
        };
    });

    const NoTransactions = () => (
        <Card
            isCentered
            heading="No transactions to display."
            subheading="Get started by creating one manually, or upload a bank statement."
        />
    );

    const Transactions = () => (
        <Card heading="Transactions">
            <Table values={transactions} />
        </Card>
    );

    return transactions.length > 0 ? <Transactions /> : <NoTransactions />;
}
