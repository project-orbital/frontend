import React, { useState } from "react";
import { Button, HStack, Input, Spacer, Text } from "@chakra-ui/react";

export default function EditBudget(props) {
    const [value, setValue] = useState(props.budget);
    return (
        <HStack>
            <Text fontSize={25}> Budget: </Text>
            <Input
                fontSize={25}
                id="name"
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <Spacer />
            <Button
                onClick={() => props.handleSaveClick(value)}
                colorScheme="blue"
            >
                Save
            </Button>
            <Spacer />
        </HStack>
    );
}
