import { Box, Text } from "@chakra-ui/react";
import NavButton from "../../../../common/components/buttons/NavButton";
import BaseCard from "../../../../common/components/cards/BaseCard";

export default function ParseCard() {
    return (
        <BaseCard>
            <Box>
                <Text fontSize="xl" fontWeight="bold">
                    {"Don't want to do manual data entry?"}
                </Text>
                <Text>
                    Let our document parser extract your transactions from a
                    bank statement.
                </Text>
            </Box>
            <NavButton to="./upload/disclaimer" text="Parse documents" />
        </BaseCard>
    );
}
