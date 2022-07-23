import { GridItem } from "@chakra-ui/react";
import Content from "./components/Content";
import { Outlet } from "react-router-dom";

export default function Learn() {
    return (
        <>
            <GridItem colSpan={[1, null, 2]}>
                <Content />
                <Outlet />
            </GridItem>
        </>
    );
}
