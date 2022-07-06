import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../state/transactions";
import { format, formatISO, isMatch, parse } from "date-fns";
import { useParams } from "react-router-dom";
import FormTextField from "../../../common/components/form/FormTextField";

export default function SpendingTransactionCreationForm({ afterSubmit }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const today = format(new Date(), "dd/MM/yyyy");
    return (
        <Formik
            initialValues={{
                date: today,
                amount: 123.9,
                balance: 4567.89,
                description: "Some income.",
            }}
            validationSchema={Yup.object({
                date: Yup.string()
                    .test(
                        "date",
                        "Please provide a valid date in the form dd/mm/yyyy",
                        (value) => isMatch(value, "dd/MM/yyyy")
                    )
                    .required("Please provide a date."),
                amount: Yup.number()
                    .typeError("Please provide a numeric value.")
                    .required("Please provide an amount."),
                balance: Yup.number()
                    .typeError("Please provide a numeric value.")
                    .required("Please provide a balance."),
                description: Yup.string(),
            })}
            onSubmit={(values) => {
                const { date, amount, balance } = values;
                // Store date object a string so it can be serialized, otherwise Redux will complain.
                // We get the date as dd/mm/yyyy, and we want to store it as `<day> <month> <year>`.
                dispatch(
                    addTransaction({
                        ...values,
                        // Store monetary values as numbers.
                        amount: parseFloat(amount),
                        balance: parseFloat(balance),
                        // Store dates as formatted ISO strings because Date objects aren't serializable.
                        date: formatISO(parse(date, "dd/MM/yyyy", new Date())),
                        accountId: parseInt(id),
                    })
                );
                afterSubmit();
            }}
        >
            <Form id="create">
                <VStack spacing="20px">
                    <FormTextField
                        id="date"
                        isRequired
                        withErrorMessage
                        labelText="Date"
                        placeholderText="dd/mm/yyyy"
                        helperText="We're working on a date picker for this! For now, use dd/mm/yyyy."
                    />
                    <FormTextField
                        id="amount"
                        isRequired
                        withErrorMessage
                        labelText="Amount"
                        placeholderText="123.90"
                        helperText="This should be negative for withdrawals, and positive for deposits."
                    />
                    <FormTextField
                        id="balance"
                        isRequired
                        withErrorMessage
                        labelText="Balance"
                        placeholderText="4567.89"
                        helperText="This should be the balance of your account after the transaction."
                    />
                    <FormTextField
                        id="description"
                        isMultiline
                        labelText="Description"
                        placeholderText={
                            "Put important information in the first line.\nOther less important details can follow."
                        }
                        helperText="This can span multiple lines. We'll use the first line as a header."
                    />
                </VStack>
            </Form>
        </Formik>
    );
}
