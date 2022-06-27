import { AppProvider } from "./context/BudgetPlannerContext";
import Budget from "./components/Budget";
import ExpenseTotal from "./components/ExpenseTotal";
import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpenseForm";
import RemainingBudget from "./components/Remaining";
import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";

export default function Plan() {
    return (
        <PageTemplate>
            <Breadcrumbs
                path="Home/Budget Planner"
                links={["/dashboard", "/plan"]}
            />
            <AppProvider>
                <Box bg="gray.300" w="100%" p={5} color="black" rounded="xl">
                    <Heading>Budget Tracker</Heading>
                    <Flex>
                        <Spacer />
                        <Budget />
                        <Spacer />
                        <RemainingBudget />
                        <Spacer />
                        <ExpenseTotal />
                        <Spacer />
                    </Flex>
                </Box>
                <Box bg="gray.300" w="100%" p={5} color="black" rounded="xl">
                    <Heading>Expenses</Heading>
                    <ExpenseList />
                </Box>
                <Box bg="gray.300" w="100%" p={5} color="black" rounded="xl">
                    <Heading>Add Expense</Heading>
                    <AddExpenseForm />
                </Box>
            </AppProvider>
        </PageTemplate>
    );
}
