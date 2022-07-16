import {
    Table as ChakraTable,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";

/**
 * `Table` composes Chakra UI's `Table` and its associated components
 * to facilitate table creation from an array of objects.
 *
 * Each element of this array of objects, passed to the `values` prop,
 * will be rendered as a row in the table.
 *
 * If headers are not passed in the `headers` prop, the keys of the
 * elements of the array of objects will be aggregated and used as the headers.
 *
 * In each row, if the object has a key that matches a header, the value of
 * that key will be rendered in that column, otherwise the cell will be empty.
 *
 * e.g. [{a: 1, b: 2}, {b: 3, c: 4}] creates a table with 2 rows and 3 columns:
 * | a    | b    | c    |
 * | 1    | 2    | null |
 * | null | 3    | 4    |
 *
 * @param values the array of objects to render as rows in the table
 * @param headers (optional) an array of strings to render as headers for the table
 * @param isNumeric (optional) an array of boolean values to determine if the
 * @param rowLimit (optional) an optional maximum number of table rows to render
 * corresponding column should be right-aligned
 */
export default function Table({
    values,
    headers: headerKeys,
    isNumeric = [],
    offset = 4,
    rowLimit,
}) {
    // If the headers are unspecified, we extract all possible keys in the data
    // to use as headers.
    const headers = headerKeys ?? [
        ...new Set(values.flatMap((obj) => Object.keys(obj))),
    ];
    const TableHeaders = () => (
        <Thead>
            <Tr height={12}>
                {headers.map((header, x) => (
                    <Th
                        key={x}
                        // Pad the first and last columns as specified.
                        pl={x === 0 ? offset : 2}
                        pr={x === headers.length - 1 ? offset : 2}
                        isNumeric={isNumeric[x]}
                        fontFamily="body"
                    >
                        {header}
                    </Th>
                ))}
            </Tr>
        </Thead>
    );

    // Convert the values into a 2D array based on the headers.
    // If the object does not have a header element as one of its keys, that cell will be null.
    const body = values.map((obj) =>
        headers.map((header) => obj[header] || null)
    );
    const TableBody = () => {
        if (!body || rowLimit <= 0) {
            return <Tbody></Tbody>;
        }
        const rowToJSX = (row, y) => (
            <Tr key={y} height={12}>
                {row.map((cell, x) => (
                    <Td
                        key={x}
                        isNumeric={isNumeric[x]}
                        // Pad the first and last columns as specified.
                        pl={x === 0 ? offset : 2}
                        pr={x === headers.length - 1 ? offset : 2}
                        bg={y % 2 === 0 ? "whiteAlpha.500" : "none"}
                    >
                        {
                            <Text
                                style={
                                    cell.length < 20
                                        ? null
                                        : {
                                              whiteSpace: "normal",
                                              wordWrap: "break-word",
                                          }
                                }
                            >
                                {cell}
                            </Text>
                        }
                    </Td>
                ))}
            </Tr>
        );
        return (
            <Tbody>
                {body.slice(0, rowLimit || body.length).map(rowToJSX)}
            </Tbody>
        );
    };

    return (
        <TableContainer w="100%">
            <ChakraTable size="sm" placement="top">
                <TableHeaders />
                <TableBody />
            </ChakraTable>
        </TableContainer>
    );
}
