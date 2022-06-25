import PieChart from "../../../common/components/visuals/PieChart";
import Card from "../../../common/components/Card";
import { AspectRatio, Badge } from "@chakra-ui/react";

export default function AssetAllocationCard({ data }) {
    return (
        <Card
            badge={<Badge colorScheme="blue">Preview</Badge>}
            heading="Asset Allocation"
            subheading="This is a preview of what's coming in milestone 3 when the Portfolio is implemented."
        >
            <Card isNested>
                <AspectRatio ratio={16 / 9}>
                    <PieChart data={data} />
                </AspectRatio>
            </Card>
        </Card>
    );
}
