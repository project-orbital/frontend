import Card from "../../../../common/components/Card";
import NavButton from "../../../../common/components/buttons/NavButton";
import { MdOutlineCallMade, MdOutlineCallReceived } from "react-icons/md";
import { useReadTransactionsInAccountQuery } from "../../../../app/api";
import Table from "../../../../common/components/visuals/Table";
import { compareDesc, format } from "date-fns";
import { useParams } from "react-router-dom";

export default function TransactionsCard() {
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
    if (transactions.length === 0) {
        return (
            <Card
                isCentered
                heading="No transactions added."
                subheading="Get started by adding a transaction."
            >
                <NavButton
                    to="./transactions/create/withdrawal"
                    icon={<MdOutlineCallMade color="white" size="20px" />}
                    text="Add a withdrawal transaction"
                />
                <NavButton
                    to="./transactions/create/deposit"
                    icon={<MdOutlineCallReceived color="white" size="20px" />}
                    text="Add a deposit transaction"
                />
            </Card>
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
            <Card isNested>
                <Table values={tableValues} rowLimit={10} />
            </Card>
            <Card isNested>
                <NavButton
                    to="./transactions/create/withdrawal"
                    bg="dim"
                    color="fg"
                    icon={<MdOutlineCallMade color="fg" size="20px" />}
                    text="Add a withdrawal"
                />
                <NavButton
                    to="./transactions/create/deposit"
                    bg="dim"
                    color="fg"
                    icon={<MdOutlineCallReceived color="fg" size="20px" />}
                    text="Add a deposit"
                />
            </Card>
        </Card>
    );
}
