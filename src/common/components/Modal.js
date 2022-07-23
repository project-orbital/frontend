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
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import BackButton from "../components/buttons/BackButton";
import CancelButton from "../components/buttons/CancelButton";
import SubmitButton from "../components/buttons/SubmitButton";
import { useNavigate } from "react-router-dom";

/**
 * A custom modal component wrapping around Chakra UI's modal.
 * If you intend to integrate a form with the modal, check out `FormModal` instead.
 *
 * The modal should have a title, heading, and subheading.
 *
 * By default, the modal will have a cancel button which performs
 * a backward navigation to the previous page.
 * A submit button is also included but default, but it will not do anything
 * unless the `submitLink` prop is passed.
 *
 * If form submission is required, pass the form ID to the `submitForm` prop.
 * It is recommended to handle navigation after form submission using your
 * form library's `onSubmit` equivalent instead of using `submitLink` because the
 * default submit button will not do any form validation.
 *
 * @param isDestructive (optional, default: false) whether the action executed by the modal will be destructive
 * @param isSubmitting (optional, default: false) whether a spinning indicator should be shown on the submit button
 * @param hasBackButton (optional, default: true) whether the modal should have a back button
 * @param title the title of the modal displayed in bold at the top of the modal
 * @param heading the heading of the modal displayed below the title
 * @param subheading the subheading of the modal displayed below the heading
 * @param cancelText (optional, default: "Cancel") the text of the cancel button
 * @param cancelLink (optional, default: backward navigation) the link the cancel button should point to
 * @param cancelButton (optional) a button to display instead of the default cancel button, overriding `cancelText` and `cancelLink`
 * @param submitText (optional, default: "Submit") the text of the submit button
 * @param submitForm (optional) the form ID to submit when the submit button is clicked
 * @param submitLink (optional, default: backward navigation) the link the submit button should point to
 * @param submitButton (optional) a button to display instead of the default submit button, overriding `submitText` and `submitLink`
 * @param children the children elements for the modal body
 * @return {JSX.Element}
 */
export default function Modal({
    isDestructive,
    isSubmitting,
    hasBackButton,
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
    const overlayColor = useColorModeValue("blackAlpha.600", "blackAlpha.800");
    const { onClose } = useDisclosure();
    const navigate = useNavigate();

    const Header = () => {
        return (
            <ModalHeader>
                <HStack align="center">
                    {hasBackButton === false || <BackButton />}
                    <Heading size={["sm", "md"]} fontWeight="semibold">
                        {title}
                    </Heading>
                </HStack>
                <Text
                    fontSize={["sm", "md"]}
                    fontWeight="medium"
                    mt="20px"
                    color="fg"
                >
                    {heading}
                </Text>
                <Text
                    fontSize={["xs", "sm"]}
                    fontWeight="normal"
                    color="gray.500"
                >
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
            <ModalFooter pt={6} gap={4} flexDirection={["column", null, "row"]}>
                {cancelButton || (
                    <CancelButton
                        // This is correct - the cancellation is non-destructive if
                        // the action which is executed on success is destructive.
                        isNonDestructive={isDestructive}
                        text={cancelText}
                        onClick={() => navigate(cancelLink || -1)}
                    />
                )}
                {submitButton || (
                    <SubmitButton
                        isDestructive={isDestructive}
                        isLoading={isSubmitting}
                        text={submitText}
                        form={submitForm}
                        onClick={submitLink && (() => navigate(submitLink))}
                    />
                )}
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
            size={["xs", "md", "xl"]}
            motionPreset="slideInBottom"
        >
            <ModalOverlay bg={overlayColor} />
            <ModalContent bg="bg-light">
                <Header />
                <Body />
                <Footer />
            </ModalContent>
        </ChakraModal>
    );
}
