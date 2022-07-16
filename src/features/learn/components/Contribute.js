import FormModal from "../../../common/components/form/FormModal";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import FormTextField from "../../../common/components/form/FormTextField";
import {
    createHeader,
    createSummary,
    createLink,
} from "../state/contributions";

export default function UserContribute() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { onClose } = useDisclosure();
    const afterSubmit = () => {
        onClose();
        navigate("../");
    };

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
            onSubmit={(values) => {
                const { header, summary, link } = values;
                dispatch(createHeader(header));
                dispatch(createSummary(summary));
                dispatch(createLink(link));
                afterSubmit();
            }}
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
