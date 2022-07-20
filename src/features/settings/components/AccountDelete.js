import FormModal from "../../../common/components/form/FormModal";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useDeleteUserAccountMutation } from "../../../app/api";
import { InputControl } from "formik-chakra-ui";

export default function AccountDelete() {
    const [deleteAccount] = useDeleteUserAccountMutation();
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async ({ password }, { setErrors }) => {
        try {
            toast.closeAll();
            await deleteAccount(password).unwrap();
            toast({
                title: "Account deleted successfully.",
                description: "Thanks for using DollarPlanner.",
                status: "warning",
                duration: null,
                isClosable: true,
            });
            navigate("/sign-out");
        } catch (error) {
            setErrors(error);
            toast({
                ...error,
                status: "error",
            });
        }
    };

    return (
        <FormModal
            isDestructive
            title="Deleting your account..."
            heading="Are you absolutely sure you want to delete your DollarPlanner account?"
            subheading="This cannot be undone. Your data will also be erased from our servers."
            cancelText="Cancel account deletion"
            submitText="Delete account"
            initialValues={{
                password: "",
            }}
            validationSchema={Yup.object({
                password: Yup.string().required("Password is required."),
            })}
            onSubmit={handleSubmit}
        >
            <InputControl
                isRequired
                name="password"
                label="Enter your password to confirm."
                inputProps={{
                    type: "password",
                    autoComplete: "new-password",
                    placeholder: "••••••••",
                }}
            />
        </FormModal>
    );
}
