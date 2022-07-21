import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import { AspectRatio, Box, Grid, GridItem } from "@chakra-ui/react";
import Card from "../../common/components/Card";
import {
    differenceInCalendarDays,
    differenceInDays,
    format,
    formatDistanceStrict,
    isPast,
    isEqual,
    isAfter,
    isBefore,
    compareAsc,
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
import {
    useReadAccountsQuery,
    useReadBudgetQuery,
    useReadTransactionsQuery,
} from "../../app/api";

export default function Plan() {
    const {
        data: budget,
        isLoading: isBudgetLoading,
        isError: isBudgetError,
    } = useReadBudgetQuery();

    const {
        data: transactions,
        isLoading: isTransactionsLoading,
        isError: isTransactionsError,
    } = useReadTransactionsQuery();

    const {
        data: accounts,
        isLoading: isAccountsLoading,
        isError: isAccountsError,
    } = useReadAccountsQuery();

    if (isBudgetLoading || isTransactionsLoading || isAccountsLoading) {
        // We need this check to ensure that we don't get `undefined` data.
        return null;
    }

    if (isBudgetError || isTransactionsError || isAccountsError) {
        // We need this check to ensure that we don't get `undefined` data.
        return null;
    }

    console.log(budget);
    console.log(transactions);
    if (!isBudgetLoading && budget.length === 0) {
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
                    </GridItem>
                </Grid>
                <Outlet />
            </PageTemplate>
        );
    } else {
        const start_date = parseISO(budget.start_date);
        const end_date = parseISO(budget.end_date);
        const budget_amount = budget.budget.toFixed(2);

        const spendingTransactions = transactions
            .filter((transaction) => transaction.amount < 0)
            .filter(
                (transaction) =>
                    isEqual(start_date, transaction.date) ||
                    isEqual(end_date, transaction.date) ||
                    (isAfter(transaction.date, start_date) &&
                        isBefore(transaction.date, end_date))
            )
            .sort((a, b) => compareAsc(a.date, b.date))
            .reverse();

        const totalExpenses = spendingTransactions
            .reduce((total, t) => total - t.amount, 0)
            .toFixed(2);

        const remaining = (budget_amount - totalExpenses).toFixed(2);
        const percentage = ((totalExpenses / budget_amount) * 100).toFixed(1);
        const accountNickname = (id) => {
            const account = accounts.find((acc) => acc._id === id);
            return account.nickname;
        };

        const tabledTransactions = spendingTransactions.map((t) => ({
            "account nickname": accountNickname(t.accountId),
            description: t.description,
            date: format(t.date, "dd LLLL yyyy"),
            category: t.category,
            amount: t.amount.format({ symbol: "" }),
        }));

        const totalDays = differenceInCalendarDays(start_date, end_date);
        const daysFromStart = differenceInDays(start_date, new Date());
        const progress = ((daysFromStart / totalDays) * 100).toFixed(0);
        const spendingCategories = [
            "Dining",
            "Shopping",
            "Entertainment",
            "Bills",
            "Education",
            "Others",
        ];

        const spendingsData = spendingCategories.map((c) => ({
            key: c,
            value: Math.floor(
                spendingTransactions
                    .filter((t) => t.category === c)
                    .reduce((total, t) => total - t.amount, 0)
            ),
        }));

        const SpendingTransactionsCard = () => {
            if (spendingTransactions.length === 0) {
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
                            <Table values={tabledTransactions} />
                        </Card>
                    </Card>
                );
            }
        };

        const BudgetManagementCard = () => {
            return (
                <Card heading="Budget management">
                    <NavButton
                        to="./update-budget"
                        text="Update budget"
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
                                        format(start_date, "dd LLLL yyyy"),
                                        format(end_date, "dd LLLL yyyy"),
                                        `${formatDistanceStrict(
                                            end_date,
                                            start_date
                                        )}`,
                                        !isPast(end_date) &&
                                            `${formatDistanceStrict(
                                                new Date(),
                                                end_date
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
                                        `$${budget_amount}`,
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
                    {!(spendingTransactions.length === 0) && (
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
                    )}
                    <GridItem>
                        {!(spendingTransactions.length === 0) && (
                            <ExpensesCategoryCard data={spendingsData} />
                        )}
                    </GridItem>
                    <GridItem colSpan={2}>
                        <SpendingTransactionsCard />
                    </GridItem>
                    <GridItem>
                        <BudgetManagementCard />
                    </GridItem>
                </Grid>
                <Outlet />
            </PageTemplate>
        );
    }
}
