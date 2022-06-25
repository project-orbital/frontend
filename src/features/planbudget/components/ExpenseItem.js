import React, { useContext } from "react";
import { AppContext } from "../context/BudgetPlannerContext";
import {
    Spacer,
    Box,
    ButtonGroup,
    Button,
    Text,
    HStack,
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
        <Box
            size="xl"
            bg="grey.300"
            borderRadius="md"
            fontSize="xl"
            BorderColor="lime"
        >
            <HStack>
                <Text w="100%" p="5px" borderRadius="lg" cursor="pointer">
                    {props.name}
                </Text>
                <Spacer />
                <ButtonGroup gap="2">
                    <Box
                        as="button"
                        borderRadius="md"
                        bg="orange.400"
                        color="white"
                        px={15}
                        h={9}
                        w={200}
                    >
                        ${props.cost}
                    </Box>
                    <Button
                        h={9}
                        colorScheme="red"
                        onClick={handleDeleteExpense}
                    >
                        Delete
                    </Button>
                </ButtonGroup>
            </HStack>
        </Box>
    );
};

export default ExpenseItem;
