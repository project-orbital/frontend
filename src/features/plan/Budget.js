import {
    AspectRatio,
    CircularProgress,
    CircularProgressLabel,
    GridItem,
    SimpleGrid,
    VStack,
} from "@chakra-ui/react";
import {
    compareDesc,
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
import { Outlet } from "react-router-dom";
import {
    useReadAccountsQuery,
    useReadBudgetQuery,
    useReadTransactionsQuery,
} from "../../app/api";
import NavButton from "../../common/components/buttons/NavButton";
import BaseCard from "../../common/components/cards/BaseCard";
import TableCard from "../../common/components/cards/TableCard";
import PieChart from "../../common/components/visuals/PieChart";
import Stat from "../../common/components/Stat";
import BudgetAlert from "./components/BudgetAlert";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

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

    // Progress
    const startDate = parseISO(budget.start_date);
    const endDate = parseISO(budget.end_date);
    const totalDuration = differenceInCalendarDays(startDate, endDate);
    const elapsedDuration = differenceInDays(startDate, new Date());
    const progress = Math.ceil((elapsedDuration / totalDuration) * 100);

    // Budget
    const expenses = transactions
        .filter(
            (transaction) =>
                (transaction.amount < 0 &&
                    isEqual(startDate, transaction.date)) ||
                isEqual(endDate, transaction.date) ||
                (isAfter(transaction.date, startDate) &&
                    isBefore(transaction.date, endDate))
        )
        .sort((a, b) => compareDesc(a.date, b.date));
    const totalExpenses = expenses
        .reduce((total, t) => total - t.amount, 0)
        .toFixed(2);
    const totalBudget = budget.budget.toFixed(2);
    const remainingBudget = totalBudget - totalExpenses;
    const percentage = Math.ceil((totalExpenses / totalBudget) * 100);

    // Tabulation
    const accountNickname = (id) => {
        const account = accounts.find((acc) => acc._id === id);
        return account.nickname;
    };
    const tabledTransactions = expenses.map((t) => ({
        "account nickname": accountNickname(t.accountId),
        description: t.description,
        date: format(t.date, "dd LLLL yyyy"),
        category: t.category,
        amount: t.amount.format({ symbol: "" }),
    }));

    // Categorization
    const categories = [
        "Dining",
        "Shopping",
        "Entertainment",
        "Bills",
        "Education",
        "Others",
    ];
    const categoryExpenditure = categories.map((category) => ({
        key: category,
        value: Math.floor(
            expenses
                .filter((tx) => tx.category === category)
                .reduce((total, tx) => total - tx.amount, 0)
        ),
    }));

    const BudgetCard = () => (
        <BaseCard title="Budget">
            <Stat
                variant="primary"
                value={
                    isPast(endDate)
                        ? "-"
                        : `SGD ${Math.abs(remainingBudget).toFixed(2)} ${
                              remainingBudget < 0 ? "over" : "under"
                          } budget`
                }
            />
            <SimpleGrid spacing={8} columns={[2, null, null, 3]}>
                <Stat label="Budget" value={`SGD ${totalBudget}`} />
                <Stat label="Total Spent" value={`SGD ${totalExpenses}`} />
            </SimpleGrid>
            <BudgetAlert progress={progress} percentage={percentage} />
            <CircularProgress
                capIsRound
                value={percentage}
                size="200px"
                thickness="4px"
                color={
                    percentage > 100
                        ? "red.500"
                        : percentage > progress
                        ? "orange.400"
                        : percentage > 80
                        ? "yellow.400"
                        : "green.400"
                }
            >
                <CircularProgressLabel fontSize="lg">
                    {isPast(endDate) ? "-" : `${percentage}% spent`}
                </CircularProgressLabel>
            </CircularProgress>
        </BaseCard>
    );

    const ProgressCard = () => (
        <BaseCard title="Progress">
            <Stat
                variant="primary"
                value={
                    isPast(endDate)
                        ? "-"
                        : `${formatDistance(new Date(), endDate)} remaining`
                }
            />
            <SimpleGrid spacing={8} columns={[2, null, null, 3]}>
                <Stat
                    label="Start Date"
                    value={format(startDate, "dd LLLL yyyy")}
                />
                <Stat
                    label="End Date"
                    value={format(endDate, "dd LLLL yyyy")}
                />
                <Stat
                    label="Total Duration"
                    value={`${formatDistance(endDate, startDate)}`}
                />
            </SimpleGrid>
            <CircularProgress
                capIsRound
                value={progress}
                size="200px"
                thickness="4px"
                color={
                    progress >= 100 && percentage > 100
                        ? "red.500"
                        : progress >= 100 && percentage <= 100
                        ? "green.400"
                        : "accent"
                }
            >
                <CircularProgressLabel fontSize="lg">
                    {isPast(endDate) ? "-" : `${progress}% elapsed`}
                </CircularProgressLabel>
            </CircularProgress>
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
            <AspectRatio ratio={32 / 9} my={32}>
                <PieChart data={categoryExpenditure} />
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
                        variant="primary"
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

    if (expenses.length === 0) {
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
                <Outlet />
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
