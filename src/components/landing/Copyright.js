import {HStack, Spacer, Text} from "@chakra-ui/react";

export default function Copyright() {
    return <HStack w="100%" p="1em 20%" justify="space-between" bg="gray.800" shadow="2xl">
        <Text fontSize="xs" color="white">Copyright © 2022 DollarPlanner. All rights reserved.</Text>
        <Spacer/>
        <Text fontSize="xs" color="white">An Orbital 2022 Project @ NUS</Text>
    </HStack>
}
