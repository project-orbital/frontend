import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import {
    Badge,
    Grid,
    AspectRatio,
    GridItem,
    Box,
    Text,
} from "@chakra-ui/react";
import Card from "../../common/components/Card";
import { selectAccounts } from "../accounts/state/accounts";
import { useSelector } from "react-redux";
import {
    selectSpendingTransactions,
    selectSpendingTransactionsBetween,
} from "../transactions/state/transactions";
import {
    format,
    differenceInDays,
    parseISO,
    differenceInCalendarDays,
} from "date-fns";
import Table from "../../common/components/visuals/Table";
import NavButton from "../../common/components/buttons/NavButton";
import ExpensesCategoryCard from "./components/ExpensesCategoryCard";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Outlet } from "react-router-dom";

export default function Plan() {
    const budget = useSelector((state) => state.budgets.budget);
    const totalExpenses = useSelector(selectSpendingTransactions)
        .reduce((total, t) => {
            return (total += -t.amount);
        }, 0)
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
                .reduce((total, t) => {
                    return (total += t.amount);
                }, 0)
        ),
    }));

    // Text for subheading, need fix UI
    // After you initiate a plan, we will sync the spendings from your account(s).
    // From there, you can track the progress of your budgeting and have a quick view of where
    // your expenses are going.Good luck!
    const IntroductionCard = () => {
        return (
            <Card
                isCentered
                heading="Welcome to Budget Planner."
                subheading="...."
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
                    <Card heading="Budget Details">
                        <Box>
                            <Text fontSize="2xl">Start Date: {start_date}</Text>
                        </Box>
                        <Box>
                            <Text fontSize="2xl">End Date: {end_date}</Text>
                        </Box>
                        <Box>
                            <Text fontSize="2xl">Budget: ${budget}</Text>
                        </Box>
                        <Box>
                            <Text fontSize="2xl">
                                {"Remaining: $" + remaining}
                            </Text>
                        </Box>
                        <Box>
                            <Text fontSize="2xl">
                                {"Spent so far: $" + totalExpenses}
                            </Text>
                        </Box>
                    </Card>
                </GridItem>
                <GridItem>
                    <Card heading="Progress (Time)">
                        <Card isNested>
                            <AspectRatio ratio={16 / 9}>
                                <CircularProgressbar
                                    value={progress}
                                    text={`${progress}% complete`}
                                    styles={buildStyles({
                                        pathColor:
                                            progress > 100
                                                ? "#DC2626"
                                                : "#3b82f6",
                                        trailColor: "#f5f5f5",
                                        textColor:
                                            progress > 100
                                                ? "#DC2626"
                                                : "#3b82f6",
                                        textSize: "12px",
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
