import FormModal from "../../../common/components/form/FormModal";
import { InputControl } from "formik-chakra-ui";
import { useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDeleteUserDataMutation } from "../../../app/api";

export default function DataErase() {
    const [eraseData] = useDeleteUserDataMutation();
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async ({ password }, { setErrors }) => {
        try {
            toast.closeAll();
            await eraseData(password).unwrap();
            toast({
                title: "Data erased successfully.",
                status: "success",
            });
            navigate("../");
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
            title="Erasing your data..."
            heading="Are you absolutely sure you want to erase your data?"
            subheading="This cannot be undone. You will lose all your data except for your account."
            cancelText="Cancel data erasure"
            submitText="Erase data"
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
