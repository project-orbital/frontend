import Card from "../../../../common/components/Card";
import NavButton from "../../../../common/components/buttons/NavButton";
import { Badge } from "@chakra-ui/react";
import { useReadTransactionsInAccountQuery } from "../../../../app/api";
import { newest } from "../../../../common/utils/chrono";
import LightTable from "../../../../common/components/visuals/LightTable";
import { format, formatDistanceToNowStrict } from "date-fns";

/**
 * The card component which displays a summary of a specified account.
 * Used in `Accounts`.
 *
 * @param account an object with the details of the account to display
 * @param index the reading order index of the account to display in a badge
 */
export default function AccountCard({ account, index }) {
    const accountId = account._id;
    const badge = <Badge>{`#${index + 1}`}</Badge>;
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
                badge={badge}
                heading={account.name}
                subheading={account.nickname}
                link={`/accounts/${accountId}`}
            >
                <Card
                    isNested
                    heading="Transactions"
                    subheading="No transactions yet."
                >
                    <NavButton to={`./${accountId}`} text="Go to account" />
                </Card>
            </Card>
        );
    }
    const lastTransaction = newest(transactions);
    const { date, description, amount, balance } = lastTransaction;
    const lines = description.split("\n");
    return (
        <Card
            badge={badge}
            heading={account.name}
            subheading={account.nickname}
            link={`/accounts/${accountId}`}
        >
            <Card isNested heading="Balance" subheading={`SGD ${balance}`} />
            <Card isNested heading="Last Transaction">
                <LightTable
                    headers={[
                        "date",
                        "description",
                        amount >= 0 ? "deposit" : "withdrawal",
                        "balance",
                    ]}
                    primary={[
                        format(date, "dd LLLL yyyy"),
                        lines[0] ?? "None",
                        amount.format({ symbol: "SGD " }),
                        balance.format({ symbol: "SGD " }),
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
            </Card>
        </Card>
    );
}
