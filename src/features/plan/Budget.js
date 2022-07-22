import {
    AspectRatio,
    Box,
    CircularProgress,
    CircularProgressLabel,
    GridItem,
    SimpleGrid,
    VStack,
} from "@chakra-ui/react";
import {
    compareAsc,
    differenceInCalendarDays,
    differenceInDays,
    format,
    formatDistance,
    isAfter,
    isBefore,
    isEqual,
    isPast,
    parseISO,
} from "date-fns";
import NavButton from "../../common/components/buttons/NavButton";
import { Outlet } from "react-router-dom";
import {
    useReadAccountsQuery,
    useReadBudgetQuery,
    useReadTransactionsQuery,
} from "../../app/api";
import BaseCard from "../../common/components/cards/BaseCard";
import TableCard from "../../common/components/cards/TableCard";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import PieChart from "../../common/components/visuals/PieChart";
import Stat from "../../common/components/Stat";
import BudgetAlert from "./components/BudgetAlert";

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

    const remaining = budget_amount - totalExpenses;
    const percentage = Math.ceil((totalExpenses / budget_amount) * 100);
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
    const progress = Math.ceil((daysFromStart / totalDays) * 100);
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

    const BudgetCard = () => (
        <BaseCard title="Budget">
            <Stat
                variant="primary"
                value={
                    isPast(end_date)
                        ? "-"
                        : `SGD ${Math.abs(remaining)} ${
                              remaining < 0 ? "over" : "under"
                          } budget`
                }
            />
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
            <CircularProgress
                capIsRound
                value={percentage}
                size="200px"
                thickness="4px"
                color={
                    percentage > 100
                        ? "#DC2626"
                        : percentage > 80
                        ? "#f6ae3b"
                        : "#3b82f6"
                }
            >
                <CircularProgressLabel fontSize="lg">
                    {isPast(end_date) ? "-" : `${percentage}% spent`}
                </CircularProgressLabel>
            </CircularProgress>
            <SimpleGrid spacing={8} columns={[2, null, null, 3]}>
                <Stat label="Budget" value={`SGD ${budget_amount}`} />
                <Stat label="Total Spent" value={`SGD ${totalExpenses}`} />
            </SimpleGrid>
        </BaseCard>
    );

    const ProgressCard = () => (
        <BaseCard title="Progress">
            <Stat
                variant="primary"
                value={
                    isPast(end_date)
                        ? "-"
                        : `${formatDistance(new Date(), end_date)} remaining`
                }
            />
            <CircularProgress
                capIsRound
                value={progress}
                size="200px"
                thickness="4px"
                color={
                    progress >= 100 && percentage > 100
                        ? "#DC2626"
                        : progress >= 100 && percentage <= 100
                        ? "#2fdc26"
                        : progress > 80
                        ? "#f6ae3b"
                        : "#3b82f6"
                }
            >
                <CircularProgressLabel fontSize="lg">
                    {isPast(end_date) ? "-" : `${progress}% elapsed`}
                </CircularProgressLabel>
            </CircularProgress>
            <SimpleGrid spacing={8} columns={[2, null, null, 3]}>
                <Stat
                    label="Start Date"
                    value={format(start_date, "dd LLLL yyyy")}
                />
                <Stat
                    label="End Date"
                    value={format(end_date, "dd LLLL yyyy")}
                />
                <Stat
                    label="Total Duration"
                    value={`${formatDistance(end_date, start_date)}`}
                />
            </SimpleGrid>
        </BaseCard>
    );

    const ExpensesCard = () => (
        <TableCard
            title="Expenses"
            subtitle="We only import the expenses which occur over the course of this budget."
            tableProps={{
                values: tabledTransactions,
            }}
        >
            <AspectRatio ratio={16 / 9}>
                <PieChart data={spendingsData} />
            </AspectRatio>
        </TableCard>
    );

    const SettingsCard = () => {
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

    if (spendingTransactions.length === 0) {
        return (
            <>
                <BaseCard
                    heading="No relevant expenses were found for the duration of this budget."
                    subheading="We automatically import your expenses from your accounts, but didn't find any."
                >
                    <NavButton to="/accounts" text="Go to accounts" withArrow />
                </BaseCard>
                <BudgetCard />
                <ProgressCard />
                <SettingsCard />
            </>
        );
    }

    return (
        <>
            <BudgetCard />
            <ProgressCard />
            <GridItem colSpan={[1, null, 2]}>
                <ExpensesCard />
            </GridItem>
            <GridItem colSpan={[1, null, 2]}>
                <SettingsCard />
            </GridItem>
            <Outlet />
        </>
    );
}
