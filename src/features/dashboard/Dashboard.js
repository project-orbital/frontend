import { GridItem, SimpleGrid } from "@chakra-ui/react";

import * as rand from "../../common/utils/rand";
import TransactionsCard from "./components/TransactionsCard";
import NetWorthCard from "./components/NetWorthCard";
import AssetAllocationCard from "./components/AssetAllocationCard";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import PageTemplate from "../../common/components/PageTemplate";

const assets = ["Cash", "Bonds", "Stocks", "Crypto"];
const assetsRaw = rand.randIntArray(assets.length, 0, 100);
const assetsTotal = assetsRaw.reduce((a, b) => a + b);
const assetsData = assets.map((asset, i) => ({
    key: asset,
    value: Math.floor((100000 * assetsRaw[i]) / assetsTotal),
}));

export default function Dashboard() {
    return (
        <PageTemplate page="dashboard">
            <Breadcrumbs
                path="Home/Dashboard"
                links={["/dashboard", "/dashboard"]}
            />
            <SimpleGrid spacing={8} minChildWidth="600px">
                <NetWorthCard />
                <AssetAllocationCard data={assetsData} />
                <GridItem colSpan={2}>
                    <TransactionsCard />
                </GridItem>
            </SimpleGrid>
        </PageTemplate>
    );
}
