import Sidebar from "../components/sidebar/Sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Grid,
    GridItem,
    Heading,
    HStack,
    StatArrow,
    VStack
} from "@chakra-ui/react";

import Card from "../components/dashboard/Card";
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart"

import * as rand from "../utils/rand";
import Table from "../components/table/Table";
import {faker} from "@faker-js/faker";

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
const assetsData = assets.map((asset, i) => ({key: asset, value: Math.floor(netWorthValue * assetsRaw[i] / assetsTotal)}));

function generateRandomTransaction() {
    return [
        faker.date.recent().toLocaleDateString(),
        `Account ${rand.randInt(1, 4)}`,
        faker.finance.transactionDescription().split(" using card")[0],
        faker.finance.amount(),
        faker.finance.amount(1000, netWorthValue)
    ]
}

// === === ===
// Components.
const breadcrumbs = <Breadcrumb spacing='8px' separator="/">
    <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
        <BreadcrumbLink href='#'>Dashboard</BreadcrumbLink>
    </BreadcrumbItem>
</Breadcrumb>

const heading = <Heading as="h1">Dashboard</Heading>

const netWorth = <Card
    label="Net Worth"
    value={`${netWorthValue} SGD`}
    change={`${netWorthChange}%`}
    symbol={<StatArrow type={netWorthChange >= 0 ? "increase" : "decrease"}/>}
    body={<BarChart data={netWorthData}/>}
/>

const assetAllocation = <Card
    label="Asset Allocation"
    body={<PieChart data={assetsData}/>}
/>

const transactions = <Card
    label="Recent Transactions"
    value="5"
    body={<Table
        headers={["Date", "Account", "Transaction", "Amount", "Balance"]}
        rows={5}
        body={[
            generateRandomTransaction(),
            generateRandomTransaction(),
            generateRandomTransaction(),
            generateRandomTransaction(),
            generateRandomTransaction()
        ]}
    />}
/>

export default function Dashboard() {
    return <HStack minH="100vh" minW="100vw" spacing="0" display="inline-flex" align="stretch" bg="gray.200">
        <Sidebar/>
        <VStack p="40px" w="100%" align="stretch">
            {breadcrumbs}
            {heading}
            <Grid h="100%" pt="40px" gap="25px" templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)">
                <GridItem>{netWorth}</GridItem>
                <GridItem>{assetAllocation}</GridItem>
                <GridItem colSpan={2}>{transactions}</GridItem>
            </Grid>
        </VStack>
    </HStack>
}
