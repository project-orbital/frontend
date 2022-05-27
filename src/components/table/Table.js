import {Table as ChakraTable, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";

/**
 * Dynamic table component.
 *
 * Props:
 * - headers: An array of strings which form the headers of each column.
 * - rows: The number of rows to limit the table to.
 * - body: A 2D array of strings, where elements in the outer array form a row,
 *         and elements in the nested arrays form cells of their respective row.
 */
export default function Table(props) {
    return <TableContainer w="100%">
        <ChakraTable size="sm" variant="striped" placement="top">
            <Thead>
                <Tr>
                    {props.headers.map(header => <Th>{header}</Th>)}
                </Tr>
            </Thead>
            <Tbody>
                {props.body && props.body
                    .slice(0, props.rows)
                    .map(row => <Tr>{row.map(cell => <Td>{cell}</Td>)}</Tr>)}
            </Tbody>
        </ChakraTable>
    </TableContainer>
}
