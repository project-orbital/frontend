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

/**
 * A custom modal component wrapping around Chakra UI's modal.
 *
 * The modal should have a title, heading, and subheading.
 * By default, the modal will have a cancel button and a submit button which perform
 * a backward navigation to the previous page.
 * If form submission is required, pass the form ID to the `submitForm` prop.
 *
 * @param hasBackButton (optional, default: false) `true` if the modal should have a back button, `false` otherwise
 * @param size (optional, default: "xl") the size of the modal: "sm", "md", "lg", or "xl"
 * @param title the title of the modal displayed in bold at the top of the modal
 * @param heading the heading of the modal displayed below the title
 * @param subheading the subheading of the modal displayed below the heading
 * @param cancelText (optional, default: "Cancel") the text of the cancel button
 * @param cancelLink (optional, default: backward navigation) the link the cancel button should point to
 * @param cancelButton (optional) a to display instead of the default cancel button, overriding `cancelText` and `cancelLink`
 * @param submitText (optional, default: "Submit") the text of the submit button
 * @param submitForm (optional) the form ID to submit when the submit button is clicked
 * @param submitLink (optional, default: backward navigation) the link the submit button should point to
 * @param submitButton (optional) a to display instead of the default submit button, overriding `submitText` and `submitLink`
 * @param children the children elements for the modal body
 * @return {JSX.Element}
 */
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
    submitForm,
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
                        <SubmitButton
                            text={submitText}
                            form={submitForm}
                            onClick={() => navigate(submitLink || -1)}
                        />
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
