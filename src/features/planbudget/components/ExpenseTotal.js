import React, { useContext } from "react";
import { AppContext } from "../context/BudgetPlannerContext";
import { Box, Container } from "@chakra-ui/react";

const ExpenseTotal = () => {
    const { expenses } = useContext(AppContext);

    const total = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    return (
        <Box
            fontSize={25}
            borderRadius={"3xl"}
            border="4px"
            borderColor="gray.500"
            bg="orange.300"
        >
            <Container>Spent so far: ${total}</Container>
        </Box>
    );
};

export default ExpenseTotal;
