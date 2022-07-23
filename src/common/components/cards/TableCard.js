import BaseCard from "./BaseCard";
import Table from "../visuals/Table";

// TODO: Add documentation.
export default function TableCard({ tableProps, children, ...props }) {
    // TODO: Paginate the table.
    return (
        <BaseCard px={0} py={4} spacing={0} {...props}>
            <Table offset={6} {...tableProps} />
            {children}
        </BaseCard>
    );
}
