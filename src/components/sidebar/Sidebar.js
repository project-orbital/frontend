import {Heading, Spacer, VStack} from "@chakra-ui/react";
import {AiOutlineAreaChart} from "react-icons/ai";
import {MdSchool, MdSpaceDashboard} from "react-icons/md";
import {RiHome3Fill, RiLogoutBoxLine, RiPieChart2Fill, RiSettings3Line} from "react-icons/ri";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
    return <VStack minH='100vh' py='40px' w='160px' zIndex={999} pos='fixed' bgColor='gray.900'>
        <Heading
            as='h3'
            size='md'
            color='white'
            fontWeight='black'
            pb='20px'
            borderBottom='1.5px solid white'
        >
            DollarPlanner
        </Heading>
        <Spacer/>
        <VStack h='100%' w='100%'>
            <SidebarLink
                isSelected
                to="/dashboard"
                text="Dashboard"
                icon={<RiHome3Fill size='40px'/>}
            />
            <SidebarLink
                to="/accounts"
                text="accounts"
                icon={<MdSpaceDashboard size='40px'/>}
            />
            <SidebarLink
                to="/portfolio"
                text="portfolio"
                icon={<AiOutlineAreaChart size='40px'/>}
            />
            <SidebarLink
                to="/plan"
                text="plan"
                icon={<RiPieChart2Fill size='40px'/>}
            />
            <SidebarLink
                to="/learn"
                text="learn"
                icon={<MdSchool size='40px'/>}
            />
        </VStack>
        <Spacer/>
        <VStack>
            <SidebarLink
                isSecondary
                to="/settings"
                text="settings"
                icon={<RiSettings3Line size='25px'/>}
            />
            <SidebarLink
                isSecondary
                to="/"
                text="sign out"
                icon={<RiLogoutBoxLine size='25px'/>}
            />
        </VStack>
    </VStack>
}
