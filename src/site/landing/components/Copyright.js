import { Divider, Text, VStack } from "@chakra-ui/react";

export default function Copyright() {
    return (
        <>
            <Divider />
            <VStack w="100%" py="15px" bg="bg-light">
                <Text fontSize="sm" color="fg-light">
                    Copyright © 2022 DollarPlanner. All rights reserved.
                </Text>
            </VStack>
        </>
    );
}
