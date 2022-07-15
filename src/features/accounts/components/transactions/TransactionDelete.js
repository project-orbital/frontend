import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import FormModal from "../../../../common/components/form/FormModal";
import { SelectControl } from "formik-chakra-ui";
import {
    useDeleteTransactionMutation,
    useReadTransactionsInAccountQuery,
} from "../../../../app/api";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";

export default function TransactionDelete() {
    const { id: accountId } = useParams();
    const {
        data: transactions,
        isLoading,
        isError,
    } = useReadTransactionsInAccountQuery(accountId);
    const [deleteTransaction] = useDeleteTransactionMutation();
    const navigate = useNavigate();
    const toast = useToast();

    if (isError) {
        return;
    }

    async function handleSubmit({ transaction }) {
        try {
            toast.closeAll();
            await deleteTransaction(transaction).unwrap();
            toast({
                title: "Transaction deleted.",
                status: "success",
            });
            navigate("../../");
        } catch (error) {
            toast({
                ...error,
                status: "error",
            });
        }
    }

    return (
        <FormModal
            title="Deleting a transaction..."
            heading="Select the transaction you wish to delete."
            subheading="This action cannot be undone."
            cancelText="Cancel transaction deletion"
            submitText="Delete selected transaction"
            initialValues={{
                transaction: "",
            }}
            validationSchema={Yup.object({
                transaction: Yup.string().required(
                    "Please select a transaction."
                ),
            })}
            onSubmit={handleSubmit}
        >
            {!isLoading && (
                <SelectControl
                    name="transaction"
                    selectProps={{ placeholder: "Select option" }}
                >
                    {transactions.map((tx, i) => (
                        <option key={tx.id} value={tx.id}>{`#${i + 1}: ${
                            tx.description
                        } ${formatDistanceToNow(tx.date, {
                            addSuffix: true,
                        })}`}</option>
                    ))}
                </SelectControl>
            )}
        </FormModal>
    );
}
