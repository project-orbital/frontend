import {Heading, Spacer, VStack} from "@chakra-ui/react";
import {AiOutlineAreaChart} from "react-icons/ai";
import {MdSchool, MdSpaceDashboard} from "react-icons/md";
import {RiHome3Fill, RiLogoutBoxLine, RiPieChart2Fill, RiSettings3Line} from "react-icons/ri";
import SidebarLink from "./SidebarLink";

/**
 * A header, and two vertical stacks of links.
 *
 * @param selected the optional selected link to be accented
 */
export default function Sidebar({selected}) {
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
                isSelected={selected === 'dashboard'}
                to="/dashboard"
                text="dashboard"
                icon={<RiHome3Fill size='40px'/>}
            />
            <SidebarLink
                isSelected={selected === 'accounts'}
                to="/accounts"
                text="accounts"
                icon={<MdSpaceDashboard size='40px'/>}
            />
            <SidebarLink
                isSelected={selected === 'portfolio'}
                to="/portfolio"
                text="portfolio"
                icon={<AiOutlineAreaChart size='40px'/>}
            />
            <SidebarLink
                isSelected={selected === 'plan'}
                to="/plan"
                text="plan"
                icon={<RiPieChart2Fill size='40px'/>}
            />
            <SidebarLink
                isSelected={selected === 'learn'}
                to="/learn"
                text="learn"
                icon={<MdSchool size='40px'/>}
            />
        </VStack>
        <Spacer/>
        <VStack h='100%' w='100%'>
            <SidebarLink
                isSelected={selected === 'settings'}
                to="/settings"
                text="settings"
                icon={<RiSettings3Line size='25px'/>}
            />
            <SidebarLink
                to="/"
                text="sign out"
                icon={<RiLogoutBoxLine size='25px'/>}
            />
        </VStack>
    </VStack>
}
