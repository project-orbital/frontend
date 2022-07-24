import PieChart from "../../../common/components/visuals/PieChart";
import { Center } from "@chakra-ui/react";
import BaseCard from "../../../common/components/cards/BaseCard";
import { useReadAssetsQuery, useReadOrdersQuery } from "../../../app/api";
import NavButton from "../../../common/components/buttons/NavButton";
import currency from "currency.js";

export default function AssetAllocationCard() {
    const {
        data: assets,
        isLoading: isAssetsLoading,
        isError: isAssetsError,
    } = useReadAssetsQuery();
    const {
        data: orders,
        isLoading: isOrdersLoading,
        isError: isOrdersError,
    } = useReadOrdersQuery();

    if (isAssetsLoading || isOrdersLoading) {
        return null;
    }

    if (isAssetsError || isOrdersError) {
        return null;
    }

    if (assets.length === 0) {
        return (
            <BaseCard
                title="Asset Allocation"
                heading="You haven't recorded any assets yet."
                subheading="Once you've recorded an asset in your portfolio, we'll show a pie chart of
                your asset allocation here."
            >
                <NavButton
                    to="/portfolio"
                    variant="primary"
                    text="Go to portfolio"
                    withArrow
                />
            </BaseCard>
        );
    }

    const categories = {};
    for (const asset of assets) {
        // Plenty of room for optimization here.
        const value = orders
            .filter((order) => order.assetId === asset.id)
            .reduce(
                (acc, order) => acc.add(order.price.multiply(order.amount)),
                currency(0, { precision: 4 })
            );
        if (categories[asset.category] === undefined) {
            categories[asset.category] = value;
        } else {
            categories[asset.category] = categories[asset.category].add(value);
        }
    }
    const data = [];
    for (const category in categories) {
        data.push({
            key: category,
            value: parseFloat(categories[category]),
        });
    }

    return (
        <BaseCard
            title="Asset Allocation"
            subtitle="For more information, check out your portfolio."
        >
            <Center h="100%" minH="400px" alignSelf="center">
                <PieChart data={data} />
            </Center>
        </BaseCard>
    );
}
