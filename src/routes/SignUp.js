import {useForm} from "react-hook-form";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import Axios from "axios";
import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Spacer,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";

export default function SignUp() {
    // === === ===
    // Hooks.

    const navigate = useNavigate();
    const toast = useToast();
    const {
        setError, register, handleSubmit, formState: {errors, isSubmitting}
    } = useForm();

    // === === ===
    // Form handling.

    function signUp(values) {
        return Axios({
            method: "POST", data: {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                username: values.username,
                password: values.password,
            }, withCredentials: true, url: `${process.env.REACT_APP_BACKEND}/sign-up`,
        })
            .catch(err => errorToast(err.response.data))
            .then(res => {
                if (res.status === 200) {
                    toast.closeAll();
                    successToast();
                    setTimeout(() => {
                        navigate("/dashboard")
                        toast.closeAll();
                    }, 800);
                }
            });
    }

    function errorToast(message) {
        toast({
            title: message,
            description: "Please try again.",
            status: "error",
            isClosable: true,
        })
        setError("username", {message: message})
    }

    function successToast() {
        toast({
            title: "Success!",
            description: "Taking you to your dashboard...",
            status: "success",
            isClosable: true,
        })
    }

    // === === ===
    // Form fields.

    const firstNameField = <FormControl isInvalid={errors.firstName}>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input id="firstName"
               placeholder="John"
               {...register("firstName", {
                   required: "Please provide your first name.",
                   pattern: {value: /^[A-Za-z ]+$/i, message: "No numbers or symbols are allowed."}
               })}/>
        <FormErrorMessage color="red.500">{errors.firstName && errors.firstName.message}</FormErrorMessage>
    </FormControl>

    const lastNameField = <FormControl isInvalid={errors.lastName}>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input id="lastName"
               placeholder="Doe"
               {...register("lastName", {
                   required: "Please provide your last name.",
                   pattern: {value: /^[A-Za-z ]+$/i, message: "No numbers or symbols are allowed."}
               })}/>
        <FormErrorMessage color="red.500">{errors.lastName && errors.lastName.message}</FormErrorMessage>
    </FormControl>

    const emailField = <FormControl isInvalid={errors.email} w="80%">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email"
               placeholder="someone@example.com"
               {...register("email", {
                   required: "Please provide your email address.",
                   // This regex pattern isn't a substitute for email validation, but it will stop most invalid emails from being entered.
                   // https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
                   pattern: {value: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/, message: "Invalid email address."}
               })}/>
        <FormErrorMessage color="red.500">{errors.email && errors.email.message}</FormErrorMessage>
    </FormControl>

    const usernameField = <FormControl isInvalid={errors.username} w="60%">
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input id="username"
               placeholder="john_doe"
               {...register("username", {
                   required: "Please provide a username.",
               })}/>
        <FormErrorMessage color="red.500">{errors.username && errors.username.message}</FormErrorMessage>
    </FormControl>

    const passwordField = <FormControl isInvalid={errors.password} w="50%">
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input id="password"
               placeholder="••••••••"
               type="password"
               {...register("password", {
                   required: "Please provide a password.",
                   minLength: {value: 8, message: "Password must be at least 8 characters long."}
               })}/>
        <FormErrorMessage color="red.500">{errors.password && errors.password.message}</FormErrorMessage>
    </FormControl>

    const submitButton = <Button isLoading={isSubmitting} type='submit' h="60px" w="100%" bg="black" color="white">
        Create your account
    </Button>

    const signInLink = <Text>
        Already have an account?{' '}
        <Link as={RouterLink} to='/sign-in' color="blue.500">Sign in ►</Link>
    </Text>

    // === === ===
    // Form component.

    return (<Center h="100vh" w="100vw" bg="gray.50">
        <VStack>
            <Heading as="h1" noOfLines="1">Create your DollarPlanner account</Heading>
            <Spacer p="20px"/>
            <VStack p="60px" align="stretch" borderRadius="20px" bg="white" shadow="lg">
                <form onSubmit={handleSubmit(signUp)}>
                    <VStack spacing="20px" align="stretch">
                        <HStack spacing="20px" align="flex-start">
                            {firstNameField}
                            {lastNameField}
                        </HStack>
                        {emailField}
                        {usernameField}
                        {passwordField}
                        <Spacer/>
                        <VStack>
                            {submitButton}
                            <Spacer/>
                            {signInLink}
                        </VStack>
                    </VStack>
                </form>
            </VStack>
        </VStack>
    </Center>)
}
