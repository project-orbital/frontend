import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import {
    Box,
    Container,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    Link,
    Show,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Navbar from "../../common/components/navbar/Navbar";
import { useEffect } from "react";

const SidebarContent = () => {
    return (
        <VStack align="start">
            <Link as={RouterLink} to="./">
                Introduction
            </Link>
        </VStack>
    );
};

// Sidebar variant which will be displayed inline with the content.
const SidebarInline = () => (
    <VStack
        pos="fixed"
        w={[0, 0, 0, 250, 300]}
        top={[20, 24]}
        pt={8}
        pl={[0, 0, 0, 16]}
        zIndex={4}
        align="start"
        // border="1px solid red"
    >
        <SidebarContent />
    </VStack>
);

// Sidebar variant which will be tucked away in a drawer.
const SidebarDrawer = ({ isOpen, onClose }) => (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
            <DrawerBody>
                <SidebarContent />
            </DrawerBody>
        </DrawerContent>
    </Drawer>
);

const Sidebar = ({ isOpen, onClose }) => (
    <>
        <Show above="lg">
            <SidebarInline isOpen={isOpen} onClose={onClose} />
        </Show>
        <SidebarDrawer isOpen={isOpen} onClose={onClose} />
    </>
);

// Show the button to open the sidebar drawer if there isn't enough
// width to fit the sidebar on the page itself on smaller windows.
const SidebarButton = ({ onOpen }) => (
    <Show below="lg">
        <IconButton
            aria-label={"Open documentation sidebar"}
            onClick={onOpen}
            icon={<HamburgerIcon />}
            bg="none"
        />
    </Show>
);

export default function DocsTemplate() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { pathname, hash, key } = useLocation();
    // Enable scrolling to anchor links.
    // https://stackoverflow.com/questions/40280369/use-anchors-with-react-router
    useEffect(() => {
        if (hash === "") {
            window.scrollTo(0, 0);
        } else {
            setTimeout(() => {
                const id = hash.replace("#", "");
                const element = document.getElementById(id);
                if (element) {
                    // 10px to position inline with top of the sidebar.
                    window.scrollTo(0, element.offsetTop - 10);
                }
            }, 0);
        }
    }, [pathname, hash, key]); // do this on route change
    return (
        <Box overflowX="hidden" w="100vw">
            <Navbar buttons={[<SidebarButton onOpen={onOpen} />]} />
            <Sidebar isOpen={isOpen} onClose={onClose} />
            <Container
                pos="absolute"
                top={[20, 24, 28]}
                left={[0, 0, 0, 250, 300]}
                px={[4, 10, 20, 0, 0, 0]}
            >
                <Outlet />
            </Container>
        </Box>
    );
}
