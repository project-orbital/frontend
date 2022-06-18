import React from "react";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, VStack} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {renameAccount} from "../../states/accounts";

export default function AccountRenameForm({id, name, nickname, afterSubmit}) {
    const dispatch = useDispatch();
    return <Formik
        initialValues={{
            "name": name, "nickname": nickname
        }}
        validationSchema={Yup.object({
            "name": Yup.string().required("Please provide a name."), "nickname": Yup.string()
        })}
        onSubmit={values => {
            console.log(values);
            dispatch(renameAccount({...values, id: id}));
            afterSubmit();
        }}
    >
        <Form id="rename">
            <VStack spacing="20px">
                <Field name="name">
                    {({
                          field, form
                      }) => <FormControl isRequired isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel htmlFor="name">Account Name</FormLabel>
                        <Input {...field} id="name"/>
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>}
                </Field>
                <Field name="nickname">
                    {({
                          field
                      }) => <FormControl>
                        <FormLabel htmlFor="nickname">Account Nickname</FormLabel>
                        <Input {...field} id="nickname"/>
                        <FormHelperText>Something memorable that you associate the account with.</FormHelperText>
                    </FormControl>}
                </Field>
            </VStack>
        </Form>
    </Formik>;
}
