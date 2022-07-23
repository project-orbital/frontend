import * as Yup from "yup";
import FormTextField from "../../../common/components/form/FormTextField";
import FormModal from "../../../common/components/form/FormModal";
import { useCreateBudgetMutation } from "../../../app/api";
import { useNavigate } from "react-router-dom";
import { FormControl, FormHelperText, useToast } from "@chakra-ui/react";
import { add, format } from "date-fns";
import { NumberInputControl } from "formik-chakra-ui";

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
            title="Creating your budget..."
            submitText="Create budget"
            initialValues={{
                start_date: format(new Date(), "yyyy-MM-dd"),
                end_date: format(add(new Date(), { months: 1 }), "yyyy-MM-dd"),
                budget: "",
            }}
            validationSchema={Yup.object().shape({
                start_date: Yup.date().required("Please provide a date."),
                end_date: Yup.date()
                    .min(
                        Yup.ref("start_date"),
                        "Please provide a date after the starting date."
                    )
                    .required("Please provide a date."),
                budget: Yup.number()
                    .typeError("Please provide a numeric value.")
                    .min(
                        0.01,
                        "Please provide a positive value greater than 0."
                    )
                    .required("Please provide an amount."),
            })}
            onSubmit={handleSubmit}
        >
            <FormTextField
                id="start_date"
                isRequired
                isDate
                withErrorMessage
                labelText="Start Date"
            />
            <FormTextField
                id="end_date"
                isDate
                isRequired
                withErrorMessage
                labelText="End Date"
            />
            <FormControl>
                <NumberInputControl
                    isRequired
                    name="budget"
                    label="Budgeted Amount"
                    numberInputProps={{
                        precision: 2,
                        step: 0.01,
                        min: 0.01,
                    }}
                />
                <FormHelperText>
                    You can always change this later.
                </FormHelperText>
            </FormControl>
        </FormModal>
    );
}
