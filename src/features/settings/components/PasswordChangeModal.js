import ky from "ky";
import FormModal from "../../../common/components/form/FormModal";
import FormTextField from "../../../common/components/form/FormTextField";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function PasswordChangeModal() {
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (values) => {
        try {
            await ky.post(
                `${process.env.REACT_APP_BACKEND}/users/preferences/change-password`,
                {
                    json: values,
                    credentials: "include",
                }
            );
            toast({
                title: "Password changed successfully.",
                description: "Please sign in with your new password.",
                status: "success",
                duration: null,
                isClosable: true,
            });
            navigate("/sign-out");
        } catch (error) {
            toast({
                title: await error.response.text(),
                description: "Please try again.",
                status: "error",
                duration: null,
                isClosable: true,
            });
        }
    };

    return (
        <FormModal
            title="Changing your password..."
            heading="Your new password will take effect immediately."
            subheading="You will need to sign in again after changing your password."
            submitText="Change password"
            initialValues={{
                password: "",
                confirmPassword: "",
            }}
            // The backend will also validate the password.
            validationSchema={Yup.object({
                password: Yup.string()
                    .min(8, "Password must be at least 8 characters long.")
                    .required("Password is required."),
                confirmPassword: Yup.string()
                    .required("Passwords must match.")
                    .oneOf(
                        [Yup.ref("password"), null],
                        "Passwords must match."
                    ),
            })}
            onSubmit={handleSubmit}
        >
            <FormTextField
                id="password"
                isRequired
                isPassword
                withErrorMessage
                labelText="New password"
                placeholderText="••••••••"
                helperText="At least 8 characters long."
            />
            <FormTextField
                id="confirmPassword"
                isRequired
                isPassword
                withErrorMessage
                labelText="Confirm new password"
                placeholderText="••••••••"
            />
        </FormModal>
    );
}
