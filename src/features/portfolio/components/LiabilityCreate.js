import FormModal from "../../../common/components/form/FormModal";
import * as Yup from "yup";
import { useCreateLiabilityMutation } from "../../../app/api";
import { useNavigate } from "react-router-dom";
import { FormControl, FormHelperText, useToast } from "@chakra-ui/react";
import {
    InputControl,
    NumberInputControl,
    SelectControl,
    TextareaControl,
} from "formik-chakra-ui";

export default function LiabilityCreate() {
    const [createLiability] = useCreateLiabilityMutation();
    const navigate = useNavigate();
    const toast = useToast();

    async function handleSubmit(values, { setErrors }) {
        try {
            toast.closeAll();
            await createLiability(values).unwrap();
            toast({
                title: "Liability added.",
                description:
                    "You can now record your repayments for this liability.",
                status: "success",
            });
            navigate("../");
        } catch (error) {
            setErrors(error);
            toast({
                ...error,
                status: "error",
            });
        }
    }

    return (
        <FormModal
            title="Adding your liability..."
            heading="We need some details about this liability."
            subheading="Please fill out the form below to add your liability."
            cancelText={`Cancel liability creation`}
            submitText={`Add liability`}
            initialValues={{
                name: "",
                description: "",
                category: "",
                amount: "",
                interest: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(255, "Name is too long.")
                    .required("Please provide a liability name."),
                description: Yup.string().max(8192, "Description is too long."),
                category: Yup.string().required("Please select a category."),
                amount: Yup.number()
                    .typeError("Please provide a numerical value.")
                    .required("Please provide an amount due."),
                interest: Yup.number()
                    .typeError("Please provide a numerical value.")
                    .required("Please provide an annual interest rate."),
            })}
            onSubmit={handleSubmit}
        >
            <InputControl
                isRequired
                name="name"
                label="Liability Name"
                inputProps={{ placeholder: "Enter a liability name" }}
            />
            <FormControl>
                <TextareaControl
                    name="description"
                    label="Description"
                    textareaProps={{
                        placeholder: "(optional) Enter a description.",
                    }}
                />
                <FormHelperText>
                    An optional description which will help you identify the
                    purpose of liability.
                </FormHelperText>
            </FormControl>
            <SelectControl isRequired name="category" label="Category">
                <option value="">Please select</option>
                <option value="Bills">Bills</option>
                <option value="Credit">Credit</option>
                <option value="Debt">Debt</option>
                <option value="Loans">Loans</option>
                <option value="Mortgages">Mortgages</option>
                <option value="Others">Others</option>
            </SelectControl>
            <NumberInputControl
                isRequired
                name="amount"
                label="Amount Due"
                numberInputProps={{
                    precision: 2,
                    step: 1,
                }}
            />
            <FormControl>
                <NumberInputControl
                    isRequired
                    name="interest"
                    label="Annual Interest Rate"
                    numberInputProps={{
                        precision: 2,
                        step: 1,
                    }}
                />
                <FormHelperText>
                    We'll use this value as a percentage.
                </FormHelperText>
            </FormControl>
        </FormModal>
    );
}
