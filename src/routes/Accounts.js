import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Heading, Text, VStack} from "@chakra-ui/react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {RiArrowRightSLine} from "react-icons/ri";
import Sidebar from "../components/sidebar/Sidebar";

export default function Accounts() {
    const navigate = useNavigate();

    return <Box>
        <Sidebar selected='accounts'/>
        <VStack
            w='calc(100vw - 160px)'
            h='100vh'
            ml='160px'
            p='40px'
            spacing='40px'
            align='start'
            overflow='hidden'
            float='left'
        >
            <Box>
                <Breadcrumb spacing='2px' separator={<RiArrowRightSLine/>}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to='/dashboard'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to='/accounts'>Accounts</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Heading as='h1' size='2xl' pt='10px'>Accounts</Heading>
            </Box>
            <Box
                w='100%'
                h='100%'
                p='40px'
                bg='white'
                shadow='sm'
                borderRadius='10px'
            >
                <Heading as='h2' size='xl'>No accounts to display.</Heading>
                <Text>Get started by creating an account.</Text>
                <Button my='40px' h="60px" onClick={() => navigate("/accounts/create")}>Create an account</Button>
                <Outlet/>
            </Box>
        </VStack>
    </Box>
}
