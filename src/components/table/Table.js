import {Table as ChakraTable, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";

/**
 * Wrapper component for creating `ChakraTable`s from data.
 *
 * The table is populated from an array of objects, each object forming a row,
 * with its keys contributing to the table headers and its values as cells.
 *
 * e.g. [{a: 1, b: 2}, {b: 3, c: 4}] creates a table with 2 rows and 3 columns:
 * | a    | b    | c    |
 * | 1    | 2    | null |
 * | null | 3    | 4    |
 *
 * @param values the array of objects
 * @param rowLimit an optional maximum number of table rows to create
 * @return a new, populated table component
 */
export default function Table({values, rowLimit}) {
    // Get and de-duplicate all the keys to use them as headers.
    const headers = [...new Set(values.map(obj => obj.keys))];

    // Converts an object to an array of its values with respect to the headers.
    // If the object does not have a header element as one of its keys, that cell will be null.
    const objToRow = obj => headers.map(header => obj.get(header, null));

    return <TableContainer w="100%">
        <ChakraTable size="sm" variant="striped" placement="top">
            {createTableHeaders(headers)}
            {createTableBody(values.map(objToRow), rowLimit)}
        </ChakraTable>
    </TableContainer>
}

/**
 * Creates a table header row from an array.
 *
 * @param headers an array of strings to create headers from
 * @return the `<Thead>` table header JSX element
 */
function createTableHeaders(headers) {
    return <Thead>
        <Tr>
            {headers.map((header, x) => <Th key={x}>{header}</Th>)}
        </Tr>
    </Thead>
}

/**
 * Creates a table body from a 2D array.
 *
 * @param body a 2D array to populate the table in row-major order
 * @param rowLimit an optional maximum number of table rows to create
 * @return the `<Tbody>` table body JSX element
 */
function createTableBody(body, rowLimit) {
    if (!body || rowLimit <= 0) {
        return <Tbody></Tbody>
    }
    const rowToJSX = (row, y) => <Tr key={y}>{row.map((cell, x) => <Td key={x}>{cell}</Td>)}</Tr>
    return <Tbody>
        {body.slice(0, rowLimit || body.length).map(rowToJSX)}
    </Tbody>
}
