import BaseCard from "./BaseCard";
import Table from "../visuals/Table";

export default function TableCard({ values, rowLimit, ...props }) {
    return (
        <BaseCard {...props} px={0} py={4} spacing={0}>
            <Table values={values} rowLimit={rowLimit} />
        </BaseCard>
    );
}
