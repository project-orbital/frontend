import Sidebar from "../components/sidebar/Sidebar";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid, GridItem, Heading, HStack, VStack} from "@chakra-ui/react";

import * as rand from "../utils/rand";
import TransactionsCard from "../components/dashboard/TransactionsCard";
import NetWorthCard from "../components/dashboard/NetWorthCard";
import AssetAllocationCard from "../components/dashboard/AssetAllocationCard";

// === === ===
// Artificial data.
const rng = rand.randIntGenerator(20000, 70000);
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const netWorthData = months.map(month => ({key: month, value: rng()}));
const netWorthValue = netWorthData[11].value;
const netWorthChange = ((netWorthValue - netWorthData[10].value) / netWorthData[10].value * 100).toFixed(2)

const assets = ["Cash", "Bonds", "Stocks", "Crypto"]
const assetsRaw = rand.randIntArray(assets.length, 0, 100);
const assetsTotal = assetsRaw.reduce((a, b) => a + b);
const assetsData = assets.map((asset, i) => ({
    key: asset, value: Math.floor(netWorthValue * assetsRaw[i] / assetsTotal)
}));

const Breadcrumbs = () => <>
    <Breadcrumb spacing='8px' separator="/">
        <BreadcrumbItem>
            <BreadcrumbLink href='#'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
            <BreadcrumbLink href='#'>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
    </Breadcrumb>
</>

export default function Dashboard() {
    return <HStack minH="100vh" minW="100vw" spacing="0" display="inline-flex" align="stretch" bg="gray.200">
        <Sidebar/>
        <VStack p="40px" w="100%" align="stretch">
            <Breadcrumbs/>
            <Heading as="h1">Dashboard</Heading>
            <Grid h="100%" pt="40px" gap="25px">
                <GridItem>
                    <NetWorthCard value={netWorthValue} change={netWorthChange} data={netWorthData}/>
                </GridItem>
                <GridItem>
                    <AssetAllocationCard data={assetsData}/>
                </GridItem>
                <GridItem colSpan={2}>
                    <TransactionsCard/>
                </GridItem>
            </Grid>
        </VStack>
    </HStack>
}
