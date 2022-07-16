import FormModal from "../../../common/components/form/FormModal";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormTextField from "../../../common/components/form/FormTextField";
import { useToast } from "@chakra-ui/react";
import { useCreateContributionMutation } from "../../../app/api";

export default function UserContribute() {
    const [createContribution] = useCreateContributionMutation();
    const navigate = useNavigate();
    const toast = useToast();

    async function handleSubmit(values, { setErrors }) {
        toast.closeAll();
        try {
            await createContribution({ ...values }).unwrap();
            toast({
                title: "Thank you for your contribution!",
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
            title="Contribute an article..."
            heading="Submit this form to contirbute an article..."
            submitText="Contribute article"
            initialValues={{
                header: "",
                summary: "",
                link: "",
            }}
            validationSchema={Yup.object({
                header: Yup.string().required("Please provide a text."),
                summary: Yup.string().required("Please provide a text."),
                link: Yup.string().required("Please provide a text."),
            })}
            onSubmit={handleSubmit}
        >
            <FormTextField
                id="header"
                isRequired
                withErrorMessage
                labelText="Header for article"
            />
            <FormTextField
                isMultiline
                id="summary"
                isRequired
                withErrorMessage
                labelText="Summary for the article"
            />
            <FormTextField
                id="link"
                isRequired
                withErrorMessage
                labelText="Link for the article"
            />
        </FormModal>
    );
}
