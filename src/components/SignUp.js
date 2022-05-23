import {useForm} from "react-hook-form";
import {useState} from "react";
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
    Spacer,
    VStack
} from "@chakra-ui/react";

export default function HelloWorld() {
    // === === ===
    // States.

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // === === ===
    // Form handling.

    function signUp() {
        return Axios({
            method: "POST", data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: password,
            }, withCredentials: true, url: "http://localhost:4000/sign-up",
        }).then((res) => console.log(res));
    }

    const {
        register, handleSubmit, formState: {errors, isSubmitting}
    } = useForm();

    // === === ===
    // Form fields.

    const firstNameField = <FormControl isInvalid={errors.firstName}>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input id="firstName" placeholder="John"
               onChange={e => setFirstName(e.target.value)} {...register("firstName", {
            required: "Please provide your first name.",
            pattern: {value: /^[A-Za-z ]+$/i, message: "No numbers or symbols are allowed."}
        })}/>
        <FormErrorMessage color="red.500">{errors.firstName && errors.firstName.message}</FormErrorMessage>
    </FormControl>

    const lastNameField = <FormControl isInvalid={errors.lastName}>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input id="lastName" placeholder="Doe" onChange={e => setLastName(e.target.value)} {...register("lastName", {
            required: "Please provide your last name.",
            pattern: {value: /^[A-Za-z ]+$/i, message: "No numbers or symbols are allowed."}
        })}/>
        <FormErrorMessage color="red.500">{errors.lastName && errors.lastName.message}</FormErrorMessage>
    </FormControl>

    const emailField = <FormControl isInvalid={errors.email} w="80%">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" placeholder="someone@example.com"
               onChange={e => setEmail(e.target.value)} {...register("email", {
            required: "Please provide your email address.",
            // This regex pattern isn't a substitute for email validation, but it will stop most invalid emails from being entered.
            // https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
            pattern: {value: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/, message: "Invalid email address."}
        })}/>
        <FormErrorMessage color="red.500">{errors.email && errors.email.message}</FormErrorMessage>
    </FormControl>

    const usernameField = <FormControl isInvalid={errors.username} w="60%">
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input id="username" placeholder="john_doe"
               onChange={e => setUsername(e.target.value)} {...register("username", {
            required: "Please provide a username.",
        })}/>
        <FormErrorMessage color="red.500">{errors.username && errors.username.message}</FormErrorMessage>
    </FormControl>

    const passwordField = <FormControl isInvalid={errors.password} w="50%">
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input id="password" placeholder="••••••••" type="password"
               onChange={e => setPassword(e.target.value)} {...register("password", {
            required: "Please provide a password.",
            minLength: {value: 8, message: "Password must be at least 8 characters long."}
        })}/>
        <FormErrorMessage color="red.500">{errors.password && errors.password.message}</FormErrorMessage>
    </FormControl>

    const submitButton = <Button isLoading={isSubmitting} type='submit' h="60px" w="100%" bg="black" color="white">
        Create your account
    </Button>

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
                        {submitButton}
                    </VStack>
                </form>
            </VStack>
        </VStack>
    </Center>)
}
