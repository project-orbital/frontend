import * as Yup from "yup";
import { useDispatch } from "react-redux";
import FormTextField from "../../../common/components/form/FormTextField";
import FormModal from "../../../common/components/form/FormModal";
import { createBudget, createStartDate, createEndDate } from "../state/budgets";

export default function CreateBudgetForm({ afterSubmit }) {
    const dispatch = useDispatch();
    //returns string
    const today = new Date();

    return (
        <FormModal
            title="Set your budget..."
            heading="Please set a start date, end date and budget amount for
                        your budget."
            submitText="Create budget"
            initialValues={{
                start_date: today,
                end_date: today,
                budget: 1000,
            }}
            validationSchema={Yup.object().shape({
                start_date: Yup.date().required("Please provide a date."),
                end_date: Yup.date()
                    .min(
                        Yup.ref("start_date"),
                        "End date should be later than start date"
                    )
                    .required("Please provide a date."),
                budget: Yup.number()
                    .typeError("Please provide a numeric value.")
                    .min(1)
                    .required("Please provide a balance."),
            })}
            onSubmit={(values) => {
                const { budget, start_date, end_date } = values;
                dispatch(createBudget(budget));
                dispatch(createStartDate(start_date));
                dispatch(createEndDate(end_date));
                afterSubmit();
            }}
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
                helperText="You can always change this later!"
            />
        </FormModal>
    );
}
