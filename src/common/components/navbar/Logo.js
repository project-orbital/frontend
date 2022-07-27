import { BsCurrencyExchange } from "react-icons/bs";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Logo({ direction, color, size, link, hasBorder }) {
    return (
        <Stack
            as={Link}
            to={link || "/"}
            direction={direction || ["column", "row"]}
            align="center"
            pl={[2, null, null, 4]}
        >
            <Box color={color || "fg"} w={[5, 6, 7, 8]}>
                <BsCurrencyExchange size="100%" />
            </Box>
            <Heading
                color={color || "fg"}
                size={size || ["md", null, null, null, "lg"]}
                fontWeight="bold"
                pb={hasBorder && "15px"}
                borderBottom={hasBorder && "1.5px solid white"}
            >
                DollarPlanner
            </Heading>
        </Stack>
    );
}
