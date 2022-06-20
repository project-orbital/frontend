import {
    Heading,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import { BackButton } from "../components/buttons/BackButton";
import { CancelButton } from "../components/buttons/CancelButton";
import { SubmitButton } from "../components/buttons/SubmitButton";

export default function AModal(
    hasBackButton,
    heading,
    subheading,
    text,
    form,
    onClose,
    isOpen
) {
    const Header = () => {
        return (
            <ModalHeader>
                <HStack align="center">
                    <BackButton isDisabled={hasBackButton} />
                    <Heading as="h3" size="md" fontWeight="semibold">
                        {heading}
                    </Heading>
                </HStack>
                <Text fontSize="md" fontWeight="medium" mt="20px">
                    {subheading}
                </Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.600">
                    {text}
                </Text>
            </ModalHeader>
        );
    };

    const Body = () => {
        return <ModalBody>{form}</ModalBody>;
    };

    const Footer = () => {
        return (
            <ModalFooter mt="20px" gap="20px">
                <CancelButton />
                <SubmitButton />
            </ModalFooter>
        );
    };

    // === === ===
    // Modal component.
    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            closeOnOverlayClick={false}
            isCentered
            size="xl"
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent>
                <Header />
                <Body />
                <Footer />
            </ModalContent>
        </Modal>
    );
}
