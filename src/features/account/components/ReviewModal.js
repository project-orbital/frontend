import {
    Button,
    Checkbox,
    FormControl,
    HStack,
    Input,
    Text,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import { BsFillCaretRightFill } from "react-icons/bs";
import axios from "axios";
import { addTransactions } from "../../transactions/state/transactions";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllFiles, selectFiles } from "../state/files";
import { Outlet, useNavigate } from "react-router-dom";
import Modal from "../../../common/components/Modal";

export default function ReviewModal() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const files = useSelector(selectFiles);

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

    const handleCancel = () => {
        navigate("./cancel");
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
                dispatch(deleteAllFiles());
                navigate("../");
            })
            .catch((err) => {
                console.log(err);
            });
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

    const initialValues = {
        selections: files.map((file) => ({
            file: file,
            isSelected: true,
            password: "",
        })),
    };

    // Modal component.
    return (
        <Modal
            title="Getting your transactions..."
            heading="Confirm the statements you wish to upload."
            subheading="If your files are password-protected, you will need to enter
                    their passwords to decrypt them below. We will not store
                    your passwords."
            cancelButton={<CancelButton />}
            submitButton={<SubmitButton />}
        >
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
            <Outlet />
        </Modal>
    );
}
