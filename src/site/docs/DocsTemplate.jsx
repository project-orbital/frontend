import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import {
    Box,
    Container,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton,
    Link as ChakraLink,
    Show,
    Stack,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Navbar from "../../common/components/navbar/Navbar";
import { useEffect } from "react";

const Section = ({ name, children }) => {
    return (
        <Stack direction="column" spacing={2}>
            <Text
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                color="gray.500"
                pt={10}
            >
                {name}
            </Text>
            {children}
        </Stack>
    );
};
const Link = ({ text, ...props }) => (
    <ChakraLink
        fontSize="sm"
        as={RouterLink}
        fontWeight="medium"
        color="fg-light"
        {...props}
    >
        {text}
    </ChakraLink>
);

const SidebarContent = () => {
    return (
        <VStack align="start">
            <Section name="Overview">
                <Link to="./overview/introduction" text="Introduction" />
                <Link to="./overview/quick-links" text="Quick Links" />
                <Link to="./overview/tech-stack" text="Tech Stack" />
            </Section>
            <Section name="Features">
                <Link to="./features/milestone-1" text="Milestone I" />
                <Link to="./features/milestone-2" text="Milestone II" />
                <Link to="./features/milestone-3" text="Milestone III" />
            </Section>
            <Section name="Architecture">
                <Link
                    to="./architecture/authentication"
                    text="Authentication"
                />
                <Link to="./architecture/database" text="Database" />
                <Link to="./architecture/parser" text="Parser" />
            </Section>
            <Section name="Design">
                <Link to="./design/ui-ux" text="UI & UX" />
            </Section>
            <Section name="Testing">
                <Link to="./testing/strategy" text="Strategy" />
                <Link to="./testing/user-testing" text="User Testing" />
                <Link to="./testing/ci-cd" text="CI/CD" />
            </Section>{" "}
            <Section name="Miscellany">
                <Link to="./miscellany/swe-practices" text="SWE Practices" />
                <Link to="./miscellany/limitations" text="Limitations" />
                <Link to="./miscellany/project-log" text="Project Log" />
            </Section>
        </VStack>
    );
};

// Sidebar variant which will be displayed inline with the content.
const SidebarInline = () => (
    <Flex
        pos="fixed"
        top={[20, 24]}
        w={[0, 0, 0, 250, 270]}
        h={["calc(100vh - 5rem)", "calc(100vh - 6rem)"]}
        pl={[0, 0, 0, 16]}
        pb={[20, 24]}
        zIndex={4}
        align="start"
        overflowY="auto"
        flex={1}
        // border="1px solid red"
    >
        <SidebarContent />
    </Flex>
);

// Sidebar variant which will be tucked away in a drawer.
const SidebarDrawer = ({ isOpen, onClose }) => (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Documentation</DrawerHeader>
            <DrawerBody pb={16} onClick={onClose}>
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
                left={[0, 0, 0, 300, 320]}
                px={[4, 10, 20, 0]}
                pb={[20, 24]}
            >
                <Outlet />
            </Container>
        </Box>
    );
}
