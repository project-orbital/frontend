import { Outlet } from "react-router-dom";
import PageTemplate from "../../common/components/PageTemplate";
import {
    Box,
    Container,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    IconButton,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import useWindowSize from "../../common/hooks/useWindowSize";

const SidebarContent = () => {
    return (
        <VStack w="max-content">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </VStack>
    );
};

const Sidebar = ({ links, isOpen, onClose, isMobile }) => {
    if (!isMobile) {
        return (
            <Box pr={16} pt={4}>
                <SidebarContent />
            </Box>
        );
    }
    return (
        <>
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Basic Drawer
                    </DrawerHeader>
                    <DrawerBody>
                        <SidebarContent />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

const SidebarButton = ({ onOpen }) => (
    <IconButton
        aria-label={"Open documentation sidebar"}
        onClick={onOpen}
        icon={<HamburgerIcon />}
        bg="none"
    />
);

export default function DocsTemplate({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [width] = useWindowSize();
    const isMobile = width < 900;
    return (
        <PageTemplate
            variant="auth"
            // Show the button to open the sidebar drawer if there isn't enough
            // width to fit the sidebar on the page itself on smaller windows.
            buttons={isMobile ? [<SidebarButton onOpen={onOpen} />] : []}
        >
            <HStack justify="start" align="start" w="100vw" px={[4, 8, 16]}>
                <Sidebar
                    isOpen={isOpen}
                    onClose={onClose}
                    isMobile={isMobile}
                />
                <Container>
                    <Outlet />
                </Container>
            </HStack>
        </PageTemplate>
    );
}
