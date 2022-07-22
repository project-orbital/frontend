import * as Yup from "yup";
import FormTextField from "../../../common/components/form/FormTextField";
import FormModal from "../../../common/components/form/FormModal";
import { useCreateBudgetMutation } from "../../../app/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function BudgetCreate() {
    const [createBudget] = useCreateBudgetMutation();
    const navigate = useNavigate();
    const toast = useToast();

    async function handleSubmit(values, { setErrors }) {
        toast.closeAll();
        try {
            await createBudget({ ...values }).unwrap();
            toast({
                title: "Budget created!",
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
            heading="Please set a start date, end date and budget amount for
                        your budget."
            submitText="Create budget"
            initialValues={{
                start_date: new Date(),
                end_date: new Date(),
                budget: 0,
            }}
            validationSchema={Yup.object().shape({
                start_date: Yup.date().required("Please provide a date."),
                end_date: Yup.date()
                    .min(
                        Yup.ref("start_date"),
                        "End date should be later than start date and current date"
                    )
                    .required("Please provide a date."),
                budget: Yup.number()
                    .typeError("Please provide a numeric value.")
                    .min(1)
                    .required("Please provide a balance."),
            })}
            onSubmit={handleSubmit}
        >
            <FormTextField
                id="start_date"
                isRequired
                isDate
                withErrorMessage
                labelText="Start date"
            />
            <FormTextField
                id="end_date"
                isDate
                isRequired
                withErrorMessage
                labelText="End date"
            />
            <FormTextField
                id="budget"
                isRequired
                withErrorMessage
                labelText="Budgeted Amount"
                placeholderText="1000"
                helperText="You can still change this later."
            />
        </FormModal>
    );
}
