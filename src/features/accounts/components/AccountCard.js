import Card from "../../../common/components/Card";
import { useSelector } from "react-redux";
import { selectLastTransactionFromAccount } from "../transactions/state/transactions";
import { format, formatDistanceToNowStrict } from "date-fns";
import LightTable from "../../../common/components/visuals/LightTable";
import NavButton from "../../../common/components/buttons/NavButton";
import { Badge } from "@chakra-ui/react";

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
                primary={[
                    format(date, "dd LLLL yyyy"),
                    lines[0] || "None",
                    `SGD ${amount.toFixed(2)}`,
                    `SGD ${balance.toFixed(2)}`,
                ]}
                secondary={[
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
            badge={<Badge>{index}</Badge>}
            heading={account.name}
            subheading={account.nickname}
            link={`/accounts/${account._id}`}
        >
            <Card
                isNested
                heading="Balance"
                subheading={
                    lastTransaction
                        ? `SGD ${lastTransaction.balance}`
                        : "No balance information."
                }
            />
            <Card
                isNested
                heading="Last Transaction"
                subheading={lastTransaction ? null : "No transactions yet."}
            >
                {lastTransaction ? (
                    <LastTransaction transaction={lastTransaction} />
                ) : (
                    <NavButton to={`./${account._id}`} text="Go to account" />
                )}
            </Card>
        </Card>
    );
}
