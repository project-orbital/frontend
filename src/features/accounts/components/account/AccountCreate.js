import FormModal from "../../../../common/components/form/FormModal";
import { InputControl } from "formik-chakra-ui";
import { useCreateAccountMutation } from "../../../../app/api";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function AccountCreate() {
    const [createAccount] = useCreateAccountMutation();
    const navigate = useNavigate();
    const toast = useToast();

    async function handleSubmit(values, { setErrors }) {
        try {
            toast.closeAll();
            await createAccount(values).unwrap();
            toast({
                title: "Account created!",
                description: "You can now add transactions to this account.",
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
    }

    return (
        <FormModal
            title="Creating your account..."
            heading="We need some details about this account."
            subheading="Accounts in DollarPlanner are ledgers used to store your transactions.
            We will never ask for sensitive information such as your bank account password."
            cancelText="Cancel account creation"
            submitText="Create account"
            initialValues={{
                name: "DBS Multiplier Account",
                nickname: "Savings Account",
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(255, "Please use a shorter name.")
                    .required("Please provide a name."),
                nickname: Yup.string().max(
                    255,
                    "Please use a shorter nickname."
                ),
            })}
            onSubmit={handleSubmit}
        >
            <InputControl
                isRequired
                name="name"
                label="Account Name"
                inputProps={{ placeholder: "Enter an account name" }}
            />
            <InputControl
                name="nickname"
                label="Account Nickname"
                inputProps={{ placeholder: "Enter an account nickname" }}
            />
        </FormModal>
    );
}
