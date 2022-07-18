import FormModal from "../../../common/components/form/FormModal";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormTextField from "../../../common/components/form/FormTextField";
import { useToast } from "@chakra-ui/react";
import { useReportContributionMutation } from "../../../app/api";
import { useParams } from "react-router-dom";

export default function UserContribute() {
    const [reportContribution] = useReportContributionMutation();
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    async function handleSubmit(values, { setErrors }) {
        toast.closeAll();
        try {
            await reportContribution({ id: id, ...values }).unwrap();
            toast({
                title: "Thank you for your report!",
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
            isDestructive
            title="Report this submission..."
            submitText="Report submission"
            initialValues={{
                text: "",
            }}
            validationSchema={Yup.object({
                text: Yup.string().required("Please provide a text."),
            })}
            onSubmit={handleSubmit}
        >
            <FormTextField
                isMultiline
                id="text"
                isRequired
                withErrorMessage
                labelText="Let us know what's wrong."
                placeholderText="Example: Link is not working."
            />
        </FormModal>
    );
}
