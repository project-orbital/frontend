import NavButton from "../../../../common/components/buttons/NavButton";
import {
    MdOutlineCallMade,
    MdOutlineCallReceived,
    MdOutlineEdit,
} from "react-icons/md";

import { useReadTransactionsInAccountQuery } from "../../../../app/api";
import { compareDesc, format } from "date-fns";
import { useParams } from "react-router-dom";
import BaseCard from "../../../../common/components/cards/BaseCard";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import TableCard from "../../../../common/components/cards/TableCard";
import { BiSelectMultiple } from "react-icons/bi";

export default function TransactionsCard() {
    const { id: accountId } = useParams();
    const {
        data: transactions,
        isLoading,
        isError,
    } = useReadTransactionsInAccountQuery(accountId);

    if (isError) {
        return;
    }

    const Buttons = () => (
        <HStack>
            <NavButton
                to={`./transactions/update/`}
                variant="tertiary"
                leftIcon={<MdOutlineEdit size="18px" />}
            >
                Edit
            </NavButton>
            <NavButton
                to={`./transactions/delete/`}
                variant="tertiary"
                leftIcon={<BiSelectMultiple size="18px" />}
            >
                Manage
            </NavButton>
        </HStack>
    );

    if (!isLoading && transactions.length === 0) {
        return (
            <BaseCard>
                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        {"You haven't added any transactions yet."}
                    </Text>
                    <Text>
                        Once you've added a transaction, you'll see it and your
                        account balance here.
                    </Text>
                </Box>
                <VStack align="start" spacing={4}>
                    <NavButton
                        to="./transactions/create/withdrawal"
                        icon={<MdOutlineCallMade color="white" size="20px" />}
                        text="Add a withdrawal transaction"
                    />
                    <NavButton
                        to="./transactions/create/deposit"
                        icon={
                            <MdOutlineCallReceived color="white" size="20px" />
                        }
                        text="Add a deposit transaction"
                    />
                </VStack>
            </BaseCard>
        );
    }

    // Convert the transaction data into human-readable values for the table.
    function tableValues() {
        if (isLoading) {
            return [];
        }
        return transactions
            .slice()
            .sort((a, b) => compareDesc(a.date, b.date))
            .map((tx) => ({
                date: format(tx.date, "dd LLLL yyyy"),
                description: tx.description,
                category: tx.category,
                // Hide the $ symbol for less visual clutter.
                amount: tx.amount.format({ symbol: "" }),
                balance: tx.balance.format({ symbol: "" }),
            }));
    }

    return (
        <TableCard
            title="Transactions"
            values={tableValues()}
            button={<Buttons />}
            isLoading={isLoading}
        >
            <VStack align="start" spacing={4} p={8}>
                <NavButton
                    to="./transactions/create/withdrawal"
                    icon={<MdOutlineCallMade color="white" size="20px" />}
                    text="Add a withdrawal transaction"
                />
                <NavButton
                    to="./transactions/create/deposit"
                    icon={<MdOutlineCallReceived color="white" size="20px" />}
                    text="Add a deposit transaction"
                />
            </VStack>
        </TableCard>
    );
}
