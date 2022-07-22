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
            title="Sharing an article..."
            heading="Please be respectful and considerate of other users. "
            subheading="Do not share inappropriate content."
            submitText="Contribute article"
            initialValues={{
                header: "",
                summary: "",
                link: "",
            }}
            validationSchema={Yup.object({
                header: Yup.string().required("Please provide a title."),
                summary: Yup.string().required("Please provide a summary."),
                link: Yup.string().required("Please provide a link."),
            })}
            onSubmit={handleSubmit}
        >
            <FormTextField
                id="header"
                isRequired
                withErrorMessage
                labelText="Title"
                placeholderText="Enter a short title"
            />
            <FormTextField
                isMultiline
                id="summary"
                isRequired
                withErrorMessage
                labelText="Summary"
                placeholderText="Enter a brief summary of the article."
            />
            <FormTextField
                id="link"
                isRequired
                withErrorMessage
                labelText="Link"
                placeholderText="Enter a link to the article"
            />
        </FormModal>
    );
}
