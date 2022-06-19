import {Heading, Text, VStack} from "@chakra-ui/react";
import UploadButton from "../upload/UploadButton";
import {selectTransactions} from '../../states/transactions'
import {useSelector} from "react-redux";
import Table from "../visuals/Table";

export default function TransactionsCard() {
    const transactions = useSelector(selectTransactions);

    const NoTransactions = () => <>
        <Heading as='h3' size='md'>No transactions to display.</Heading>
        <Text fontSize='sm' pb='20px'>Get started by creating one manually, or upload a bank statement.</Text>
        <UploadButton/>
    </>

    const Transactions = () => <>
        <Heading as='h3' size='md' pb='20px'>Your recent transactions.</Heading>
        <Table values={transactions}/>
    </>

    return <VStack align='start' p='30px' bg='white' borderRadius='10px' shadow='sm'>
        <VStack align='start'>
            {transactions.length > 0 ? <Transactions/> : <NoTransactions/>}
        </VStack>
    </VStack>
}
