import FormModal from "../../../../common/components/form/FormModal";
import {
    useReadAccountQuery,
    useUpdateAccountMutation,
} from "../../../../app/api";
import * as Yup from "yup";
import { InputControl } from "formik-chakra-ui";
import { useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

export default function AccountRename() {
    const [updateAccount] = useUpdateAccountMutation();
    const { id } = useParams();
    const { data: accounts } = useReadAccountQuery(id);
    const { name, nickname } = accounts ?? {};
    const navigate = useNavigate();
    const toast = useToast();

    async function handleSubmit(values, { setErrors }) {
        try {
            toast.closeAll();
            await updateAccount({ ...values, id }).unwrap();
            toast({
                title: "Account renamed!",
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
            title="Renaming your account..."
            heading="What would you like to call this account?"
            subheading="The existing name and nickname have been pre-filled for you."
            cancelText="Cancel account renaming"
            submitText="Rename account"
            initialValues={{
                name: name,
                nickname: nickname,
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
