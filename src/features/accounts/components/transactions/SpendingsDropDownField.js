import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Select,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

export default function FormDropDownField({
    isRequired,
    withErrorMessage,
    id,
    helperText,
    passChildData,
}) {
    return (
        <Field name={id}>
            {({ form }) => (
                <FormControl
                    isRequired={isRequired}
                    isInvalid={form.errors[id] && form.touched[id]}
                >
                    <FormLabel htmlFor={id}>Type of spending</FormLabel>
                    <Select
                        onChange={(event) => passChildData(event.target.value)}
                    >
                        <option value="">Please select</option>
                        <option value="Dining">Dining</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Bills">Bills</option>
                        <option value="Education">Education</option>
                        <option value="Others">Others</option>
                    </Select>
                    {withErrorMessage && (
                        <FormErrorMessage>{form.errors[id]}</FormErrorMessage>
                    )}
                    {helperText && (
                        <FormHelperText>{helperText}</FormHelperText>
                    )}
                </FormControl>
            )}
        </Field>
    );
}
