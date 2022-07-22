import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import FormModal from "../../../common/components/form/FormModal";
import {
    useDeleteLiabilityMutation,
    useReadLiabilityQuery,
} from "../../../app/api";

export default function LiabilityDelete() {
    const { liabilityId } = useParams();
    const {
        data: liability,
        isLoading,
        isError,
    } = useReadLiabilityQuery(liabilityId);
    const [deleteLiability] = useDeleteLiabilityMutation();
    const navigate = useNavigate();
    const toast = useToast();

    if (isLoading) {
        return null;
    }
    if (isError) {
        return null;
    }

    async function handleSubmit() {
        try {
            toast.closeAll();
            await deleteLiability(liabilityId).unwrap();
            toast({
                title: "Liability deleted.",
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
            title="Deleting asset records..."
            heading={`Are you sure you want to delete all records for ${liability.name}?`}
            subheading="This action cannot be undone."
            cancelText="No, don't delete it"
            submitText="Yes, delete records"
            initialValues={{}}
            onSubmit={handleSubmit}
        />
    );
}
