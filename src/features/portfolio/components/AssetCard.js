import BaseCard from "../../../common/components/cards/BaseCard";
import NavButton from "../../../common/components/buttons/NavButton";
import { Show, SimpleGrid, Stack, VStack } from "@chakra-ui/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import Stat from "../../../common/components/Stat";
import currency from "currency.js";

export default function AssetCard({ asset, orders }) {
    const stats = orders.reduce(
        (acc, order) => ({
            amount: acc.amount.add(order.amount),
            cost: acc.cost.add(order.amount.multiply(order.price)),
            value: acc.value.add(asset.price.multiply(order.amount)),
            buys: order.amount.intValue > 0 ? acc.buys + 1 : acc.buys,
            sells: order.amount.intValue < 0 ? acc.sells + 1 : acc.sells,
            last: `${order.amount.value} ${asset.symbol} @ ${order.price.format(
                { symbol: "SGD " }
            )}`,
        }),
        {
            amount: currency(0, { precision: 4 }),
            cost: currency(0),
            value: currency(0),
            buys: 0,
            sells: 0,
            last: "-",
        }
    );

    const Controls = () => (
        <Stack
            direction={["column", null, null, "row"]}
            align="end"
            spacing={1}
        >
            <NavButton
                to={`./assets/${asset.id}/update`}
                variant="tertiary"
                leftIcon={<MdOutlineEdit size="18px" />}
            >
                <Show above="lg">Edit</Show>
            </NavButton>
            <NavButton
                to={`./assets/${asset.id}/delete`}
                variant="tertiary"
                leftIcon={<MdOutlineDelete size="20px" />}
            >
                <Show above="lg">Delete</Show>
            </NavButton>
        </Stack>
    );

    return (
        <BaseCard
            title={asset.name}
            subtitle={asset.symbol}
            button={<Controls />}
        >
            <Stat
                variant="primary"
                value={stats.value.format({ symbol: "SGD " })}
                label={`${stats.amount.intValue === 0 ? "=" : "≈"} ${
                    stats.amount.value
                } ${asset.symbol}`}
            />
            <SimpleGrid spacing={8} columns={[2, null, null, 3]}>
                <Stat
                    label="Market Price"
                    value={asset.price.format({ symbol: "SGD " })}
                />
                <Stat
                    label="Average Buy Price"
                    value={
                        stats.amount.intValue === 0
                            ? "-"
                            : stats.value
                                  .divide(stats.amount)
                                  .format({ symbol: "SGD " })
                    }
                />
                <Stat
                    label="Unrealized Profit / Loss"
                    value={stats.value
                        .subtract(stats.cost)
                        .format({ symbol: "SGD " })}
                />
                <Stat
                    label="Annual Yield"
                    value={`${asset.yield.value}% p.a.`}
                />
                <Stat label="Last Order" value={stats.last} />
                <Stat
                    label="Buy / Sell Orders"
                    value={`${stats.buys} / ${stats.sells}`}
                />
            </SimpleGrid>
            <VStack align="start" spacing={4} pt={2}>
                <NavButton
                    to={`./assets/${asset.id}/orders/create/buy`}
                    variant="primary"
                    bgGradient="linear(to-br, blue.400, blue.600)"
                    icon={<AiOutlinePlus />}
                >
                    Record a buy order
                </NavButton>
                <NavButton
                    to={`./assets/${asset.id}/orders/create/sell`}
                    variant="primary"
                    bgGradient="linear(to-br, red.400, red.600)"
                    icon={<AiOutlineMinus />}
                >
                    Record a sell order
                </NavButton>
            </VStack>
        </BaseCard>
    );
}
