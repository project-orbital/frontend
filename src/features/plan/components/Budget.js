import { useContext, useState } from "react";
import ViewBudget from "./ViewBudget";
import EditBudget from "./EditBudget";
import { AppContext } from "../context/BudgetPlannerContext";
import { Box } from "@chakra-ui/react";

const Budget = () => {
    const { budget, dispatch } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = (value) => {
        dispatch({
            type: "SET_BUDGET",
            payload: value,
        });
        setIsEditing(false);
    };

    return (
        <Box
            size="xl"
            bg="grey.300"
            borderRadius="md"
            fontSize="xl"
            BorderColor="lime"
        >
            {isEditing ? (
                <EditBudget handleSaveClick={handleSaveClick} budget={budget} />
            ) : (
                // For part 1 render component inline rather than create a seperate one
                <ViewBudget handleEditClick={handleEditClick} budget={budget} />
            )}
        </Box>
    );
};

export default Budget;
