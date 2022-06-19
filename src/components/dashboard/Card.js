import {Center, Spacer, Stat, StatHelpText, StatLabel, StatNumber, VStack} from "@chakra-ui/react";

export default function Card(props) {
    return <VStack minH="400px" minW="600px" h="100%" w="100%" p="30px" align="start" bg="white" borderRadius="10px"
                   shadow="sm">
        <Stat>
            <StatLabel>{props.label}</StatLabel>
            <StatNumber>{props.value}</StatNumber>
            <StatHelpText>
                {props.change && props.symbol}
                {props.change}
            </StatHelpText>
        </Stat>
        <Spacer/>
        <Center h="100%" w="100%">
            {props.body}
        </Center>
    </VStack>
}
