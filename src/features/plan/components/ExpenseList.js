import React, { useContext, useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../context/BudgetPlannerContext";
import { Input, StackDivider, VStack } from "@chakra-ui/react";

const ExpenseList = () => {
    const { expenses } = useContext(AppContext);

    const [filteredExpenses, setfilteredExpenses] = useState(expenses || []);

    useEffect(() => {
        setfilteredExpenses(expenses);
    }, [expenses]);

    const handleChange = (event) => {
        const searchResults = expenses.filter((filteredExpense) =>
            filteredExpense.name.toLowerCase().includes(event.target.value)
        );
        setfilteredExpenses(searchResults);
    };

    return (
        <VStack>
            <Input placeholder="Search" fontSize="20" onChange={handleChange} />
            {filteredExpenses.map((expense) => (
                <VStack
                    divider={<StackDivider />}
                    borderColor="gray.500"
                    borderWidth="2px"
                    p="5"
                    borderRadius="lg"
                    w="200%"
                    maxW={{ base: "90vw", sm: "100vw", lg: "60vw", xl: "30vw" }}
                    alignItems="stretch"
                >
                    <ExpenseItem
                        id={expense.id}
                        name={expense.name}
                        cost={expense.cost}
                    />
                </VStack>
            ))}
        </VStack>
    );
};

export default ExpenseList;
