import FormModal from "../../../../common/components/form/FormModal";
import { useNavigate, useParams } from "react-router-dom";
import {
    useReadTransactionQuery,
    useUpdateTransactionMutation,
} from "../../../../app/api";
import * as Yup from "yup";
import {
    InputControl,
    NumberInputControl,
    SelectControl,
    TextareaControl,
} from "formik-chakra-ui";
import { useToast } from "@chakra-ui/react";
import { format } from "date-fns";

export default function TransactionUpdate() {
    const { transactionId } = useParams();
    const {
        data: transaction,
        isLoading,
        isError,
    } = useReadTransactionQuery(transactionId);
    const [updateTransaction] = useUpdateTransactionMutation();
    const navigate = useNavigate();
    const toast = useToast();

    if (isLoading || isError) {
        return;
    }

    const initialValues = isLoading
        ? {
              date: "",
              description: "",
              category: "",
              amount: "",
              balance: "",
          }
        : { ...transaction, date: format(transaction.date, "yyyy-MM-dd") };

    const validationSchema = Yup.object({
        date: Yup.date().required("Please provide a date."),
        amount: Yup.number()
            .typeError("Please provide a numerical value.")
            .required("Please provide an amount."),
        balance: Yup.number().typeError("Please provide a numerical value."),
        category: Yup.string().required("Please provide a category."),
        description: Yup.string(),
    });

    async function handleSubmit(values, { setErrors }) {
        toast.closeAll();
        try {
            await updateTransaction({
                id: transactionId,
                ...values,
            }).unwrap();
            toast({
                title: "Transaction updated.",
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
            title="Editing your transaction..."
            heading="You can search for your transaction by date, amount, or description."
            subheading="The existing transaction details have been pre-filled for you."
            cancelText="Discard changes"
            submitText="Update transaction"
            initialValues={initialValues}
            validationSchema={validationSchema}
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
            <SelectControl isRequired name="category" label="Category">
                <option value="">Please select</option>
                <option value="Dining">Dining</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Others">Others</option>
            </SelectControl>
            <TextareaControl
                name="description"
                label="Description"
                textareaProps={{
                    placeholder: "Enter a description",
                }}
            />
        </FormModal>
    );
}
