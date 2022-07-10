import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Budget = () => {
    const budget = useSelector((state) => state.budgets.budget);

    return (
        <Box>
            <Text fontSize="2xl">Budget: ${budget}</Text>
        </Box>
    );
};

export default Budget;
