import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    VStack,
} from "@chakra-ui/react";
import NavButton from "../../../common/components/buttons/NavButton";

export default function BudgetAlert({ progress, percentage }) {
    if (progress >= 100 && percentage <= 100) {
        return (
            <VStack spacing={4}>
                <Alert status="success" borderRadius="lg">
                    <AlertIcon />
                    <Box pl={1}>
                        <AlertTitle>Great job!</AlertTitle>
                        <AlertDescription>
                            You have completed your budget successfully!
                        </AlertDescription>
                    </Box>
                </Alert>
                <NavButton to="./create-budget" text="Create another budget" />
            </VStack>
        );
    }
    if (percentage > 100) {
        return (
            <Alert status="error" borderRadius="lg">
                <AlertIcon />
                <Box pl={1}>
                    <AlertTitle>Oh no...</AlertTitle>
                    <AlertDescription>
                        You have exceeded your budget. You can increase the
                        budget or delete it.
                    </AlertDescription>
                </Box>
            </Alert>
        );
    }
    if (percentage > progress) {
        return (
            <Alert status="warning" borderRadius="lg">
                <AlertIcon />
                <Box pl={1}>
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        You may be spending your budget too fast, relative to
                        the time elapsed. Consider reducing your short-term
                        expenditure.
                    </AlertDescription>
                </Box>
            </Alert>
        );
    }
    return (
        <Alert status="success" borderRadius="lg">
            <AlertIcon />
            <Box pl={1}>
                <AlertTitle>Good job!</AlertTitle>
                <AlertDescription>
                    You are currently on track with your budget.
                </AlertDescription>
            </Box>
        </Alert>
    );
}
