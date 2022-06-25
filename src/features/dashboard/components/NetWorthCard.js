import BarChart from "../../../common/components/visuals/BarChart";
import Card from "../../../common/components/Card";
import { AspectRatio, Text, VStack } from "@chakra-ui/react";
import { format, formatDistanceToNowStrict } from "date-fns";
import { useSelector } from "react-redux";
import { selectNetWorth } from "../../transactions/state/transactions";

export default function NetWorthCard({ data }) {
    const { netWorth, asOf } = useSelector(selectNetWorth);

    return (
        <Card
            heading="Net Worth"
            subheading="The bar chart will be patched in an update real soon."
        >
            <Card isNested>
                <VStack spacing={0}>
                    <Text
                        fontWeight="bold"
                        fontSize="2xl"
                    >{`SGD ${netWorth.toFixed(2)}`}</Text>
                    <Text fontSize="sm">{`as of ${formatDistanceToNowStrict(
                        asOf,
                        { addSuffix: true }
                    )}, on ${format(asOf, "dd LLLL yyyy")}`}</Text>
                </VStack>
            </Card>
            <Card isNested>
                <AspectRatio ratio={21 / 9}>
                    <BarChart data={data} />
                </AspectRatio>
            </Card>
        </Card>
    );
}
