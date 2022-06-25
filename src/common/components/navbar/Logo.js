import { BsCurrencyExchange } from "react-icons/bs";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Logo({ direction, color, size, link, hasBorder }) {
    return (
        <Stack
            as={Link}
            to={link || "/"}
            direction={direction || "row"}
            align="center"
        >
            <Box color={color || "fg"}>
                <BsCurrencyExchange size="30px" />
            </Box>
            <Heading
                color={color || "fg"}
                size={size || "lg"}
                fontWeight="bold"
                pb={hasBorder && "15px"}
                borderBottom={hasBorder && "1.5px solid white"}
            >
                DollarPlanner
            </Heading>
        </Stack>
    );
}
