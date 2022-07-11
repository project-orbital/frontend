import FormModal from "../../../common/components/form/FormModal";
import FormTextField from "../../../common/components/form/FormTextField";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import ky from "ky";

export default function AccountDelete() {
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (values, { setErrors }) => {
        try {
            toast.closeAll();
            await ky.delete(
                `${process.env.REACT_APP_BACKEND}/users/preferences/delete-account`,
                {
                    json: values,
                    credentials: "include",
                }
            );
            toast({
                title: "Account deleted successfully.",
                description: "Thanks for using DollarPlanner.",
                status: "warning",
                duration: null,
                isClosable: true,
            });
            navigate("/sign-out");
        } catch (error) {
            const errors = await error.response.json();
            setErrors(errors);
            toast({
                title: Object.values(errors),
                description: "Please try again.",
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
            <FormTextField
                id="password"
                isRequired
                isPassword
                withErrorMessage
                labelText="Enter your password to confirm."
                placeholder="••••••••"
            />
        </FormModal>
    );
}
