import {
    useReadAssetsQuery,
    useReadLiabilitiesQuery,
    useReadOrdersQuery,
    useReadPaymentsQuery,
} from "../../app/api";
import { Outlet } from "react-router-dom";
import AssetCard from "./components/AssetCard";
import LiabilityCard from "./components/LiabilityCard";
import BaseCard from "../../common/components/cards/BaseCard";
import NavButton from "../../common/components/buttons/NavButton";
import { Text, VStack } from "@chakra-ui/react";

export default function Portfolio() {
    const {
        data: assets,
        isLoading: isAssetsLoading,
        isError: isAssetsError,
    } = useReadAssetsQuery();
    const {
        data: liabilities,
        isLoading: isLiabilitiesLoading,
        isError: isLiabilitiesError,
    } = useReadLiabilitiesQuery();
    const {
        data: orders,
        isLoading: isOrdersLoading,
        isError: isOrdersError,
    } = useReadOrdersQuery();
    const {
        data: payments,
        isLoading: isPaymentsLoading,
        isError: isPaymentsError,
    } = useReadPaymentsQuery();

    if (
        isAssetsLoading ||
        isLiabilitiesLoading ||
        isOrdersLoading ||
        isPaymentsLoading
    ) {
        return null;
    }

    if (
        isAssetsError ||
        isLiabilitiesError ||
        isOrdersError ||
        isPaymentsError
    ) {
        return null;
    }

    if (assets.length === 0 && liabilities.length === 0) {
        return (
            <>
                <BaseCard>
                    <VStack align="start" w="100%" spacing={0}>
                        <Text fontSize="xl" fontWeight="bold" w="100%">
                            You haven't added any assets or liabilities yet.
                        </Text>
                        <Text w="100%">
                            Once you've added an asset or liability, you'll see
                            it here.
                        </Text>
                    </VStack>
                    <VStack align="start" spacing={4}>
                        <NavButton to="./assets/create" variant="primary">
                            Add an asset
                        </NavButton>
                        <NavButton to="./liabilities/create" variant="primary">
                            Add a liability
                        </NavButton>
                    </VStack>
                </BaseCard>
                <Outlet />
            </>
        );
    }

    const CreateCard = () => (
        <BaseCard>
            <VStack align="start" w="100%" spacing={0}>
                <Text fontSize="xl" fontWeight="bold" w="100%">
                    You can add more assets or liabilities here.
                </Text>
                <Text w="100%">
                    Once you've added an asset or liability, you'll see it here.
                </Text>
            </VStack>
            <VStack align="start" spacing={4}>
                <NavButton to="./assets/create" variant="primary">
                    Add an asset
                </NavButton>
                <NavButton to="./liabilities/create" variant="primary">
                    Add a liability
                </NavButton>
            </VStack>
        </BaseCard>
    );

    return (
        <>
            {assets.map((asset) => (
                <AssetCard
                    key={asset.id}
                    asset={asset}
                    orders={orders.filter(
                        (order) => order.assetId === asset.id
                    )}
                />
            ))}
            {liabilities.map((liability) => (
                <LiabilityCard
                    key={liability.id}
                    liability={liability}
                    payments={payments.filter(
                        (payment) => payment.liabilityId === liability.id
                    )}
                />
            ))}
            <CreateCard />
            <Outlet
                context={{
                    assets: assets,
                    liabilities: liabilities,
                    orders: orders,
                    payments: payments,
                    isLoading:
                        isAssetsLoading ||
                        isLiabilitiesLoading ||
                        isOrdersLoading ||
                        isPaymentsLoading,
                    isError:
                        isAssetsError ||
                        isLiabilitiesError ||
                        isOrdersError ||
                        isPaymentsError,
                }}
            />
        </>
    );
}
