import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useToast,
    VStack,
} from "@chakra-ui/react";
import PageTemplate from "../../components/PageTemplate";

export default function RequestPasswordReset() {
    const navigate = useNavigate();
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    function requestPasswordReset(values) {
        return Axios({
            method: "POST",
            data: {
                email: values.email,
            },
            withCredentials: true,
            url: `${process.env.REACT_APP_BACKEND}/request-password-reset`,
        })
            .catch(() => errorToast())
            .then((res) => {
                if (res.status === 200) {
                    toast.closeAll();
                    navigate("/password-reset-email-sent");
                }
            });
    }

    function errorToast() {
        toast({
            title: "Something went wrong.",
            description:
                "We couldn't send you an email with a link to reset your password. Please try again.",
            status: "error",
            isClosable: true,
        });
    }

    const EmailField = () => (
        <FormControl isInvalid={errors.email} w="100%">
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
                id="email"
                placeholder="someone@example.com"
                {...register("email", {
                    required: "Please provide your email address.",
                    // This regex pattern isn't a substitute for email validation, but it will stop most invalid emails from being entered.
                    // https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
                    pattern: {
                        value: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
                        message: "Invalid email address.",
                    },
                })}
            />
            <FormErrorMessage color="red.500">
                {errors.email && errors.email.message}
            </FormErrorMessage>
        </FormControl>
    );

    const SubmitButton = () => (
        <Button
            isLoading={isSubmitting}
            type="submit"
            h="60px"
            w="100%"
            bg="accent"
            color="white"
            transition="transform .1s"
            _hover={{
                transform: "scale(1.08)",
            }}
        >
            Send password reset email
        </Button>
    );

    return (
        <PageTemplate variant="auth" heading="Request a password reset.">
            <form onSubmit={handleSubmit(requestPasswordReset)}>
                <VStack spacing="40px">
                    <EmailField />
                    <SubmitButton />
                </VStack>
            </form>
        </PageTemplate>
    );
}
