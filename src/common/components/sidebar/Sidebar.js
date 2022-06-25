import { Spacer, VStack } from "@chakra-ui/react";
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
export default function Sidebar({ selected }) {
    return (
        <VStack
            h="100vh"
            py="40px"
            w="160px"
            zIndex={999}
            pos="fixed"
            bgColor="accent-dark"
            overflow="auto"
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
}
