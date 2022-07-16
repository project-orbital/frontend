import { useNavigate, useParams } from "react-router-dom";
import FormModal from "../../../../common/components/form/FormModal";
import { useDeleteTransactionMutation } from "../../../../app/api";
import { useToast } from "@chakra-ui/react";

export default function TransactionDelete() {
    const [deleteTransaction] = useDeleteTransactionMutation();
    const { transactionId } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    async function handleSubmit() {
        try {
            toast.closeAll();
            await deleteTransaction(transactionId).unwrap();
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
            isDestructive
            title="Deleting transaction..."
            heading="Are you sure you want to delete this transaction?"
            subheading="This action cannot be undone."
            cancelText="No, don't delete it"
            submitText="Yes, delete transaction"
            initialValues={{}}
            onSubmit={handleSubmit}
        />
    );
}
