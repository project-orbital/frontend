import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Spacer,
} from "@chakra-ui/react";
import NavButton from "../../../common/components/buttons/NavButton";

export default function BudgetAlert({
    isComplete,
    isOnTrack,
    IsOverspending,
    HasOverSpent,
}) {
    if (isComplete) {
        return (
            <Alert status="success" borderRadius="10px">
                <AlertIcon />
                <Box>
                    <AlertTitle>Good job!</AlertTitle>
                    <AlertDescription>
                        You have successfully completed your budgeting plan.
                    </AlertDescription>
                </Box>
                <Spacer />
                <NavButton to="./create-budget" text="Create another budget" />
            </Alert>
        );
    }

    if (isOnTrack) {
        return (
            <Alert status="success" borderRadius="10px">
                <AlertIcon />
                <Box>
                    <AlertTitle>Good Work</AlertTitle>
                    <AlertDescription>
                        You are currently on track with your budgeting!
                    </AlertDescription>
                </Box>
            </Alert>
        );
    }

    if (IsOverspending) {
        return (
            <Alert status="warning" borderRadius="10px">
                <AlertIcon />
                <Box>
                    <AlertTitle>Oh no...</AlertTitle>
                    <AlertDescription>
                        It appears that you are spending a little too much!
                        Reduce your spending or adjust your budget!
                    </AlertDescription>
                </Box>
            </Alert>
        );
    }

    if (HasOverSpent) {
        return (
            <Alert status="error" borderRadius="10px">
                <AlertIcon />
                <Box>
                    <AlertTitle>Oops!</AlertTitle>
                    <AlertDescription>
                        You have currently exceeded your budget, you can amend
                        the budgeted amount or create a new budget.
                    </AlertDescription>
                </Box>
            </Alert>
        );
    }
}
