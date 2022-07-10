import PieChart from "../../../common/components/visuals/PieChart";
import Card from "../../../common/components/Card";
import { AspectRatio } from "@chakra-ui/react";

export default function ExpensesCategoryCard({ data }) {
    return (
        <Card heading="Expenses by Category">
            <Card isNested>
                <AspectRatio ratio={16 / 9}>
                    <PieChart data={data} />
                </AspectRatio>
            </Card>
        </Card>
    );
}
