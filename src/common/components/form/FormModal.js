import Modal from "../Modal";
import { Form, Formik } from "formik";
import { VStack } from "@chakra-ui/react";
import { useState } from "react";

/**
 * A modal with an integrated form constructed from a vertical stack of its children elements.
 * Uses Formik and Yup to create and validate the form respectively.
 * The parent modal can be customized with the props in `Modal`.
 *
 * The `initialValues` prop is required, otherwise a warning that an uncontrolled input
 * is being changed to be controlled will be emitted.
 *
 * The `onSubmit` prop is also required. Navigation to close the modal should
 * be placed in this callback, otherwise the modal will not close.
 * The callback should be a function that accepts the form values as an argument.
 *
 * The `validationSchema` expects a Yup object with the form fields as keys.
 *
 * @param initialValues the initial values of the form
 * @param validationSchema the validation schema for the form
 * @param onSubmit the callback to call when the form is submitted
 * @param children the components of the form
 * @param modalProps the props to pass to the parent modal
 * @return {JSX.Element}
 */
export default function FormModal({
    initialValues,
    validationSchema,
    onSubmit,
    children,
    ...modalProps
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <Modal
            {...modalProps}
            submitForm="integrated-form"
            isSubmitting={isSubmitting}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, props) => {
                    setIsSubmitting(true);
                    await onSubmit(values, props);
                    setIsSubmitting(false);
                }}
            >
                <Form id="integrated-form" noValidate>
                    <VStack spacing="20px">{children}</VStack>
                </Form>
            </Formik>
        </Modal>
    );
}
