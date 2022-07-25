import PieChart from "../../../common/components/visuals/PieChart";
import BaseCard from "../../../common/components/cards/BaseCard";
import { useReadAssetsQuery, useReadOrdersQuery } from "../../../app/api";
import NavButton from "../../../common/components/buttons/NavButton";
import currency from "currency.js";
import { AspectRatio } from "@chakra-ui/react";

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

    if (orders.length === 0) {
        return (
            <BaseCard
                title="Asset Allocation"
                heading={`You've added ${assets.length} ${
                    assets.length === 1 ? "asset" : "assets"
                }, but you haven't recorded any orders for them yet.`}
                subheading="Once you've recorded your buy or sell orders in your portfolio, we'll show your asset allocation here."
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
            justify="center"
        >
            <AspectRatio ratio={16 / 9} pb={8}>
                <PieChart data={data} />
            </AspectRatio>
        </BaseCard>
    );
}
