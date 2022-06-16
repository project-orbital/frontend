import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {FormControl, VStack} from "@chakra-ui/react";

export default function AccountCreationForm({afterSubmit}) {
    const initialValues = {};
    const handleSubmit = (values, {setSubmitting}) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
        afterSubmit();
    }
    return <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form id='create'>
            <FormControl>
                <VStack>
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" type="text"/>
                    <ErrorMessage name="firstName"/>

                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" type="text"/>
                    <ErrorMessage name="lastName"/>

                    <label htmlFor="email">Email Address</label>
                    <Field name="email" type="email"/>
                    <ErrorMessage name="email"/>
                </VStack>
            </FormControl>
        </Form>
    </Formik>
}
