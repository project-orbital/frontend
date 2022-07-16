import { Badge, Box, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import Card from "../../../common/components/Card";
import {
    MdDarkMode,
    MdDocumentScanner,
    MdPhonelink,
    MdPrivacyTip,
    MdSchool,
    MdSwitchAccount,
} from "react-icons/md";

export default function FeatureCard() {
    return (
        <VStack w="100%" pt="50px" pb="80px" bg="bg">
            <Heading py="50px" size="4xl" fontWeight="bold">
                Features
            </Heading>
            <Box w="65%">
                <SimpleGrid spacing="30px" columns={[1, null, 2, null, 3]}>
                    <Card
                        isCentered
                        icon={<MdPrivacyTip size="80px" />}
                        heading="Privacy first."
                        subheading="We do not store your sensitive information on our servers."
                    />
                    <Card
                        isCentered
                        icon={<MdSwitchAccount size="80px" />}
                        heading="Multiple accounts."
                        subheading="We've made it incredibly easy to create and switch between accounts."
                    />
                    <Card
                        isCentered
                        icon={<MdDocumentScanner size="80px" />}
                        badge={<Badge>Experimental</Badge>}
                        heading="Document parsing."
                        subheading="Let our document parser do the heavy lifting. No data entry needed."
                    />
                    <Card
                        isCentered
                        icon={<MdPhonelink size="80px" />}
                        badge={<Badge>Beta</Badge>}
                        heading="Responsive design."
                        subheading="Use DollarPlanner anywhere — even on your phone!"
                    />
                    <Card
                        isCentered
                        icon={<MdSchool size="80px" />}
                        heading="Learn as you go."
                        subheading="No prior knowledge required. We curate financial literacy resources for you."
                    />
                    <Card
                        isCentered
                        icon={<MdDarkMode size="80px" />}
                        badge={<Badge>Beta</Badge>}
                        heading="Dark mode."
                        subheading="Planning your finances in the dark? No problem!"
                    />
                </SimpleGrid>
            </Box>
            <Heading pt="40px">...and much more.</Heading>
        </VStack>
    );
}
