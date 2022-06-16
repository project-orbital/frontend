import {Heading, Spacer, VStack} from "@chakra-ui/react";
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";

export default function Sidebar() {
    return <VStack p="40px" minH="100vh" w="260px" zIndex={999} pos="fixed" bgColor="gray.800">
        <Heading as="h1" size="lg" color="white">DollarPlanner</Heading>;
        <VStack h="100%" pt="85px" spacing="10px" align="start" alignSelf="start">
            <SidebarLink to="/dashboard" text="Dashboard"/>
            <SidebarLink to="/dashboard" text="Analyze"/>
            <SidebarLink to="/dashboard" text="Plan"/>
            <SidebarLink to="/dashboard" text="Learn"/>
            <SidebarCategory name="Bank Accounts"
                             items={[<SidebarLink key='1' to="/dashboard" text="Account 1" size="sm"/>,
                                 <SidebarLink key='2' to="/dashboard" text="Account 2" size="sm"/>,
                                 <SidebarLink key='3' to="/dashboard" text="Account 3" size="sm"/>]}/>

            <SidebarCategory name="Investment Accounts"
                             items={[<SidebarLink key='4' to="/dashboard" text="Account 1" size="sm"/>,
                                 <SidebarLink key='5' to="/dashboard" text="Account 2" size="sm"/>,
                                 <SidebarLink to="/dashboard" text="Account 3" size="sm"/>]}/>
        </VStack>
        <Spacer/>
        <VStack h="100%" pt="85px" spacing="10px" align="start" alignSelf="start">
            <SidebarLink to="/dashboard" text="Settings"/>
            <SidebarLink to="/" text="Sign out"/>
        </VStack>
    </VStack>
}
