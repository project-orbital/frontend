import { AspectRatio, Box, GridItem, VStack } from "@chakra-ui/react";
import Card from "../../common/components/Card";
import {
    compareAsc,
    differenceInCalendarDays,
    differenceInDays,
    format,
    formatDistanceStrict,
    isAfter,
    isBefore,
    isEqual,
    isPast,
    parseISO,
} from "date-fns";
import NavButton from "../../common/components/buttons/NavButton";
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
import BaseCard from "../../common/components/cards/BaseCard";
import TableCard from "../../common/components/cards/TableCard";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import PieChart from "../../common/components/visuals/PieChart";

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

    if (budget.length === 0) {
        return (
            <>
                <BaseCard
                    heading="Welcome to Budget Planner."
                    subheading="Once you've created a budget, you can track your progress and
                    view your expenses, which we will sync from your accounts."
                >
                    <NavButton
                        to="./create-budget"
                        text="Create a budget"
                        withArrow
                    />
                </BaseCard>
                <Outlet />
            </>
        );
    }
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

    const DetailsCard = () => (
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
                        `${formatDistanceStrict(end_date, start_date)}`,
                        !isPast(end_date) &&
                            `${formatDistanceStrict(new Date(), end_date)}`,
                    ]}
                />
            </Card>
            <Card isNested>
                <LightTable
                    headers={["Budget", "Spent thus far", "Remaining"]}
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
    );

    const ProgressCard = () => (
        <Card heading="Progress (Time)">
            <Card isNested>
                <AspectRatio ratio={16 / 9}>
                    <CircularProgressbar
                        value={progress}
                        text={
                            progress >= 100 ? "Over!" : `${progress}% complete`
                        }
                        styles={buildStyles({
                            pathColor:
                                progress >= 100 && percentage > 100
                                    ? "#DC2626"
                                    : progress >= 100 && percentage <= 100
                                    ? "#2fdc26"
                                    : progress > 80
                                    ? "#f6ae3b"
                                    : "#3b82f6",
                            trailColor: "#f5f5f5",
                            textColor:
                                progress >= 100 && percentage > 100
                                    ? "#DC2626"
                                    : progress >= 100 && percentage <= 100
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
    );

    const RemainderCard = () => {
        if (spendingTransactions.length === 0) {
            return null;
        }
        return (
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
        );
    };

    const CategoriesCard = () => {
        if (spendingTransactions.length === 0) {
            return null;
        }
        return (
            <Card heading="Expenses by Category">
                <Card isNested>
                    <AspectRatio ratio={16 / 9}>
                        <PieChart data={spendingsData} />
                    </AspectRatio>
                </Card>
            </Card>
        );
    };

    const SpendingTransactionsCard = () => {
        if (spendingTransactions.length === 0) {
            return (
                <BaseCard
                    heading="No relevant expenses were found for the duration of this budget."
                    subheading="We automatically import your expenses from your accounts, but didn't find any."
                >
                    <NavButton to="/accounts" text="Go to accounts" withArrow />
                </BaseCard>
            );
        }
        return (
            <TableCard
                title="Expenses"
                subtitle="We only import the expenses which occur over the course of this budget."
                tableProps={{
                    values: tabledTransactions,
                }}
            />
        );
    };

    const BudgetManagementCard = () => {
        return (
            <BaseCard
                title="Settings"
                subtitle="You can manage your budget here."
            >
                <VStack align="start" spacing={4}>
                    <NavButton
                        to="./update-budget"
                        text="Edit budget"
                        bg="bg-danger"
                        c="fg-danger"
                        icon={<MdOutlineEdit size="18px" />}
                    />
                    <NavButton
                        to="./delete-budget"
                        text="Delete budget"
                        bgGradient="linear(to-br, red.400, red.600)"
                        icon={<MdOutlineDelete size="20px" />}
                    />
                </VStack>
            </BaseCard>
        );
    };

    return (
        <>
            <DetailsCard />
            <ProgressCard />
            <RemainderCard />
            <CategoriesCard />
            <GridItem colSpan={[1, null, 2]}>
                <SpendingTransactionsCard />
            </GridItem>
            <GridItem colSpan={[1, null, 2]}>
                <BudgetManagementCard />
            </GridItem>
            <Outlet />
        </>
    );
}
