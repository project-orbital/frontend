import Card from "../../../common/components/Card";
import { useReadTransactionsQuery } from "../../../app/api";
import { discretize, newest } from "../../../common/utils/chrono";
import NavButton from "../../../common/components/buttons/NavButton";
import { MdOutlineCallMade, MdOutlineCallReceived } from "react-icons/md";
import { compareAsc, format, formatDistanceToNow, isSameMonth } from "date-fns";
import currency from "currency.js";
import { groupBy } from "../../../common/utils/arrays";
import AreaChart from "../../../common/components/visuals/AreaChart";

export default function NetWorthCard() {
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

    // Net worth computation.
    const isSameAccount = (a, b) => a.accountId === b.accountId;
    const lastTransactions = discretize(transactions, isSameAccount);
    const asOf = newest(lastTransactions).date;
    const netWorth = lastTransactions.reduce(
        (acc, tx) => acc.add(tx.balance),
        currency(0)
    );

    // Net worth history computation.
    const months = groupBy(transactions, "accountId")
        .flatMap((account) => discretize(account, isSameMonth))
        .map((tx) => ({
            ...tx,
            label: format(tx.date, "LLLL yyyy"),
        }));
    const history = groupBy(months, "label")
        .sort((a, b) => compareAsc(a[0].date, b[0].date))
        .map((month) => ({
            x: month[0].label,
            y: parseFloat(
                month.reduce((acc, tx) => acc.add(tx.balance), currency(0))
            ),
        }));

    console.log(history);

    return (
        <Card heading="Net Worth">
            <Card isNested>
                <Card
                    isStandalone
                    isNested
                    heading={netWorth.format({ symbol: "SGD " })}
                    subheading={`as of ${formatDistanceToNow(asOf, {
                        addSuffix: true,
                    })}, on ${format(asOf, "dd LLLL yyyy")}`}
                />
            </Card>
            <Card isNested>
                <AreaChart data={history} />
            </Card>
        </Card>
    );
}
