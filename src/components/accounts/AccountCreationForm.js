import React from 'react';
import * as Yup from 'yup';
import {Field, Form, Formik} from 'formik';
import {FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, VStack} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {addAccount} from '../../states/accounts';

export default function AccountCreationForm({afterSubmit}) {
    const dispatch = useDispatch();
    return <Formik
        initialValues={{
            'name': '',
            'nickname': ''
        }}
        validationSchema={Yup.object({
            'name': Yup.string().required('Please provide a name.'),
            'nickname': Yup.string()
        })}
        onSubmit={values => {
            dispatch(addAccount(values));
            afterSubmit();
        }}
    >
        <Form id="create">
            <VStack spacing="20px">
                <Field name="name">
                    {({
                          field,
                          form
                      }) => <FormControl isRequired isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel htmlFor="name">Account Name</FormLabel>
                        <Input {...field} id="name" placeholder="DBS Multiplier Account"/>
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>}
                </Field>
                <Field name="nickname">
                    {({
                          field
                      }) => <FormControl>
                        <FormLabel htmlFor="nickname">Account Nickname</FormLabel>
                        <Input {...field} id="nickname" placeholder="Savings Account"/>
                        <FormHelperText>Something memorable that you associate the account with.</FormHelperText>
                    </FormControl>}
                </Field>
            </VStack>
        </Form>
    </Formik>;
}
