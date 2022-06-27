import { AppProvider } from "./context/BudgetPlannerContext";
import Budget from "./components/Budget";
import ExpenseTotal from "./components/ExpenseTotal";
import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpenseForm";
import RemainingBudget from "./components/Remaining";
import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import { Badge, Box, SimpleGrid } from "@chakra-ui/react";
import Card from "../../common/components/Card";

export default function Plan() {
    return (
        <PageTemplate page="plan">
            <Breadcrumbs
                path="Home/Budget Planner"
                links={["/dashboard", "/plan"]}
            />
            <AppProvider>
                <Box w="100%" h="100%">
                    <SimpleGrid minChildWidth="500px" spacing="30px">
                        <Card
                            heading="Budget Tracker"
                            badge={
                                <Badge colorScheme="orange">
                                    Work in Progress
                                </Badge>
                            }
                        >
                            <Budget />
                            <RemainingBudget />
                            <ExpenseTotal />
                        </Card>
                        <Card
                            heading="Expenses"
                            badge={
                                <Badge colorScheme="orange">
                                    Work in Progress
                                </Badge>
                            }
                        >
                            <ExpenseList />
                        </Card>
                        <Card
                            heading="Add Expense"
                            badge={
                                <Badge colorScheme="orange">
                                    Work in Progress
                                </Badge>
                            }
                        >
                            <AddExpenseForm />
                        </Card>
                    </SimpleGrid>
                </Box>
            </AppProvider>
        </PageTemplate>
    );
}
