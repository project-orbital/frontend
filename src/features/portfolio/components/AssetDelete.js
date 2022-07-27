import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import FormModal from "../../../common/components/form/FormModal";
import { useDeleteAssetMutation, useReadAssetQuery } from "../../../app/api";

export default function AssetDelete() {
    const { assetId } = useParams();
    const { data: asset, isLoading, isError } = useReadAssetQuery(assetId);
    const [deleteAsset] = useDeleteAssetMutation();
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
            await deleteAsset(assetId).unwrap();
            toast({
                title: "Asset deleted.",
                status: "success",
            });
            navigate("../../../");
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
            heading={`Are you sure you want to delete all records for ${asset.name}?`}
            subheading="This will also delete all buy and sell orders recorded. This action cannot be undone."
            cancelText="No, don't delete them"
            submitText="Yes, delete records"
            initialValues={{}}
            onSubmit={handleSubmit}
        />
    );
}
