import {
    Button,
    Checkbox,
    FormControl,
    Heading,
    HStack,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import { BsFillCaretRightFill } from "react-icons/bs";
import { IoChevronBack } from "react-icons/io5";
import axios from "axios";
import { addTransactions } from "../state/transactions";
import { useDispatch } from "react-redux";

export default function ReviewModal({
    uploadModal,
    reviewModal,
    confirmCancelModal,
    files,
}) {
    const dispatch = useDispatch();

    // === === ===
    // Form buttons (integrated with the modal).
    const BackButton = () => {
        return (
            <IconButton
                aria-label="Back to uploading"
                icon={<IoChevronBack />}
                mr="10px"
                onClick={handleBack}
            />
        );
    };

    const CancelButton = () => {
        return (
            <Button h="60px" w="100%" colorScheme="red" onClick={handleCancel}>
                Cancel upload
            </Button>
        );
    };

    const SubmitButton = () => {
        return (
            <Button
                type="submit"
                form="upload"
                h="60px"
                w="100%"
                colorScheme="gray"
                rightIcon={<BsFillCaretRightFill />}
                isDisabled={files.length < 1}
            >
                {`Upload selected ${files.length === 1 ? "file" : "files"}`}
            </Button>
        );
    };

    // === === ===
    // Form handling.
    const handleBack = () => {
        uploadModal.onOpen();
        reviewModal.onClose();
    };

    const handleCancel = () => {
        confirmCancelModal.onOpen();
    };

    const handleSubmit = (data) => {
        let headers = {
            Authorization: "token",
            "Content-Type": "multipart/form-data",
        };

        const submission = data.selections
            .filter((row) => row.isSelected)
            .reduce((prev, curr) => {
                prev.append("files", curr.file, curr.file.name);
                prev.append("passwords", curr.password);
                return prev;
            }, new FormData());

        return axios
            .post(`${process.env.REACT_APP_BACKEND}/api/upload`, submission, {
                headers,
            })
            .then((res) => {
                dispatch(addTransactions(res.data));
                reviewModal.onClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const initialValues = {
        selections: files.map((file) => ({
            file: file,
            isSelected: true,
            password: "",
        })),
    };

    // === === ===
    // Model sub-components.
    const CustomHeader = () => {
        return (
            <ModalHeader>
                <HStack align="center">
                    <BackButton />
                    <Heading as="h3" size="md" fontWeight="semibold">
                        Getting your transactions...
                    </Heading>
                </HStack>
                <Text fontSize="md" fontWeight="medium" mt="20px">
                    Confirm the statements you wish to upload.
                </Text>
                <Text fontSize="sm" fontWeight="normal" color="gray.600">
                    If your files are password-protected, you will need to enter
                    their passwords to decrypt them below. We will not store
                    your passwords.
                </Text>
            </ModalHeader>
        );
    };

    const CustomBodyFormRow = ({ file, index }) => {
        return (
            <HStack justify="space-between" gap="20px">
                <Field
                    as={Checkbox}
                    name={`selections.${index}.isSelected`}
                    defaultChecked
                    spacing="15px"
                >
                    <Text fontSize="sm" fontWeight="bold" mt="5px">{`#${
                        index + 1
                    }`}</Text>
                    <Text fontSize="xs" maxW="300px" mb="5px">
                        {file.name}
                    </Text>
                </Field>
                <Field
                    as={Input}
                    name={`selections.${index}.password`}
                    type="password"
                    size="xs"
                    placeholder="••••••••"
                />
            </HStack>
        );
    };

    const CustomBody = () => {
        return (
            <ModalBody>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form id="upload">
                        <FormControl>
                            <FieldArray name="selections">
                                {() => (
                                    <>
                                        {files.map((file, index) => (
                                            <CustomBodyFormRow
                                                file={file}
                                                index={index}
                                                key={index}
                                            />
                                        ))}
                                    </>
                                )}
                            </FieldArray>
                        </FormControl>
                    </Form>
                </Formik>
            </ModalBody>
        );
    };

    const CustomFooter = () => {
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
            onClose={reviewModal.onClose}
            isOpen={reviewModal.isOpen}
            closeOnOverlayClick={false}
            scrollBehavior="inside"
            isCentered
            size="xl"
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent>
                <CustomHeader />
                <CustomBody />
                <CustomFooter />
            </ModalContent>
        </Modal>
    );
}
