import { Box, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import Card from "../../components/Card";
import {
    MdDarkMode,
    MdNoteAlt,
    MdPhonelink,
    MdPrivacyTip,
    MdSchool,
    MdSwitchAccount,
} from "react-icons/md";

export default function FeatureCard() {
    return (
        <VStack w="100%" pt="50px" pb="80px" bg="bg">
            <Heading py="50px" size={["2xl", "3xl", "4xl"]} fontWeight="bold">
                Features
            </Heading>
            <Box px={[8, 12, 16, 32, 64]}>
                <SimpleGrid spacing="30px" columns={[1, null, 2, null, 3]}>
                    <Card
                        isCentered
                        icon={<MdPrivacyTip size="80px" />}
                        heading="Privacy first."
                        subheading="You can delete your data and account anytime you wish."
                    />
                    <Card
                        isCentered
                        icon={<MdSwitchAccount size="80px" />}
                        heading="Multiple accounts."
                        subheading="We've made it incredibly easy to create and switch between accounts."
                    />
                    <Card
                        isCentered
                        icon={<MdNoteAlt size="80px" />}
                        heading="Plan for the future."
                        subheading="Create a budget, track your assets, and stay on top of your liabilities with us."
                    />
                    <Card
                        isCentered
                        icon={<MdPhonelink size="80px" />}
                        heading="Responsive design."
                        subheading="Use DollarPlanner anywhere — even on your phone!"
                    />
                    <Card
                        isCentered
                        icon={<MdSchool size="80px" />}
                        heading="Learn as you go."
                        subheading="We curate financial literacy resources for you, and you can also share them with the community."
                    />
                    <Card
                        isCentered
                        icon={<MdDarkMode size="80px" />}
                        heading="Dark mode."
                        subheading="Planning your finances in the dark? No problem!"
                    />
                </SimpleGrid>
            </Box>
            <Heading pt="40px" size={["lg", "xl", "2xl"]}>
                ...and much more.
            </Heading>
        </VStack>
    );
}
