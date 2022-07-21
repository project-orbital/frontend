import { Box, GridItem } from "@chakra-ui/react";
import Content from "./components/Content";
import { Outlet } from "react-router-dom";

export default function Learn() {
    return (
        <>
            <GridItem>
                <Box
                    fontWeight="semibold"
                    bg="gray.300"
                    w="100%"
                    p={5}
                    color="black"
                    rounded="xl"
                    mb={8}
                >
                    Here are some materials on financial literacy our team has
                    carefully selected! You can also share your knowledge by
                    publishing your very own articles under the Community
                    Contributed tab!
                </Box>
                <Content />
            </GridItem>
            <Outlet />
        </>
    );
}
