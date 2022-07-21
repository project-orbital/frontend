import { AspectRatio, Box, GridItem } from "@chakra-ui/react";
import Card from "../../common/components/Card";
import { useSelector } from "react-redux";
import {
    differenceInCalendarDays,
    differenceInDays,
    format,
    formatDistanceStrict,
    isPast,
    parseISO,
} from "date-fns";
import Table from "../../common/components/visuals/Table";
import NavButton from "../../common/components/buttons/NavButton";
import ExpensesCategoryCard from "./components/ExpensesCategoryCard";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Outlet } from "react-router-dom";
import LightTable from "../../common/components/visuals/LightTable";
import BudgetAlert from "./components/BudgetAlert";
import { useReadAccountsQuery, useReadTransactionsQuery } from "../../app/api";

export default function Plan() {
    const {
        data: accountsData,
        isLoading: isAccountsLoading,
        isError: isAccountsError,
    } = useReadAccountsQuery();

    const {
        data: transactionsData,
        isLoading: isTransactionsLoading,
        isError: isTransactionsError,
    } = useReadTransactionsQuery();

    const budget = useSelector((state) => state.budgets.budget);
    const start_date = useSelector((state) => state.budgets.start_date);
    const end_date = useSelector((state) => state.budgets.end_date);

    if (isAccountsLoading || isTransactionsLoading) {
        return null;
    }
    if (isAccountsError || isTransactionsError) {
        return null;
    }

    const accounts = accountsData;
    const transactions = transactionsData
        .filter((tx) => tx.date >= start_date && tx.date <= end_date)
        .map((t) => ({
            "account nickname": accountNickname(t.accountId),
            date: format(t.date, "dd LLLL yyyy"),
            category: t.category,
            amount: -t.amount.toFixed(2),
        }));
    const totalExpenses = transactionsData
        .filter((tx) => tx.date >= start_date && tx.date <= end_date)
        .reduce((total, t) => total - t.amount, 0)
        .toFixed(2);

    const remaining = (budget - totalExpenses).toFixed(2);
    const percentage = ((totalExpenses / budget) * 100).toFixed(1);

    const accountNickname = (id) => {
        const account = accounts.find((acc) => acc.id === id);
        return account.nickname;
    };
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
                    subheading="There is no spending transaction in your accounts to import."
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
            <>
                <IntroductionCard />
                <Outlet />
            </>
        );
    } else {
        return (
            <>
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
                                    format(parseISO(end_date), "dd LLLL yyyy"),
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
                                            progress >= 100 && percentage > 100
                                                ? "#DC2626"
                                                : progress >= 100 &&
                                                  percentage <= 100
                                                ? "#2fdc26"
                                                : progress > 80
                                                ? "#f6ae3b"
                                                : "#3b82f6",
                                        trailColor: "#f5f5f5",
                                        textColor:
                                            progress >= 100 && percentage > 100
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
            </>
        );
    }
}
