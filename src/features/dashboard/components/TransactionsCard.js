import UploadButton from "../../transactions/components/UploadButton";
import { selectTransactions } from "../../transactions/state/transactions";
import { useSelector } from "react-redux";
import Table from "../../../common/components/visuals/Table";
import Card from "../../../common/components/Card";

export default function TransactionsCard() {
    const transactions = useSelector(selectTransactions);

    const NoTransactions = () => (
        <Card
            heading="No transactions to display."
            subheading="Get started by creating one manually, or upload a bank statement."
        >
            <UploadButton />
        </Card>
    );

    const Transactions = () => (
        <Card heading="Your recent transactions.">
            <Table values={transactions} />
        </Card>
    );

    return transactions.length > 0 ? <Transactions /> : <NoTransactions />;
}
