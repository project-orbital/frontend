import * as Yup from "yup";
import FormTextField from "../../../common/components/form/FormTextField";
import FormModal from "../../../common/components/form/FormModal";
import { useUpdateBudgetMutation } from "../../../app/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function AmendBudget() {
    const [updateBudget] = useUpdateBudgetMutation();
    const navigate = useNavigate();
    const toast = useToast();

    async function handleSubmit(values, { setErrors }) {
        toast.closeAll();
        try {
            await updateBudget({ ...values }).unwrap();
            toast({
                title: "Budget updated!",
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
            title="Set your budget..."
            heading="Do you really want to change your budget?"
            submitText="Update budget"
            initialValues={{
                budget: "",
            }}
            validationSchema={Yup.object({
                budget: Yup.number()
                    .typeError("Please provide a numeric value.")
                    .min(1)
                    .required("Please provide a balance."),
            })}
            onSubmit={handleSubmit}
        >
            <FormTextField
                id="budget"
                isRequired
                withErrorMessage
                labelText="Budgeted Amount"
                helperText="You can always change this later!"
            />
        </FormModal>
    );
}
