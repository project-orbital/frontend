import Sidebar from "./sidebar/Sidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
    Box,
    Heading,
    HStack,
    IconButton,
    Show,
    SimpleGrid,
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

const MobileHeader = ({ title, onOpen }) => (
    <HStack
        pos="fixed"
        w="100vw"
        h={["70px", "85px", "100px"]}
        px={[4, 6, 8]}
        align="center"
        spacing={4}
        zIndex={32}
        bg="bg-translucent"
    >
        <SidebarButton onOpen={onOpen} />
        <Heading size={["lg", "xl", null, "2xl"]} textTransform="capitalize">
            {title}
        </Heading>
    </HStack>
);

const DesktopHeader = ({ path, links, title }) => (
    <VStack align="start">
        <Breadcrumbs path={path} links={links} />
        <Heading size={["lg", "xl", null, "2xl"]} textTransform="capitalize">
            {title}
        </Heading>
    </VStack>
);

export default function AppTemplate({ page, path, links, title }) {
    // ALlow the sidebar to be opened and closed.
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Allow titles to be generated dynamically from within the nested route
    // instead of being defined in the route itself (using the `title` prop).
    const [customTitle, setCustomTitle] = useState(undefined);
    const fullPath = customTitle ? [...path, customTitle] : path;
    const fullLinks = customTitle ? [...links, "./"] : links;

    // Reset the custom title when the page changes.
    const { pathname } = useLocation();
    useEffect(() => {
        setCustomTitle(undefined);
    }, [pathname]);

    return (
        <>
            <Sidebar selected={page} isOpen={isOpen} onClose={onClose} />
            <Show below="lg">
                <MobileHeader title={customTitle ?? title} onOpen={onOpen} />
            </Show>
            <VStack
                pos="absolute"
                left={[0, null, null, "160px"]}
                top={["70px", "85px", "100px", "0px"]}
                w={["100vw", null, null, "calc(100% - 160px)"]}
                minH="100vh"
                pt={[0, null, null, 10]}
                pb={10}
                px={[4, 6, 8, 12]}
                align="start"
                spacing={8}
            >
                <Show above="lg">
                    <DesktopHeader
                        path={fullPath}
                        links={fullLinks}
                        title={customTitle ?? title}
                    />
                </Show>
                <RequireAuth>
                    <Box w="full" p={0}>
                        <SimpleGrid spacing={8} columns={[1, null, 2]}>
                            <Outlet context={[setCustomTitle]} />
                        </SimpleGrid>
                    </Box>
                </RequireAuth>
            </VStack>
        </>
    );
}
