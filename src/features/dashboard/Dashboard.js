import { GridItem } from "@chakra-ui/react";
import TransactionsCard from "./components/TransactionsCard";
import NetWorthCard from "./components/NetWorthCard";
import AssetAllocationCard from "./components/AssetAllocationCard";
import * as rand from "../../common/utils/rand";
import { useReadAccountsQuery } from "../../app/api";
import BaseCard from "../../common/components/cards/BaseCard";
import NavButton from "../../common/components/buttons/NavButton";

const assets = ["Cash", "Bonds", "Stocks", "Crypto"];
const assetsRaw = rand.randIntArray(assets.length, 0, 100);
const assetsTotal = assetsRaw.reduce((a, b) => a + b);
const assetsData = assets.map((asset, i) => ({
    key: asset,
    value: Math.floor((100000 * assetsRaw[i]) / assetsTotal),
}));

export default function Dashboard() {
    const { data: accounts, isLoading, isError } = useReadAccountsQuery();

    if (isError) {
        return;
    }

    if (!isLoading && accounts.length === 0) {
        return (
            <BaseCard
                heading="You haven't created an account yet."
                subheading="Once you've created an account, you'll see your
                        transactions and net worth here."
            >
                <NavButton
                    to="/accounts/create"
                    text="Create an account"
                    withArrow
                />
            </BaseCard>
        );
    }

    return (
        <>
            <NetWorthCard />
            <AssetAllocationCard data={assetsData} />
            <GridItem colSpan={[1, null, 2]}>
                <TransactionsCard />
            </GridItem>
        </>
    );
}
