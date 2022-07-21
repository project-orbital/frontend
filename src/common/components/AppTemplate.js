import Sidebar from "./sidebar/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import {
    Container,
    Heading,
    HStack,
    IconButton,
    Show,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Breadcrumbs from "./Breadcrumbs";
import { useEffect, useState } from "react";
import ky from "ky";

const RequireAuth = ({ children }) => {
    const [isAuth, setIsAuth] = useState(undefined);

    useEffect(() => {
        ky.get(`${process.env.REACT_APP_BACKEND}/users/authenticate`, {
            credentials: "include",
        })
            .then(() => {
                setIsAuth(true);
            })
            .catch(() => {
                setIsAuth(false);
            });
    }, []);
    if (isAuth === undefined) return null;
    return isAuth ? <>{children}</> : <Navigate to="/sign-in" />;
};

// Show the button to open the sidebar drawer if there isn't enough
// width to fit the sidebar on the page itself on smaller windows.
const SidebarButton = ({ onOpen }) => (
    <Show below="lg">
        <IconButton
            aria-label={"Open app sidebar"}
            onClick={onOpen}
            icon={<HamburgerIcon size="40px" />}
            // bgGradient="linear(to-br, accent, accent-dark)"
            bg="none"
        />
    </Show>
);

const MobileHeader = ({ page, onOpen }) => (
    <HStack align="center" spacing={4}>
        <SidebarButton onOpen={onOpen} />
        <Heading size={["lg", "xl", null, "2xl"]} textTransform="capitalize">
            {page}
        </Heading>
    </HStack>
);

const DesktopHeader = ({ page }) => (
    <VStack align="start">
        <Breadcrumbs path="Home/Learn" links={["/dashboard", "/learn"]} />
        <Heading size={["lg", "xl", null, "2xl"]} textTransform="capitalize">
            {page}
        </Heading>
    </VStack>
);

export default function AppTemplate({ page }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Sidebar selected={page} isOpen={isOpen} onClose={onClose} />
            <VStack
                pos="absolute"
                left={[0, 0, 0, "160px"]}
                w="stretch"
                h="100vh"
                p={[4, 6, 8, 10]}
                align="start"
                spacing={8}
                border="1px solid red"
            >
                <Show above="lg">
                    <DesktopHeader page={page} />
                </Show>
                <Show below="lg">
                    <MobileHeader page={page} onOpen={onOpen} />
                </Show>
                <RequireAuth>
                    <Container w="100vw" h="100%" p={0} border="1px solid blue">
                        <Outlet />
                    </Container>
                </RequireAuth>
            </VStack>
        </>
    );
}
