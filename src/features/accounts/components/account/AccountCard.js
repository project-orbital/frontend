import NavButton from "../../../../common/components/buttons/NavButton";
import {
    Box,
    Heading,
    Show,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useReadTransactionsInAccountQuery } from "../../../../app/api";
import { newest } from "../../../../common/utils/chrono";
import LightTable from "../../../../common/components/visuals/LightTable";
import { format, formatDistanceToNow } from "date-fns";
import BaseCard from "../../../../common/components/cards/BaseCard";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import currency from "currency.js";

/**
 * The card component which displays a summary of a specified account.
 * Used in `Accounts`.
 *
 * @param account an object with the details of the account to display
 * @param index the reading order index of the account to display in a badge
 */
export default function AccountCard({ account }) {
    const accountId = account._id;
    const {
        data: transactions,
        isLoading,
        isError,
    } = useReadTransactionsInAccountQuery(accountId);

    const accentGradient = useColorModeValue(
        "linear(to-t, accent, fg)",
        "linear(to-t, fg, fg)"
    );

    const EditButton = () => (
        <Stack
            direction={["column", null, null, "row"]}
            align="end"
            spacing={1}
        >
            <NavButton
                to={`../update/${accountId}`}
                variant="tertiary"
                leftIcon={<MdOutlineEdit size="18px" />}
            >
                <Show above="lg">Edit</Show>
            </NavButton>
            <NavButton
                to={`../delete/${accountId}`}
                variant="tertiary"
                leftIcon={<MdOutlineDelete size="20px" />}
            >
                <Show above="lg">Delete</Show>
            </NavButton>
        </Stack>
    );

    if (isError) {
        return;
    }

    if (!isLoading && transactions.length === 0) {
        return (
            <BaseCard
                title={account.name}
                subtitle={account.nickname}
                button={<EditButton />}
                link={`/accounts/${accountId}`}
            >
                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        {
                            "You haven't added any transactions to this account yet."
                        }
                    </Text>
                    <Text>
                        Once you've added a transaction, you'll see it and the
                        account balance here.
                    </Text>
                </Box>
                <NavButton to={`./${accountId}`} text="Go to account" />
            </BaseCard>
        );
    }

    const lastTransaction = isLoading
        ? {
              date: new Date(),
              description: "",
              amount: currency(0),
              balance: currency(0),
          }
        : newest(transactions);
    const { date, description, amount, balance } = lastTransaction;
    const lines = description.split("\n");

    return (
        <BaseCard
            title={account.name}
            subtitle={account.nickname}
            button={<EditButton />}
            link={`/accounts/${accountId}`}
            isLoading={isLoading}
        >
            <Box>
                <Heading bgGradient={accentGradient} bgClip="text">
                    {balance.format({ symbol: "SGD " })}
                </Heading>
                <Text fontSize="sm" color="fg-light">
                    {`as of ${format(date, "dd LLLL yyyy")}`}
                </Text>
            </Box>
            <LightTable
                headers={[
                    "date",
                    "description",
                    amount >= 0 ? "deposit" : "withdrawal",
                    "balance",
                ]}
                primary={[
                    format(date, "dd LLLL yyyy"),
                    lines[0] ?? "None",
                    amount.format({ symbol: "SGD " }),
                    balance.format({ symbol: "SGD " }),
                ]}
                secondary={[
                    formatDistanceToNow(date, {
                        addSuffix: true,
                    }),
                    lines.slice(1).join("\n"),
                    null,
                    null,
                ]}
            />
        </BaseCard>
    );
}
