import BaseCard from "./BaseCard";
import Table from "../visuals/Table";

export default function TableCard({
    values,
    headers,
    isNumeric,
    rowLimit,
    children,
    ...props
}) {
    return (
        <BaseCard {...props} px={0} py={4} spacing={0}>
            <Table
                values={values}
                headers={headers}
                isNumeric={isNumeric}
                rowLimit={rowLimit}
                offset={6}
            />
            {children}
        </BaseCard>
    );
}
