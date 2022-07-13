import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Input, VStack, FormControl, FormLabel } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { format, isMatch } from "date-fns";
import FormTextField from "../../../common/components/form/FormTextField";
import { createBudget, createStartDate, createEndDate } from "../state/budgets";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateBudgetForm({ afterSubmit }) {
    const dispatch = useDispatch();
    const today = format(new Date(), "dd/MM/yyyy");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    return (
        <Formik
            initialValues={{
                start_date: today,
                end_date: today,
                budget: 1000,
                accounts: [],
            }}
            validationSchema={Yup.object({
                start_date: Yup.string()
                    .test(
                        "date",
                        "Please provide a valid date in the form dd/mm/yyyy",
                        (value) => isMatch(value, "dd/MM/yyyy")
                    )
                    .required("Please provide a date."),
                end_date: Yup.string()
                    .test(
                        "date",
                        "Please provide a valid date in the form dd/mm/yyyy",
                        (value) => isMatch(value, "dd/MM/yyyy")
                    )
                    .required("Please provide a date."),
                budget: Yup.number()
                    .typeError("Please provide a numeric value.")
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
            <Form id="create-budget">
                <VStack spacing="20px">
                    <FormControl isRequired>
                        <FormLabel>Select start date</FormLabel>
                        <Input
                            size="md"
                            backgroundColor="#ffffff"
                            type="date"
                            value={startDate}
                            onChange={(ev) => setStartDate(ev.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Select start date</FormLabel>
                        <Input
                            size="md"
                            backgroundColor="#ffffff"
                            type="date"
                            value={endDate}
                            onChange={(ev) => setEndDate(ev.target.value)}
                        />
                    </FormControl>
                    <FormTextField
                        id="budget"
                        isRequired
                        withErrorMessage
                        labelText="Your Budget"
                        placeholderText="1000"
                        helperText="Think carefully!"
                    />
                </VStack>
            </Form>
        </Formik>
    );
}
