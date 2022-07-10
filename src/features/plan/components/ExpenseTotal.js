import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectSpendingTransactions } from "../../transactions/state/transactions";

const ExpenseTotal = () => {
    const totalExpenses = useSelector(selectSpendingTransactions).reduce(
        (total, t) => {
            return (total += -t.amount);
        },
        0
    );

    return (
        <Box>
            <Text fontSize="2xl">{"Spent so far: $" + totalExpenses}</Text>
        </Box>
    );
};

export default ExpenseTotal;
