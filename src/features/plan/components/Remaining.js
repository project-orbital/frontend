import React, { useContext } from "react";
import { AppContext } from "../context/BudgetPlannerContext";
import { Box, Text } from "@chakra-ui/react";

const RemainingBudget = () => {
    const { expenses, budget } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const remaining = budget - totalExpenses;

    if (remaining >= 0) {
        return (
            <Box>
                <Text fontSize="2xl">{"Remaining: $" + remaining}</Text>
            </Box>
        );
    } else {
        return (
            <Box>
                <Text fontSize="2xl">{"Remaining: $" + remaining}</Text>
            </Box>
        );
    }
};

export default RemainingBudget;
