import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Link,
    Spacer,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import ky from "ky";
import PageTemplate from "../../../common/components/PageTemplate";

export default function SignUp() {
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

    async function signUp(values) {
        const url = `${process.env.REACT_APP_BACKEND}/users/sign-up`;
        try {
            await ky.post(url, { json: values });
            navigate("/email-sent");
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
            if (cause === "email") {
                setError("email", { message: resolution });
            }
        }
    }

    // === === ===
    // Form fields.

    const firstNameField = (
        <FormControl isInvalid={errors.firstName}>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
                id="firstName"
                placeholder="John"
                {...register("firstName", {
                    required: "Please provide your first name.",
                    pattern: {
                        value: /^[A-Za-z ]+$/i,
                        message: "No numbers or symbols are allowed.",
                    },
                })}
            />
            <FormErrorMessage color="red.500">
                {errors.firstName && errors.firstName.message}
            </FormErrorMessage>
        </FormControl>
    );

    const lastNameField = (
        <FormControl isInvalid={errors.lastName}>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
                id="lastName"
                placeholder="Doe"
                {...register("lastName", {
                    required: "Please provide your last name.",
                    pattern: {
                        value: /^[A-Za-z ]+$/i,
                        message: "No numbers or symbols are allowed.",
                    },
                })}
            />
            <FormErrorMessage color="red.500">
                {errors.lastName && errors.lastName.message}
            </FormErrorMessage>
        </FormControl>
    );

    const emailField = (
        <FormControl isInvalid={errors.email} w="80%">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
                id="email"
                placeholder="someone@example.com"
                {...register("email", {
                    required: "Please provide your email address.", // This regex pattern isn't a substitute for email validation, but it will stop most invalid emails from being entered.
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

    const usernameField = (
        <FormControl isInvalid={errors.username} w="60%">
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
                id="username"
                placeholder="john_doe"
                {...register("username", {
                    required: "Please provide a username.",
                })}
            />
            <FormErrorMessage color="red.500">
                {errors.username && errors.username.message}
            </FormErrorMessage>
        </FormControl>
    );

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
            Create your account
        </Button>
    );

    const signInLink = (
        <Text>
            Already have an account?{" "}
            <Link as={RouterLink} to="/sign-in">
                Sign in ►
            </Link>
        </Text>
    );

    // === === ===
    // Form component.

    return (
        <PageTemplate
            variant="auth"
            heading="Create your DollarPlanner account"
        >
            <form onSubmit={handleSubmit(signUp)}>
                <VStack spacing="20px" align="stretch">
                    <HStack spacing="20px" align="flex-start">
                        {firstNameField}
                        {lastNameField}
                    </HStack>
                    {emailField}
                    {usernameField}
                    {passwordField}
                    <Spacer />
                    <VStack>
                        {submitButton}
                        <Spacer />
                        {signInLink}
                    </VStack>
                </VStack>
            </form>
        </PageTemplate>
    );
}
