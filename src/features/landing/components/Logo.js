import { BsCurrencyExchange } from "react-icons/bs";
import { Box, Heading, HStack } from "@chakra-ui/react";

export default function Logo() {
    return (
        <HStack>
            <Box color="fg">
                <BsCurrencyExchange size="30px" />
            </Box>
            <Heading color="fg" size="lg" fontWeight="bold">
                DollarPlanner
            </Heading>
        </HStack>
    );
}
