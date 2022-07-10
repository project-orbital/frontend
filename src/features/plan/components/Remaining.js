import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectSpendingTransactions } from "../../transactions/state/transactions";

const RemainingBudget = () => {
    const totalExpenses = useSelector(selectSpendingTransactions).reduce(
        (total, t) => {
            return (total += -t.amount);
        },
        0
    );

    const budget = useSelector((state) => state.budgets.budget);

    const remaining = budget - totalExpenses;

    return (
        <Box>
            <Text fontSize="2xl">{"Remaining: $" + remaining}</Text>
        </Box>
    );
};

export default RemainingBudget;
