import { Badge, Show, SimpleGrid, Stack, VStack } from "@chakra-ui/react";
import NavButton from "../../../common/components/buttons/NavButton";
import {
    MdOutlineDelete,
    MdOutlineEdit,
    MdOutlinePayments,
} from "react-icons/md";
import BaseCard from "../../../common/components/cards/BaseCard";
import Stat from "../../../common/components/Stat";
import currency from "currency.js";
import { formatDistanceToNow } from "date-fns";

export default function LiabilityCard({ liability, payments }) {
    const stats = payments.reduce(
        (acc, payment) => ({
            paid: acc.paid.add(payment.amount),
            remaining: acc.remaining.subtract(payment.amount),
            last: `${payment.amount.format({ symbol: "SGD " })}`,
            asOf: formatDistanceToNow(payment.date, { addSuffix: true }),
        }),
        {
            paid: currency(0),
            remaining: liability.amount,
            last: "-",
            asOf: "-",
        }
    );

    const Controls = () => (
        <Stack
            direction={["column", null, null, "row"]}
            align="end"
            spacing={1}
        >
            <NavButton
                to={`./liabilities/${liability.id}/update`}
                variant="tertiary"
                leftIcon={<MdOutlineEdit size="18px" />}
            >
                <Show above="lg">Edit</Show>
            </NavButton>
            <NavButton
                to={`./liabilities/${liability.id}/delete`}
                variant="tertiary"
                leftIcon={<MdOutlineDelete size="20px" />}
            >
                <Show above="lg">Delete</Show>
            </NavButton>
        </Stack>
    );

    return (
        <BaseCard
            badge={<Badge colorScheme="red">Liability</Badge>}
            title={liability.name}
            subtitle={liability.description}
            button={<Controls />}
        >
            <Stat
                variant="primary"
                value={stats.remaining.multiply(-1).format({ symbol: "SGD " })}
            />
            <SimpleGrid spacing={8} columns={[2, null, null, 3]}>
                <Stat
                    label="Total Amount Due"
                    value={liability.amount.format({ symbol: "SGD " })}
                />
                <Stat
                    label="Percentage Repaid"
                    value={`${
                        stats.paid.divide(liability.amount).multiply(100).value
                    }% of total`}
                />
                <Stat
                    label="Annual Interest Rate"
                    value={`${liability.interest}% p.a.`}
                />
                <Stat label="Last Repayment" value={stats.last} />
                <Stat label="Last Repayment Date" value={stats.asOf} />
            </SimpleGrid>
            <VStack align="start" spacing={4} pt={2}>
                <NavButton
                    to={`./liabilities/${liability.id}/payments/create`}
                    variant="primary"
                    bgGradient="linear(to-br, purple.400, purple.600)"
                    icon={<MdOutlinePayments size="20px" />}
                >
                    Add a repayment record
                </NavButton>
            </VStack>
        </BaseCard>
    );
}
