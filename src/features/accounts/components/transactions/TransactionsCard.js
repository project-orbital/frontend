import NavButton from "../../../../common/components/buttons/NavButton";
import { MdOutlineCallMade, MdOutlineCallReceived } from "react-icons/md";

import { useReadTransactionsInAccountQuery } from "../../../../app/api";
import { compareDesc, format } from "date-fns";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseCard from "../../../../common/components/cards/BaseCard";
import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import TableCard from "../../../../common/components/cards/TableCard";
import { FiEdit2, FiTrash } from "react-icons/fi";

export default function TransactionsCard() {
    const [isEditing, setIsEditing] = useState(false);
    const { id: accountId } = useParams();
    const navigate = useNavigate();
    const {
        data: transactions,
        isLoading,
        isError,
    } = useReadTransactionsInAccountQuery(accountId);

    console.log(transactions);

    if (isError) {
        return;
    }

    // Unique card to be displayed when no transactions are found.
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

    // The edit and delete controls.
    const ControlButtons = ({ id }) => (
        <HStack pl={4} spacing={2}>
            <IconButton
                aria-label="edit"
                onClick={() => navigate(`./transactions/${id}/update`)}
                icon={<FiEdit2 />}
                size="sm"
                bg="none"
            />
            <IconButton
                aria-label="edit"
                onClick={() => navigate(`./transactions/${id}/delete`)}
                icon={<FiTrash />}
                size="sm"
                bg="none"
            />
        </HStack>
    );

    // Hide the controls if the user is not editing.
    const headers = isEditing
        ? ["date", "description", "category", "amount", "balance", " "]
        : ["date", "description", "category", "amount", "balance"];

    // Converts the transaction data into human-readable values for the table.
    // Adds edit and delete controls as the last column of the table.
    // Filters out transactions that don't match the search query in certain fields.
    function getTableValues(query = "") {
        if (isLoading) {
            return [];
        }
        const qr = query.toLowerCase();
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
                // Header is a blank string because we don't want to show a header.
                " ": <ControlButtons id={tx.id} />,
            }))
            .filter(
                (tx) =>
                    tx.description.toLowerCase().includes(qr) ||
                    tx.date.toLowerCase().includes(qr) ||
                    tx.category.toLowerCase().includes(qr) ||
                    tx.amount.toLowerCase().includes(qr) ||
                    tx.balance.toLowerCase().includes(qr)
            );
    }

    // TODO: Search bar which allows the user to filter the table by a string query.

    return (
        <TableCard
            title="Transactions"
            isLoading={isLoading}
            tableProps={{
                headers: headers,
                values: getTableValues(),
                isNumeric: [false, false, false, true, true, false],
                onMouseEnter: () => setIsEditing(true),
                onMouseLeave: () => setIsEditing(false),
            }}
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
