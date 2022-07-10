import Budget from "./components/Budget";
import ExpenseTotal from "./components/ExpenseTotal";
import RemainingBudget from "./components/Remaining";
import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import { Badge, Grid, AspectRatio, GridItem } from "@chakra-ui/react";
import Card from "../../common/components/Card";
import { selectAccounts } from "../accounts/state/accounts";
import { useSelector } from "react-redux";
import { selectSpendingTransactions } from "../transactions/state/transactions";
import { format } from "date-fns";
import Table from "../../common/components/visuals/Table";
import NavButton from "../../common/components/buttons/NavButton";
import ExpensesCategoryCard from "./components/ExpensesCategoryCard";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Outlet } from "react-router-dom";

export default function Plan() {
    const budget = useSelector((state) => state.budgets.budget);
    const totalExpenses = useSelector(selectSpendingTransactions).reduce(
        (total, t) => {
            return (total += -t.amount);
        },
        0
    );
    const percentage = ((totalExpenses / budget) * 100).toFixed(1);
    const accounts = useSelector(selectAccounts);
    const accountNickname = (id) => {
        const account = accounts.find((acc) => acc.id === id);
        return account.nickname;
    };

    const transactions = useSelector(selectSpendingTransactions).map((t) => ({
        "account nickname": accountNickname(t.accountId),
        date: format(t.date, "dd LLLL yyyy"),
        category: t.category,
        amount: -t.amount.toFixed(2),
    }));

    const spendingCategories = [
        "Dining",
        "Shopping",
        "Entertainment",
        "Bills",
        "Education",
        "Others",
    ];
    const spendingsData = spendingCategories.map((spending) => ({
        key: spending,
        value: Math.floor(
            transactions
                .filter((t) => t.category === spending)
                .reduce((total, t) => {
                    return (total += t.amount);
                }, 0)
        ),
    }));

    const IntroductionCard = () => {
        return (
            <Card
                isCentered
                heading="Welcome to Budget Planner."
                subheading="We sync the spendings from your account(s) and bla bla."
                badge={<Badge colorScheme="orange">NEW!</Badge>}
            >
                <NavButton
                    to="./create-budget"
                    text="Create a budgeting plan"
                    bg="dim"
                    c="fg"
                />
            </Card>
        );
    };

    const SpendingTransactions = () => {
        if (transactions.length === 0) {
            return (
                <Card
                    isCentered
                    heading="No transactions to display."
                    subheading="There is no spending transaction in your account(s) to import."
                />
            );
        } else {
            return (
                <Card heading="Imported spending transactions">
                    <Card isNested>
                        <Table values={transactions} />
                    </Card>
                </Card>
            );
        }
    };

    return (
        <PageTemplate page="plan">
            <Breadcrumbs
                path={"Home/Budget Planner"}
                links={["/dashboard", "/plan"]}
            />
            <Grid
                w="100%"
                gap="25px"
                autoColumns="minmax(600px, auto)"
                autoFlow="row"
            >
                <GridItem>
                    <IntroductionCard />
                </GridItem>
                <GridItem>
                    <Card heading="Budget Tracker">
                        <Budget />
                        <RemainingBudget />
                        <ExpenseTotal />
                    </Card>
                </GridItem>
                <Card heading="Progress">
                    <Card isNested>
                        <AspectRatio ratio={16 / 9}>
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage}% Spent`}
                                styles={buildStyles({
                                    pathColor:
                                        percentage > 100
                                            ? "#DC2626"
                                            : "#3b82f6",
                                    trailColor: "#f5f5f5",
                                    textColor:
                                        percentage > 100
                                            ? "#DC2626"
                                            : "#3b82f6",
                                    textSize: "12px",
                                })}
                            />
                        </AspectRatio>
                    </Card>
                </Card>
                <GridItem>
                    <ExpensesCategoryCard data={spendingsData} />
                </GridItem>
                <GridItem colSpan={2}>
                    <SpendingTransactions />
                </GridItem>
            </Grid>
            <Outlet />
        </PageTemplate>
    );
}
