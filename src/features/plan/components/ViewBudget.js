import React from "react";
import { Button, Container, HStack } from "@chakra-ui/react";

export default function ViewBudget(props) {
    return (
        <HStack>
            <Container fontSize={25}>Budget: ${props.budget}</Container>
            <Button onClick={props.handleEditClick} colorScheme="blue">
                Edit
            </Button>
        </HStack>
    );
}
