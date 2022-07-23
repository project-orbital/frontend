import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import FormModal from "../../../../common/components/form/FormModal";
import { useDeleteAccountMutation } from "../../../../app/api";

export default function AccountDelete() {
    const [deleteAccount] = useDeleteAccountMutation();

    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    async function handleSubmit() {
        try {
            toast.closeAll();
            await deleteAccount(id).unwrap();
            toast({
                title: "Account deleted.",
                status: "success",
            });
            navigate("/accounts");
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
            title="Deleting your account..."
            heading="Are you absolutely sure you want to delete your account?"
            subheading="This action cannot be undone."
            cancelText="Cancel account deletion"
            submitText="Delete account"
            initialValues={{}}
            onSubmit={handleSubmit}
        />
    );
}
