import {Stat, StatHelpText, StatLabel, StatNumber, VStack} from "@chakra-ui/react";

export default function Card(props) {
    return <VStack h="100%" w="100%" p="40px" align="start" bg="white" borderRadius="20px" shadow="sm">
        <Stat>
            <StatLabel>{props.label}</StatLabel>
            <StatNumber>{props.value}</StatNumber>
            <StatHelpText>
                {props.change && props.symbol}
                {props.change}
            </StatHelpText>
        </Stat>
        {props.body}
    </VStack>
}
