import FormModal from "../../../common/components/form/FormModal";
import { useNavigate } from "react-router-dom";
import { useDeleteBudgetMutation } from "../../../app/api";
import { useToast } from "@chakra-ui/react";

export default function BudgetDelete() {
    const navigate = useNavigate();
    const [deleteBudget] = useDeleteBudgetMutation();
    const toast = useToast();

    async function handleSubmit() {
        try {
            toast.closeAll();
            await deleteBudget().unwrap();
            toast({
                title: "Transaction deleted.",
                status: "success",
            });
            navigate("../");
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
            title="Deleting your budget..."
            heading="Are you sure you want to delete your budget?"
            subheading="This action cannot be undone."
            cancelText="No, don't delete it"
            submitText="Yes, delete transaction"
            initialValues={{}}
            onSubmit={handleSubmit}
        />
    );
}
