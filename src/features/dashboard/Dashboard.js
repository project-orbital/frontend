import { Box, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import TransactionsCard from "./components/TransactionsCard";
import NetWorthCard from "./components/NetWorthCard";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import PageTemplate from "../../common/components/PageTemplate";
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
            <PageTemplate page="dashboard">
                <Breadcrumbs
                    path="Home/Dashboard"
                    links={["/dashboard", "/dashboard"]}
                />
                <BaseCard>
                    <Box>
                        <Text fontSize="xl" fontWeight="bold">
                            {"You haven't created an account yet."}
                        </Text>
                        <Text>
                            Once you've created an account, you'll see your
                            transactions and net worth here.
                        </Text>
                    </Box>
                    <NavButton
                        to="/accounts/create"
                        text="Create an account"
                        p={8}
                    />
                </BaseCard>
            </PageTemplate>
        );
    }

    return (
        <SimpleGrid spacing={8} w="100%">
            <NetWorthCard />
            <AssetAllocationCard data={assetsData} />
            <GridItem colSpan={2}>
                <TransactionsCard />
            </GridItem>
        </SimpleGrid>
    );
}
