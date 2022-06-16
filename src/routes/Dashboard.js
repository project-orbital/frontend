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
    key: asset,
    value: Math.floor(netWorthValue * assetsRaw[i] / assetsTotal)
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
    return <HStack w='100%' minH='100vh' align='start' spacing='0' overflow='hidden' float='left' bg='gray.200'>
        <Sidebar/>
        {/* Addition of left padding to shift the body content right by 260px, the width of the sidebar. */}
        <VStack w='100%' p='40px' pl='300px' align='stretch' overflow='auto'>
            <Breadcrumbs/>
            <Heading as="h1">Dashboard</Heading>
            <Grid w='100%' pt='40px' gap='25px' autoColumns='minmax(600px, auto)' autoFlow='row'>
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
