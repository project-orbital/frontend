import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import FormTextField from "../../../common/components/form/FormTextField";
import FormModal from "../../../common/components/form/FormModal";
import { createBudget } from "../state/budgets";

export default function AmendBudget() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { onClose } = useDisclosure();
    const afterSubmit = () => {
        onClose();
        navigate("../");
    };
    return (
        <FormModal
            title="Set your budget..."
            heading="Do you really want to change your budget?"
            submitText="Create budget"
            initialValues={{
                budget: 1000,
            }}
            validationSchema={Yup.object({
                budget: Yup.number()
                    .typeError("Please provide a numeric value.")
                    .required("Please provide a balance."),
            })}
            onSubmit={(values) => {
                const { budget } = values;
                dispatch(createBudget(budget));
                afterSubmit();
            }}
        >
            <FormTextField
                id="budget"
                isRequired
                withErrorMessage
                labelText="Budgeted Amount"
                placeholderText="1000"
                helperText="You can always change this later!"
            />
        </FormModal>
    );
}
