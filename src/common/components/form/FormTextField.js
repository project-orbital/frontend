import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    Textarea,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

/**
 * [DEPRECATED]
 *
 * This component is deprecated in favor of the components provided by the
 * formik-chakra-ui bindings.
 *
 * See https://codesandbox.io/s/formik-chakra-ui-27yzm?file=/src/Form.tsx
 * for examples of how to use the formik-chakra bindings.
 *
 * See https://629c67f66924e51a45fb2029--gregarious-marshmallow-00a41c.netlify.app/interfaces/baseprops.html
 * for the props that can be passed to the formik-chakra bindings.
 *
 * ===
 *
 * Abstracts a text input field in a Formik form into an easily customizable
 * component.
 *
 * The `isRequired` prop toggle allows you to specify whether an asterisk should
 * be displayed next to the label. This does not block form submission
 * if the field is empty, so you will need to provide a `required()` validation
 * rule in your Yup validation schema.
 *
 * The `isMultiline` prop toggle allows you to specify whether the field should
 * be vertically-resizable, allowing multi-line text input.
 *
 * The `withErrorMessage` prop toggle allows you to specify whether an error
 * message should be displayed based on your Formik validationSchema.
 *
 * The `id` prop is required. It is used to identify the field in the form.
 *
 * The `labelText` prop is required. It is used to label the field above the
 * text input area.
 *
 * The `placeholderText` prop is optional. It is used to provide a placeholder
 * text for the text input area when the field is empty.
 *
 * The `helperText` prop is optional. It is used to provide a helper text
 * below the text input area.
 *
 * @param isRequired whether an empty field should block form submission
 * @param isMultiline whether the field should be vertically-resizable
 * @param isPassword whether the field should be masked as a password, if not multi-line
 * @param withErrorMessage whether an error message should be displayed
 * @param id the field's unique identifier
 * @param labelText the field's label text
 * @param placeholderText (optional) the field's placeholder text
 * @param helperText (optional) the field's helper text
 * @param props the style props to pass to Chakra UI's Input or Textarea
 */
export default function FormTextField({
    isRequired,
    isMultiline,
    isPassword,
    isDate,
    leftAddon,
    withErrorMessage,
    id,
    labelText,
    placeholderText,
    helperText,
    ...props
}) {
    return (
        <Field name={id}>
            {({ field, form }) => (
                <FormControl
                    isRequired={isRequired}
                    isInvalid={form.errors[id] && form.touched[id]}
                >
                    <FormLabel htmlFor={id}>{labelText}</FormLabel>
                    {isMultiline ? (
                        <Textarea
                            {...field}
                            id={id}
                            placeholder={placeholderText || ""}
                            resize={"vertical"}
                            {...props}
                        />
                    ) : (
                        <InputGroup>
                            {leftAddon && (
                                <InputLeftAddon children={leftAddon} />
                            )}
                            <Input
                                {...field}
                                id={id}
                                type={
                                    (isPassword && "password") ||
                                    (isDate && "date")
                                }
                                placeholder={placeholderText || ""}
                                {...props}
                            />
                        </InputGroup>
                    )}
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
