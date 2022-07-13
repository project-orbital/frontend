import BarChart from "../../../common/components/visuals/BarChart";
import Card from "../../../common/components/Card";
import { AspectRatio, Badge, Text, VStack } from "@chakra-ui/react";
import { format, formatDistanceToNowStrict } from "date-fns";
import { useSelector } from "react-redux";
import { selectNetWorth } from "../../accounts/transactions/state/transactions";

export default function NetWorthCard({ data }) {
    const netWorth = useSelector(selectNetWorth);
    const value = netWorth?.netWorth || 0;
    const duration = netWorth
        ? formatDistanceToNowStrict(netWorth.asOf, { addSuffix: true })
        : "";
    const date = netWorth ? format(netWorth.asOf, "dd LLLL yyyy") : "";

    return (
        <Card
            badge={<Badge colorScheme="blue">Preview</Badge>}
            heading="Net Worth"
            subheading="The bar chart will be patched in an update real soon."
        >
            <Card isNested>
                <VStack spacing={0}>
                    <Text
                        fontWeight="bold"
                        fontSize="2xl"
                    >{`SGD ${value.toFixed(2)}`}</Text>
                    {netWorth && (
                        <Text fontSize="sm">{`as of ${duration}, on ${date}`}</Text>
                    )}
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
