import {Heading, Spacer, Text, VStack} from "@chakra-ui/react";
import UploadButton from "../upload/UploadButton";
import Card from "./Card";

export default function TransactionsCard() {
    const NoTransactions = () => <>
        <VStack mb="5%" align="flex-start" justify="space-between">
            <Heading as='h3' size='lg'>No transactions to display.</Heading>
            <Text fontSize="sm">Get started by creating one manually, or upload a bank statement.</Text>
            <Spacer p="10px 0"/>
            <UploadButton/>
        </VStack>
    </>

    return <Card
        label="Recent Transactions"
        value="5"
        body={<NoTransactions/>}
    />
}
