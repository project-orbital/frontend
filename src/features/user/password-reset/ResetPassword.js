import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Spacer,
    useToast,
    VStack,
} from "@chakra-ui/react";

export default function ResetPassword() {
    // === === ===
    // Hooks.
    const { userId, resetString } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    // === === ===
    // Form handling.

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
            .catch((err) => errorToast(err.response.data))
            .then((res) => {
                if (res.status === 200) {
                    toast.closeAll();
                    navigate("/reset-password-success");
                }
            });
    }

    function errorToast(message) {
        toast({
            title: "We could not reset your password",
            description: message,
            status: "error",
            isClosable: true,
        });
    }

    // === === ===
    // Form fields.
    const passwordField = (
        <FormControl isInvalid={errors.password} w="60%">
            <FormLabel htmlFor="password">Password</FormLabel>
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

    // === === ===
    // Form component.
    const submitButton = (
        <Button
            isLoading={isSubmitting}
            type="submit"
            h="60px"
            w="100%"
            bg="black"
            color="white"
        >
            Submit
        </Button>
    );

    return (
        <Center h="100vh" w="100vw" bg="gray.50">
            <VStack>
                <Heading as="h1">Please enter a new password</Heading>
                <Spacer p="20px" />
                <VStack
                    p="60px"
                    align="stretch"
                    borderRadius="20px"
                    bg="white"
                    shadow="lg"
                >
                    <form onSubmit={handleSubmit(resetPassword)}>
                        <VStack align="stretch">
                            {passwordField}
                            <Spacer />
                            <VStack>
                                {submitButton}
                                <Spacer />
                            </VStack>
                        </VStack>
                    </form>
                </VStack>
            </VStack>
        </Center>
    );
}
