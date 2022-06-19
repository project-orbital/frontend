import {useForm} from "react-hook-form";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import Axios from "axios";
import {
    Button, Center, FormControl, FormErrorMessage, Heading, Input, Link, Spacer, useToast, VStack
} from "@chakra-ui/react";

export default function RequestPasswordReset() {
    // === === ===
    // Hooks.

    const navigate = useNavigate();
    const toast = useToast();
    const {
        register, handleSubmit, formState: {errors, isSubmitting}
    } = useForm();

    // === === ===
    // Form handling.

    function requestPasswordReset(values) {
        return Axios({
            method: "POST", data: {
                email: values.email
            }, withCredentials: true, url: `${process.env.REACT_APP_BACKEND}/request-password-reset`
        })
            .catch(err => errorToast(err.response.data))
            .then(res => {
                if (res.status === 200) {
                    toast.closeAll();
                    successToast();
                    navigate("/password-reset-email-sent");
                }
            });
    }

    function errorToast(message) {
        toast({
            title: "We could not reset your password",
            description: message,
            status: "error",
            isClosable: true
        });
    }

    function successToast() {
        toast({
            title: "Success!",
            description: "Please check your email",
            status: "success",
            isClosable: true
        });
    }

    // === === ===
    // Form fields.
    const emailField = <FormControl isInvalid={errors.email} w="100%">
        <Input id="email"
               placeholder="someone@example.com"
               {...register("email", {
                   required: "Please provide your email address.",
                   // This regex pattern isn't a substitute for email validation, but it will stop most invalid emails from being entered.
                   // https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
                   pattern: {value: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/, message: "Invalid email address."}
               })}/>
        <FormErrorMessage color="red.500">{errors.email && errors.email.message}</FormErrorMessage>
    </FormControl>;

    const submitButton = <Button isLoading={isSubmitting} type="submit" h="60px" w="100%" bg="black" color="white">
        Send password reset email
    </Button>;

    const HomepageLink = <Link as={RouterLink} to="/" color="blue.500">Back to homepage ►</Link>;

    // === === ===
    // Form component.

    return <Center h="100vh" w="100vw" bg="gray.50">
        <VStack>
            <Heading as="h1">Please enter your email</Heading>
            <Spacer p="20px"/>
            <VStack p="60px" align="stretch" borderRadius="20px" bg="white" shadow="lg">
                <form onSubmit={handleSubmit(requestPasswordReset)}>
                    <VStack align="stretch">
                        {emailField}
                        <Spacer/>
                        <VStack>
                            {submitButton}
                            <Spacer/>
                            {HomepageLink}
                        </VStack>
                    </VStack>
                </form>
            </VStack>
        </VStack>
    </Center>;
}
