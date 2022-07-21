import {
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Show,
    Spacer,
    VStack,
} from "@chakra-ui/react";
import { AiOutlineAreaChart } from "react-icons/ai";
import { MdSchool, MdSpaceDashboard } from "react-icons/md";
import {
    RiHome3Fill,
    RiLogoutBoxLine,
    RiPieChart2Fill,
    RiSettings3Line,
} from "react-icons/ri";
import SidebarLink from "./SidebarLink";
import Logo from "../navbar/Logo";

/**
 * A header, and two vertical stacks of links.
 *
 * @param selected the optional selected link to be accented
 */
const SidebarContent = ({ selected }) => (
    <VStack
        h="100vh"
        py="40px"
        w={["100%", null, null, "160px"]}
        pos="fixed"
        bgColor="accent-dark"
        align="start"
    >
        <Logo
            direction="column"
            color="white"
            size="md"
            link="/dashboard"
            hasBorder
        />
        <Spacer />
        <SidebarLink
            isSelected={selected === "dashboard"}
            to="/dashboard"
            text="dashboard"
            icon={<RiHome3Fill size="32px" />}
        />
        <SidebarLink
            isSelected={selected === "accounts"}
            to="/accounts"
            text="accounts"
            icon={<MdSpaceDashboard size="32px" />}
        />
        <SidebarLink
            isSelected={selected === "portfolio"}
            to="/portfolio"
            text="portfolio"
            icon={<AiOutlineAreaChart size="32px" />}
        />
        <SidebarLink
            isSelected={selected === "plan"}
            to="/plan"
            text="plan"
            icon={<RiPieChart2Fill size="32px" />}
        />
        <SidebarLink
            isSelected={selected === "learn"}
            to="/learn"
            text="learn"
            icon={<MdSchool size="32px" />}
        />
        <Spacer />
        <SidebarLink
            isSelected={selected === "settings"}
            to="/settings"
            text="settings"
            icon={<RiSettings3Line size="24px" />}
        />
        <SidebarLink
            to="/sign-out"
            text="sign out"
            icon={<RiLogoutBoxLine size="24px" />}
        />
    </VStack>
);

// Sidebar variant which will be displayed inline with the content.
const SidebarInline = ({ selected }) => (
    <Flex
        pos="fixed"
        w="160px"
        minH="100vh"
        pb={[20, 24]}
        zIndex={16}
        align="start"
        overflowY="auto"
    >
        <SidebarContent selected={selected} />
    </Flex>
);

// Sidebar variant which will be tucked away in a drawer.
const SidebarDrawer = ({ selected, isOpen, onClose }) => (
    <Drawer
        isFullHeight={true}
        size="xs"
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
    >
        <DrawerOverlay />
        <DrawerContent bg="accent-dark" onClick={onClose}>
            <SidebarContent selected={selected} />
        </DrawerContent>
    </Drawer>
);

export default function Sidebar({ selected, isOpen, onClose }) {
    return (
        <>
            <Show above="lg">
                <SidebarInline
                    selected={selected}
                    isOpen={isOpen}
                    onClose={onClose}
                />
            </Show>
            <SidebarDrawer
                selected={selected}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
}
