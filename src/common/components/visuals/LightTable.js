import { HStack, Text, VStack } from "@chakra-ui/react";

/**
 * A lightly formatted table with at most two rows.
 *
 * The headers of the table control how many columns are displayed.
 * Elements of the first and second rows populate the columns, unless
 * they are null, in which case nothing is displayed in that cell.
 *
 * @param headers an array of strings to create headers from
 * @param firstRow an array of strings to populate the first row
 * @param secondRow an array of strings to populate the second row
 * @return the `<TableContainer>` table container JSX element
 */
export default function LightTable({ headers, firstRow, secondRow }) {
    return (
        <HStack px="2px" justify="space-between" align="start">
            {headers.map((header, index) => (
                <VStack maxW="40%" align="start" spacing="2px">
                    <Text fontWeight="bold" fontSize="xs" casing="uppercase">
                        {header}
                    </Text>
                    <Text w="100%" fontSize="sm">
                        {firstRow[index]}
                    </Text>
                    <Text w="100%" fontSize="xs" fontWeight="medium">
                        {secondRow[index]}
                    </Text>
                </VStack>
            ))}
        </HStack>
    );
}
