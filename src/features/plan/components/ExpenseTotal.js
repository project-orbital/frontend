import React, { useContext } from "react";
import { AppContext } from "../context/BudgetPlannerContext";
import { Box, Text } from "@chakra-ui/react";

const ExpenseTotal = () => {
    const { expenses } = useContext(AppContext);

    const total = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    return (
        <Box>
            <Text fontSize="2xl">{"Spent so far: $" + total}</Text>
        </Box>
    );
};

export default ExpenseTotal;
