import { Grid, GridItem } from "@chakra-ui/react";

import * as rand from "../../common/utils/rand";
import TransactionsCard from "./components/TransactionsCard";
import NetWorthCard from "./components/NetWorthCard";
import AssetAllocationCard from "./components/AssetAllocationCard";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import PageTemplate from "../../common/components/PageTemplate";

const rng = rand.randIntGenerator(20000, 70000);
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
const netWorthData = months.map((month) => ({ key: month, value: rng() }));
const netWorthValue = netWorthData[11].value;
const netWorthChange = (
    ((netWorthValue - netWorthData[10].value) / netWorthData[10].value) *
    100
).toFixed(2);

const assets = ["Cash", "Bonds", "Stocks", "Crypto"];
const assetsRaw = rand.randIntArray(assets.length, 0, 100);
const assetsTotal = assetsRaw.reduce((a, b) => a + b);
const assetsData = assets.map((asset, i) => ({
    key: asset,
    value: Math.floor((netWorthValue * assetsRaw[i]) / assetsTotal),
}));

export default function Dashboard() {
    return (
        <PageTemplate page="dashboard">
            <Breadcrumbs
                path="Home/Dashboard"
                links={["/dashboard", "/dashboard"]}
            />
            <Grid
                w="100%"
                gap="25px"
                autoColumns="minmax(600px, auto)"
                autoFlow="row"
            >
                <GridItem>
                    <NetWorthCard
                        value={netWorthValue}
                        change={netWorthChange}
                        data={netWorthData}
                    />
                </GridItem>
                <GridItem>
                    <AssetAllocationCard data={assetsData} />
                </GridItem>
                <GridItem colSpan={2}>
                    <TransactionsCard />
                </GridItem>
            </Grid>
        </PageTemplate>
    );
}
