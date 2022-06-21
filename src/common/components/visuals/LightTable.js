import { Stack, Text, VStack } from "@chakra-ui/react";

/**
 * A lightly formatted table with at most two rows.
 *
 * The headers of the table control how many columns are displayed.
 * Elements of the first and second rows populate the columns, unless
 * they are null, in which case nothing is displayed in that cell.
 *
 * If the `isVertical` prop is passed, each column in the original table
 * is stacked vertically, such that the table is a single column.
 *
 * @param isVertical `true` if the table should be displayed vertically, `false` otherwise
 * @param headers an array of strings to create headers from
 * @param primary an array of strings to populate the first row
 * @param secondRow an optional array of strings to populate the second row
 * @return the `<TableContainer>` table container JSX element
 */
export default function LightTable({
    isVertical,
    headers,
    primary,
    secondary,
}) {
    return (
        <Stack
            px="2px"
            align="start"
            direction={isVertical ? "column" : "row"}
            spacing={isVertical ? "20px" : "50px"}
        >
            {headers.map((header, index) => (
                <VStack key={index} maxW="40%" align="start" spacing="2px">
                    <Text fontWeight="bold" fontSize="xs" casing="uppercase">
                        {header}
                    </Text>
                    <Text w="100%" fontSize="sm">
                        {primary[index]}
                    </Text>
                    {secondary && (
                        <Text w="100%" fontSize="xs" fontWeight="medium">
                            {secondary[index]}
                        </Text>
                    )}
                </VStack>
            ))}
        </Stack>
    );
}
