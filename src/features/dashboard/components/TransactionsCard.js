import { useReadTransactionsQuery } from "../../../app/api";
import { compareDesc, format } from "date-fns";
import TableCard from "../../../common/components/cards/TableCard";
import ActionButton from "../../../common/components/buttons/ActionButton";
import { MdModeEditOutline } from "react-icons/md";
import { Box, Skeleton, Text } from "@chakra-ui/react";
import BaseCard from "../../../common/components/cards/BaseCard";
import NavButton from "../../../common/components/buttons/NavButton";

export default function TransactionsCard() {
    const {
        data: transactions,
        isLoading,
        isError,
    } = useReadTransactionsQuery();

    if (isError) {
        return;
    }

    if (isLoading) {
        return (
            <BaseCard
                title="Transaction History"
                subtitle="Your ten latest transactions."
                button={
                    <ActionButton
                        variant="tertiary"
                        leftIcon={<MdModeEditOutline />}
                    >
                        Edit
                    </ActionButton>
                }
            >
                <Skeleton h="200px" />
            </BaseCard>
        );
    }

    if (transactions.length === 0) {
        return (
            <BaseCard>
                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        {"You haven't added any transactions yet."}
                    </Text>
                    <Text>
                        Once you've added a transaction to an account, you'll
                        see your transactions here.
                    </Text>
                </Box>
                <NavButton to="/accounts" text="Go to accounts" />
            </BaseCard>
        );
    }

    // Convert the transaction data into human-readable values for the table.
    const tableValues = transactions
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

    return (
        <TableCard
            title="Transaction History"
            subtitle="Your ten latest transactions."
            values={tableValues}
            rowLimit={10}
            button={
                <ActionButton
                    leftIcon={<MdModeEditOutline />}
                    h={10}
                    p={0}
                    bg="none"
                    color="gray.200"
                    _active={{
                        bg: "none",
                        color: "gray.400",
                    }}
                >
                    Edit
                </ActionButton>
            }
        />
    );
}
