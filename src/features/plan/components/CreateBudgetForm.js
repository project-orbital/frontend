import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { format, formatISO, parse } from "date-fns";
import FormTextField from "../../../common/components/FormTextField";
import { createBudget, createStartDate, createEndDate } from "../state/budgets";
import DatePicker from "react-datepicker";
import { FormControl, FormLabel } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function CreateBudgetForm({ afterSubmit }) {
    const dispatch = useDispatch();
    const today = format(new Date(), "dd/MM/yyyy");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <Formik
            initialValues={{
                start_date: "01 / 01 / 2000",
                end_date: today,
                budget: 1000,
            }}
            validationSchema={Yup.object({
                start_date: Yup.date()
                    .nullable()
                    .required("Please provide a date."),
                end_date: Yup.date()
                    .nullable()
                    .required("Please provide a date."),
                budget: Yup.number()
                    .typeError("Please provide a numeric value.")
                    .required("Please provide a balance."),
            })}
            onSubmit={(values) => {
                const { budget } = values;
                dispatch(createBudget(budget));
                dispatch(
                    createStartDate(
                        formatISO(
                            parse(
                                moment(new Date(startDate)),
                                "dd/MM/yyyy",
                                new Date()
                            )
                        )
                    )
                );
                dispatch(
                    createEndDate(
                        formatISO(
                            parse(
                                moment(new Date(endDate)),
                                "dd/MM/yyyy",
                                new Date()
                            )
                        )
                    )
                );
                afterSubmit();
            }}
        >
            <Form id="create-budget">
                <VStack spacing="20px">
                    <FormControl isRequired>
                        <FormLabel>Select start date</FormLabel>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Select start date</FormLabel>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                        />
                    </FormControl>
                    <FormTextField
                        id="budget"
                        isRequired
                        withErrorMessage
                        labelText="Your Budget"
                        placeholderText="1000"
                        helperText="Think carefully. For the duration of time you have set."
                    />
                </VStack>
            </Form>
        </Formik>
    );
}
