import { GridItem, Text } from "@chakra-ui/react";
import Content from "./components/Content";
import { Outlet } from "react-router-dom";

export default function Learn() {
    return (
        <>
            <GridItem colSpan={[1, null, 2]}>
                <Text
                    fontWeight="semibold"
                    bg="dim"
                    color="fg"
                    p={5}
                    mb={4}
                    rounded="xl"
                >
                    Here are some materials on financial literacy our team has
                    carefully selected! You can also share your knowledge by
                    publishing your very own articles under the Community
                    Contributed tab!
                </Text>
                <Content />
                <Outlet />
            </GridItem>
        </>
    );
}
