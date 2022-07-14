import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { format, isMatch, isBefore, parseISO } from "date-fns";
import FormTextField from "../../../common/components/form/FormTextField";
import FormModal from "../../../common/components/form/FormModal";
import { createBudget, createStartDate, createEndDate } from "../state/budgets";

export default function CreateBudgetForm({ afterSubmit }) {
    const dispatch = useDispatch();
    const today = format(new Date(), "dd/MM/yyyy");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    return (
        <FormModal
            title="Set your budget..."
            heading="Please set a start date, end date and budget amount for
                        your upcoming budget."
            submitText="Create budget"
            initialValues={{
                start_date: today,
                end_date: today,
                budget: 1000,
            }}
            validationSchema={Yup.object({
                start_date: Yup.string()
                    .test("date", "Please provide a valid date", (value) =>
                        isMatch(value, "dd/MM/yyyy")
                    )
                    .required("Please provide a date."),
                end_date: Yup.string()
                    .test("date", "Please provide a valid date", (value) =>
                        isMatch(value, "dd/MM/yyyy")
                    )
                    .test(
                        "date",
                        "End date should be after start date",
                        (value) =>
                            isBefore(
                                parseISO(Yup.ref("start_date")),
                                parseISO(value)
                            )
                    )
                    .required("Please provide a date."),
                budget: Yup.number()
                    .typeError("Please provide a numeric value.")
                    .min(1)
                    .required("Please provide a balance."),
            })}
            onSubmit={(values) => {
                const { budget } = values;
                dispatch(createBudget(budget));
                dispatch(createStartDate(startDate));
                dispatch(createEndDate(endDate));
                afterSubmit();
            }}
        >
            <FormTextField
                id="start_date"
                isRequired
                isDate
                withErrorMessage
                labelText="Start date"
                value={startDate}
                onChange={(ev) => setStartDate(ev.target.value)}
            />
            <FormTextField
                id="end_date"
                isDate
                isRequired
                withErrorMessage
                value={endDate}
                labelText="End date"
                onChange={(ev) => setEndDate(ev.target.value)}
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
