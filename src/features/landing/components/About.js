import { Box, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import Card from "../../../common/components/Card";
import { MdMenuBook, MdPersonSearch } from "react-icons/md";
import { GiMoonOrbit } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";

export default function About() {
    return (
        <VStack w="100%" pt="50px" pb="260px" bg="bg">
            <Heading py="50px" size="4xl" fontWeight="bold">
                About Us
            </Heading>
            <Box w="65%">
                <SimpleGrid spacing="30px" columns={[1, null, 2]}>
                    <Card
                        isCentered
                        isDarkModeReady
                        icon={<MdPersonSearch size="100px" />}
                        heading="Who are we?"
                        subheading="Hi there! We're a pair of first-year undergraduates at the National University of Singapore. We're passionate about financial literacy and want to make it easy for you to learn about your finances."
                    />
                    <Card
                        isCentered
                        isDarkModeReady
                        icon={<GiMoonOrbit size="100px" />}
                        heading="Orbital 2022."
                        subheading="This website and its accompanying application is a project under Orbital. Orbital (CP2106) is a credit-bearing self-driven programming summer program offered at the National University of Singapore."
                    />
                    <Card
                        isCentered
                        isDarkModeReady
                        isExternalLink
                        icon={<FaGithub size="100px" />}
                        heading="GitHub."
                        subheading="Check out the code behind DollarPlanner by clicking here!"
                        link="https://github.com/project-orbital"
                    />{" "}
                    <Card
                        isCentered
                        isDarkModeReady
                        isExternalLink
                        icon={<MdMenuBook size="100px" />}
                        heading="Documentation."
                        link="https://docs.google.com/document/d/1esnaCBwPM2lMZyA8X4hZHNqOJsR8ecKmHzmcL8bfQkY/edit?usp=sharing"
                        subheading="Want to read the documentation for DollarPlanner? Click here!"
                    />
                </SimpleGrid>
            </Box>
        </VStack>
    );
}
