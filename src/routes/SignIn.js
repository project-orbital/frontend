import {useForm} from "react-hook-form";
import {Link as RouterLink, useNavigate} from "react-router-dom"
import Axios from "axios";
import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Link,
    Spacer,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";

export default function SignIn() {
    // === === ===
    // Hooks.

    const navigate = useNavigate();
    const toast = useToast();
    const {
        setError, register, handleSubmit, formState: {errors, isSubmitting}
    } = useForm();

    // === === ===
    // Form handling.

    function signIn(values) {
        return Axios({
            method: "POST", data: {
                username: values.username,
                password: values.password,
                verified: values.verified,
            }, withCredentials: true, url:`${process.env.REACT_APP_BACKEND}/sign-in`,
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
        setError("username", {message: "Invalid username/password."})
        setError("password", {message: "Invalid username/password."})
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

    const usernameField = <FormControl isInvalid={errors.username}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input id="username"
               placeholder="john_doe"
               {...register("username", {
                   required: "Please enter a username.",
               })}/>
        <FormErrorMessage color="red.500">{errors.username && errors.username.message}</FormErrorMessage>
    </FormControl>

    const passwordField = <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input id="password"
               placeholder="••••••••" type="password"
               {...register("password", {
                   required: "Please enter a password.",
               })}/>
        <FormErrorMessage color="red.500">{errors.password && errors.password.message}</FormErrorMessage>
    </FormControl>

    const submitButton = <Button isLoading={isSubmitting} type='submit' h="60px" w="100%" bg="black" color="white">
        Sign in
    </Button>

    const signUpLink = <Text>
        New to DollarPlanner?{' '}
        <Link as={RouterLink} to='/sign-up' color="blue.500">Create an account ►</Link>
    </Text>

    const forgetPasswordLink = <Text>
        Forgotten Password?{' '}
        <Link as={RouterLink} to='/request-password-reset' color="blue.500">Reset password ►</Link>
    </Text> 

    // === === ===
    // Form component.

    return <Center h="100vh" w="100vw" bg="gray.50">
        <VStack>
            <Heading as="h1">Sign in to your DollarPlanner account</Heading>
            <Spacer p="20px"/>
            <VStack p="60px" align="stretch" borderRadius="20px" bg="white" shadow="lg">
                <form onSubmit={handleSubmit(signIn)}>
                    <VStack spacing="20px" align="stretch">
                        {usernameField}
                        {passwordField}
                        <Spacer/>
                        <VStack>
                            {submitButton}
                            <Spacer/>
                            {signUpLink}
                            {forgetPasswordLink}
                        </VStack>
                    </VStack>
                </form>
            </VStack>
        </VStack>
    </Center>
}
