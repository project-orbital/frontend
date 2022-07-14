import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import { Grid, AspectRatio, GridItem, Box } from "@chakra-ui/react";
import Card from "../../common/components/Card";
import { selectAccounts } from "../accounts/state/accounts";
import { useSelector } from "react-redux";
import {
    selectSpendingTransactions,
    selectSpendingTransactionsBetween,
} from "../transactions/state/transactions";
import {
    format,
    formatDistanceStrict,
    parseISO,
    differenceInDays,
    differenceInCalendarDays,
    isPast,
} from "date-fns";
import Table from "../../common/components/visuals/Table";
import NavButton from "../../common/components/buttons/NavButton";
import ExpensesCategoryCard from "./components/ExpensesCategoryCard";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Outlet } from "react-router-dom";
import LightTable from "../../common/components/visuals/LightTable";
import BudgetAlert from "./components/BudgetAlert";

export default function Plan() {
    const budget = useSelector((state) => state.budgets.budget);
    const totalExpenses = useSelector(selectSpendingTransactions)
        .reduce((total, t) => total - t.amount, 0)
        .toFixed(2);
    const start_date = useSelector((state) => state.budgets.start_date);
    const end_date = useSelector((state) => state.budgets.end_date);
    const remaining = (budget - totalExpenses).toFixed(2);
    const percentage = ((totalExpenses / budget) * 100).toFixed(1);
    const accounts = useSelector(selectAccounts);
    const accountNickname = (id) => {
        const account = accounts.find((acc) => acc.id === id);
        return account.nickname;
    };

    const transactions = useSelector(
        selectSpendingTransactionsBetween(start_date, end_date)
    ).map((t) => ({
        "account nickname": accountNickname(t.accountId),
        date: format(t.date, "dd LLLL yyyy"),
        category: t.category,
        amount: -t.amount.toFixed(2),
    }));

    const totalDays = differenceInCalendarDays(
        parseISO(start_date),
        parseISO(end_date)
    );
    const daysFromStart = differenceInDays(parseISO(start_date), new Date());
    const progress = ((daysFromStart / totalDays) * 100).toFixed(0);
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
                .reduce((total, t) => total + t.amount, 0)
        ),
    }));

    const IntroductionCard = () => {
        return (
            <Card
                isCentered
                heading="Welcome to Budget Planner."
                subheading="After you initiate a plan, we will sync the spendings from your accounts.
                            From there, you can track the progress of your budgeting and 
                            have a quick view of where your expenses are going."
            >
                <NavButton
                    to="./create-budget"
                    text="Create a budgeting plan"
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

    const DeleteBudgetCard = () => {
        return (
            <Card heading="Budget management">
                <NavButton
                    to="./amend-budget"
                    text="Amend budget"
                    bg="bg-danger"
                    c="fg-danger"
                />
                <NavButton
                    to="./delete-budget"
                    text="Delete budget"
                    bg="bg-danger"
                    c="fg-danger"
                />
            </Card>
        );
    };

    if (budget === 0) {
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
                </Grid>
                <Outlet />
            </PageTemplate>
        );
    } else {
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
                        <Card heading="Budget Details">
                            <Card isNested>
                                <LightTable
                                    headers={[
                                        "Start Date",
                                        "End Date",
                                        "Duration",
                                        "Time left",
                                    ]}
                                    primary={[
                                        format(
                                            parseISO(start_date),
                                            "dd LLLL yyyy"
                                        ),
                                        format(
                                            parseISO(end_date),
                                            "dd LLLL yyyy"
                                        ),
                                        `${formatDistanceStrict(
                                            parseISO(end_date),
                                            parseISO(start_date)
                                        )}`,
                                        !isPast(parseISO(end_date)) &&
                                            `${formatDistanceStrict(
                                                new Date(),
                                                parseISO(end_date)
                                            )}`,
                                    ]}
                                />
                            </Card>
                            <Card isNested>
                                <LightTable
                                    headers={[
                                        "Budget",
                                        "Spent thus far",
                                        "Remaining",
                                    ]}
                                    primary={[
                                        `$${budget}`,
                                        `$${totalExpenses}`,
                                        `$${remaining}`,
                                    ]}
                                />
                            </Card>
                            <Box>
                                {progress >= 100 && percentage <= 100 ? (
                                    <BudgetAlert isComplete />
                                ) : percentage > 100 ? (
                                    <BudgetAlert HasOverSpent />
                                ) : percentage - progress > 0 ? (
                                    <BudgetAlert IsOverspending />
                                ) : (
                                    <BudgetAlert isOnTrack />
                                )}
                            </Box>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card heading="Progress (Time)">
                            <Card isNested>
                                <AspectRatio ratio={16 / 9}>
                                    <CircularProgressbar
                                        value={progress}
                                        text={
                                            progress >= 100
                                                ? "Over!"
                                                : `${progress}% complete`
                                        }
                                        styles={buildStyles({
                                            pathColor:
                                                progress >= 100 &&
                                                percentage > 100
                                                    ? "#DC2626"
                                                    : progress >= 100 &&
                                                      percentage <= 100
                                                    ? "#2fdc26"
                                                    : progress > 80
                                                    ? "#f6ae3b"
                                                    : "#3b82f6",
                                            trailColor: "#f5f5f5",
                                            textColor:
                                                progress >= 100 &&
                                                percentage > 100
                                                    ? "#DC2626"
                                                    : progress >= 100 &&
                                                      percentage <= 100
                                                    ? "#2fdc26"
                                                    : progress > 80
                                                    ? "#f6ae3b"
                                                    : "#3b82f6",
                                            textSize: "10px",
                                        })}
                                    />
                                </AspectRatio>
                            </Card>
                        </Card>
                    </GridItem>
                    <Card heading="Progress (Budget)">
                        <Card isNested>
                            <AspectRatio ratio={16 / 9}>
                                <CircularProgressbar
                                    value={percentage}
                                    text={`${percentage}% spent`}
                                    styles={buildStyles({
                                        pathColor:
                                            percentage > 100
                                                ? "#DC2626"
                                                : percentage > 80
                                                ? "#f6ae3b"
                                                : "#3b82f6",
                                        trailColor: "#f5f5f5",
                                        textColor:
                                            percentage > 100
                                                ? "#DC2626"
                                                : percentage > 80
                                                ? "#f6ae3b"
                                                : "#3b82f6",
                                        textSize: "10px",
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
                    <GridItem>
                        <DeleteBudgetCard />
                    </GridItem>
                </Grid>
                <Outlet />
            </PageTemplate>
        );
    }
}
