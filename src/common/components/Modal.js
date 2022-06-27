import {
    Heading,
    HStack,
    Modal as ChakraModal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import BackButton from "../components/buttons/BackButton";
import CancelButton from "../components/buttons/CancelButton";
import SubmitButton from "../components/buttons/SubmitButton";
import NavButton from "./buttons/NavButton";
import { useNavigate } from "react-router-dom";

export default function Modal({
    hasBackButton,
    size,
    title,
    heading,
    subheading,
    cancelText,
    cancelLink,
    cancelButton,
    submitText,
    submitLink,
    submitButton,
    children,
}) {
    const { onClose } = useDisclosure();
    const navigate = useNavigate();

    const Header = () => {
        return (
            <ModalHeader>
                <HStack align="center">
                    {hasBackButton && <BackButton />}
                    <Heading as="h3" size="md" fontWeight="semibold">
                        {title}
                    </Heading>
                </HStack>
                <Text fontSize="md" fontWeight="medium" mt="20px">
                    {heading}
                </Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.600">
                    {subheading}
                </Text>
            </ModalHeader>
        );
    };

    const Body = () => {
        return <ModalBody>{children}</ModalBody>;
    };

    const Footer = () => {
        return (
            <ModalFooter mt="20px" gap="20px">
                {cancelButton || (
                    <CancelButton
                        text={cancelText}
                        onClick={() => navigate(cancelLink || -1)}
                    />
                )}
                {submitButton ||
                    (submitLink ? (
                        <NavButton to={submitLink} text={submitText} w="100%" />
                    ) : (
                        <SubmitButton text={submitText} />
                    ))}
            </ModalFooter>
        );
    };

    return (
        <ChakraModal
            onClose={onClose}
            isOpen
            closeOnOverlayClick={false}
            scrollBehavior="inside"
            isCentered
            size={size || "xl"}
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent>
                <Header />
                <Body />
                <Footer />
            </ModalContent>
        </ChakraModal>
    );
}
