import Card from "../../../common/components/Card";
import { useSelector } from "react-redux";
import { selectLastTransactionFromAccount } from "../../transactions/state/transactions";
import { format, formatDistanceToNowStrict } from "date-fns";
import LightTable from "../../../common/components/visuals/LightTable";
import NavButton from "../../../common/components/buttons/NavButton";

export default function AccountCard({ account, index }) {
    const lastTransaction = useSelector(
        selectLastTransactionFromAccount(account.id)
    );

    const LastTransaction = ({ transaction }) => {
        const { date, description, amount, balance } = transaction;
        const lines = description.split("\n");
        return (
            <LightTable
                headers={[
                    "date",
                    "description",
                    amount >= 0 ? "deposit" : "withdrawal",
                    "balance",
                ]}
                firstRow={[
                    format(date, "dd LLLL yyyy"),
                    lines[0] || "None",
                    `SGD ${amount.toFixed(2)}`,
                    `SGD ${balance.toFixed(2)}`,
                ]}
                secondRow={[
                    formatDistanceToNowStrict(date, {
                        addSuffix: true,
                        unit: "day",
                    }),
                    lines.slice(1).join("\n"),
                    null,
                    null,
                ]}
            />
        );
    };

    return (
        <Card
            info={index}
            heading={account.name}
            subheading={account.nickname}
            link={`/accounts/${account.id}`}
        >
            <Card
                isNested
                heading="Balance"
                subheading={
                    lastTransaction
                        ? `SGD ${lastTransaction.balance}`
                        : "No balance information."
                }
            ></Card>
            <Card
                isNested
                heading="Last Transaction"
                subheading={lastTransaction ? null : "No transactions yet."}
            >
                {lastTransaction ? (
                    <LastTransaction transaction={lastTransaction} />
                ) : (
                    <NavButton to={`./${account.id}`} text="Go to account" />
                )}
            </Card>
        </Card>
    );
}
