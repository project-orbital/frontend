import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useToast,
    VStack,
} from "@chakra-ui/react";
import PageTemplate from "../../PageTemplate";

export default function ResetPassword() {
    const { userId, resetString } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    function resetPassword(values) {
        return axios({
            method: "POST",
            data: {
                password: values.password,
                userId: userId,
                resetString: resetString,
            },
            withCredentials: true,
            url: `${process.env.REACT_APP_BACKEND}/reset-password`,
        })
            .catch(() => errorToast())
            .then((res) => {
                if (res.status === 200) {
                    toast.closeAll();
                    navigate("/reset-password-success");
                }
            });
    }

    function errorToast() {
        toast({
            title: "We couldn't reset your password.",
            description:
                "Please try again, and check that you have the correct link.",
            status: "error",
            isClosable: true,
        });
    }

    const passwordField = (
        <FormControl isInvalid={errors.password} w="100%">
            <FormLabel htmlFor="password">New Password</FormLabel>
            <Input
                id="password"
                placeholder="••••••••"
                type="password"
                {...register("password", {
                    required: "Please provide a password.",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long.",
                    },
                })}
            />
            <FormErrorMessage color="red.500">
                {errors.password && errors.password.message}
            </FormErrorMessage>
        </FormControl>
    );

    const submitButton = (
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
            Reset password
        </Button>
    );

    return (
        <PageTemplate variant="auth" heading="Choose a new password.">
            <form onSubmit={handleSubmit(resetPassword)}>
                <VStack spacing="40px">
                    {passwordField}
                    {submitButton}
                </VStack>
            </form>
        </PageTemplate>
    );
}
