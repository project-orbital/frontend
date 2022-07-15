import PieChart from "../../../common/components/visuals/PieChart";
import { AspectRatio, Box } from "@chakra-ui/react";
import BaseCard from "../../../common/components/cards/BaseCard";

export default function AssetAllocationCard({ data }) {
    return (
        <BaseCard
            title="Asset Allocation"
            subtitle="For more information, check out your portfolio."
        >
            <Box w="100%">
                <AspectRatio ratio={16 / 9}>
                    <PieChart data={data} />
                </AspectRatio>
            </Box>
        </BaseCard>
    );
}
