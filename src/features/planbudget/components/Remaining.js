import React, { useContext } from "react";
import { AppContext } from "../context/BudgetPlannerContext";
import { Box, Container } from "@chakra-ui/react";

const RemainingBudget = () => {
    const { expenses, budget } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const Remaining = budget - totalExpenses;

    if (Remaining >= 0) {
        return (
            <Box
                borderRadius={"3xl"}
                border="4px"
                borderColor="gray.500"
                bg="green.300"
            >
                <Container fontSize={25}>Remaining: ${Remaining}</Container>
            </Box>
        );
    } else {
        return (
            <Box
                borderRadius={"3xl"}
                border="4px"
                borderColor="gray.500"
                bg="red.300"
            >
                <Container fontSize={25}>Remaining: ${Remaining}</Container>
            </Box>
        );
    }
};

export default RemainingBudget;
