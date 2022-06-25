import React from "react";
import { Box, Container, Button, Spacer, HStack } from "@chakra-ui/react";

export default function ViewBudget(props) {
    return (
        <HStack>
            <Box borderRadius={"3xl"} border="4px" borderColor="gray.500">
                <HStack>
                    <Container fontSize={25}>Budget: ${props.budget}</Container>
                    <Spacer />
                    <Button
                        onClick={props.handleEditClick}
                        borderRadius={"3xl"}
                        border="4px"
                        borderColor="gray.500"
                        colorScheme="blue"
                    >
                        Edit
                    </Button>
                    <Spacer />
                </HStack>
            </Box>
        </HStack>
    );
}
