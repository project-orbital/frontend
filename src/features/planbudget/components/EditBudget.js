import React, { useState } from "react";
import {
    Box,
    Container,
    Button,
    Spacer,
    HStack,
    Input,
    Text,
} from "@chakra-ui/react";

export default function EditBudget(props) {
    const [value, setValue] = useState(props.budget);
    return (
        <HStack>
            <Box borderRadius={"3xl"} border="4px" borderColor="gray.500">
                <HStack>
                    <Container>
                        <HStack>
                            <Text fontSize={25}> Budget: </Text>
                            <Input
                                fontSize={25}
                                id="name"
                                value={value}
                                onChange={(event) =>
                                    setValue(event.target.value)
                                }
                            />
                        </HStack>
                    </Container>
                    <Spacer />
                    <Button
                        onClick={() => props.handleSaveClick(value)}
                        borderRadius={"3xl"}
                        border="4px"
                        borderColor="gray.500"
                        colorScheme="blue"
                    >
                        Save
                    </Button>
                    <Spacer />
                </HStack>
            </Box>
        </HStack>
    );
}
