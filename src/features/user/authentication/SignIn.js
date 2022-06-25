import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Link,
    Spacer,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import ky from "ky";
import PageTemplate from "../../../common/components/PageTemplate";

export default function SignIn() {
    // === === ===
    // Hooks.

    const navigate = useNavigate();
    const toast = useToast();
    const {
        setError,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    // === === ===
    // Form handling.

    async function signIn(values) {
        const url = `${process.env.REACT_APP_BACKEND}/users/sign-in`;
        try {
            await ky.post(url, { json: values, credentials: "include" });
            navigate("/dashboard");
        } catch (error) {
            if (!error.response) {
                toast({
                    title: "Something went wrong.",
                    description: "Please try again.",
                    status: "error",
                    isClosable: true,
                });
                return;
            }
            const { cause, reason, resolution } = await error.response.json();
            toast({
                title: reason,
                description: resolution,
                status: "error",
                isClosable: true,
            });
            if (cause === "credentials") {
                setError("username", {
                    message: reason,
                });
                setError("password", {
                    message: reason,
                });
            } else if (cause === "username") {
                setError("username", {
                    message: reason,
                });
            }
        }
    }

    // === === ===
    // Form fields.

    const usernameField = (
        <FormControl isInvalid={errors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
                id="username"
                placeholder="john_doe"
                {...register("username", {
                    required: "Please enter a username.",
                })}
            />
            <FormErrorMessage color="red.500">
                {errors.username && errors.username.message}
            </FormErrorMessage>
        </FormControl>
    );

    const passwordField = (
        <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
                id="password"
                placeholder="••••••••"
                type="password"
                {...register("password", {
                    required: "Please enter a password.",
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
            Sign in
        </Button>
    );

    const signUpLink = (
        <Text>
            New to DollarPlanner?{" "}
            <Link as={RouterLink} to="/sign-up">
                Create an account ►
            </Link>
        </Text>
    );

    const forgetPasswordLink = (
        <Text>
            Forgot your password?{" "}
            <Link as={RouterLink} to="/request-password-reset">
                Reset password ►
            </Link>
        </Text>
    );

    // === === ===
    // Form component.

    return (
        <PageTemplate
            variant="auth"
            heading="Sign in to your DollarPlanner account."
        >
            <form onSubmit={handleSubmit(signIn)}>
                <VStack spacing="20px">
                    {usernameField}
                    {passwordField}
                    <Spacer />
                    <VStack>
                        {submitButton}
                        <Spacer />
                        {signUpLink}
                        {forgetPasswordLink}
                    </VStack>
                </VStack>
            </form>
        </PageTemplate>
    );
}
