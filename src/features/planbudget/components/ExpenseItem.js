import React, { useContext } from "react";
import { AppContext } from "../context/BudgetPlannerContext";
import {
    Spacer,
    Flex,
    Box,
    ButtonGroup,
    Button,
    Heading,
} from "@chakra-ui/react";

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: "DELETE_EXPENSE",
            payload: props.id,
        });
    };

    return (
        <Box>
            <Flex minWidth="max-content" alignItems="center" gap="2">
                <Box p="2">
                    <Heading size="md">{props.name}</Heading>
                </Box>
                <Spacer />
                <ButtonGroup gap="2">
                    <Box
                        as="button"
                        borderRadius="md"
                        bg="tomato"
                        color="white"
                        px={15}
                        h={8}
                    >
                        ${props.cost}
                    </Box>
                    <Button colorScheme="teal" onClick={handleDeleteExpense}>
                        Delete
                    </Button>
                </ButtonGroup>
            </Flex>
        </Box>
    );
};

export default ExpenseItem;
