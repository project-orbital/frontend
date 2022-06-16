import {HStack} from "@chakra-ui/react";
import Sidebar from "../components/sidebar/Sidebar";

export default function Accounts() {
    return <HStack w='100%' minH='100vh' align='start' spacing='0' overflow='hidden' float='left' bg='gray.200'>
        <Sidebar selected='accounts'/>
    </HStack>
}
