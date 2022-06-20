import { Center, Text } from "@chakra-ui/react";

export default function Copyright() {
    return (
        <Center
            w="100%"
            p="1em 20%"
            justify="space-between"
            bg="gray.800"
            shadow="2xl"
        >
            <Text fontSize="s" color="white">
                Copyright © 2022 DollarPlanner. All rights reserved.
            </Text>
        </Center>
    );
}
