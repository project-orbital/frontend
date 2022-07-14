import FormModal from "../../../../common/components/form/FormModal";
import * as Yup from "yup";
import {
    InputControl,
    NumberInputControl,
    SelectControl,
    TextareaControl,
} from "formik-chakra-ui";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useCreateTransactionMutation } from "../../../../app/api";

export default function TransactionCreate({ type }) {
    const [createTransaction] = useCreateTransactionMutation();
    const { id: accountId } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    async function handleSubmit(values, { setErrors }) {
        toast.closeAll();
        try {
            await createTransaction({ ...values, accountId }).unwrap();
            toast({
                title: "Transaction added!",
                status: "success",
            });
            navigate("../../../");
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
            title="Adding your transaction..."
            heading="We need some details about this transaction."
            subheading="The transaction will be added under this account. If
                        this is incorrect, you can edit the transaction later."
            cancelText="Cancel transaction addition"
            submitText="Add transaction"
            initialValues={{
                date: undefined,
                amount: undefined,
                category: "",
                description: "",
            }}
            validationSchema={Yup.object({
                date: Yup.date().required("Please provide a date."),
                amount: Yup.number()
                    .typeError("Please provide a numerical value.")
                    .required("Please provide an amount."),
                balance: Yup.number().typeError(
                    "Please provide a numerical value."
                ),
                category:
                    type === "withdrawal"
                        ? Yup.string().required("Please provide a category.")
                        : Yup.string(),
                description: Yup.string(),
            })}
            onSubmit={handleSubmit}
        >
            <InputControl
                isRequired
                name="date"
                label="Transaction Date"
                inputProps={{ type: "date" }}
            />
            <NumberInputControl
                isRequired
                name="amount"
                label="Amount"
                numberInputProps={{
                    precision: 2,
                    step: 0.01,
                }}
            />
            <NumberInputControl
                name="balance"
                label="Balance"
                numberInputProps={{
                    precision: 2,
                    step: 0.01,
                }}
            />
            {type === "withdrawal" && (
                <SelectControl isRequired name="category" label="Category">
                    <option value="">Please select</option>
                    <option value="Dining">Dining</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Bills">Bills</option>
                    <option value="Education">Education</option>
                    <option value="Others">Others</option>
                </SelectControl>
            )}
            <TextareaControl
                name={"description"}
                label="Description"
                textareaProps={{
                    placeholder: "Enter a description",
                }}
            />
        </FormModal>
    );
}
