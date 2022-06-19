import { Heading, Text, useToast, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function VerifyEmail() {
    const navigate = useNavigate();
    const toast = useToast();
    const { userId, uniqueString } = useParams();

    useEffect(() => {
        function errorToast(message) {
            toast({
                title: "We couldn't verify your email.",
                description: message,
                status: "error",
                duration: null,
                isClosable: false,
            });
        }

        function successToast() {
            toast({
                title: "Success!",
                description: "Taking you to your dashboard...",
                status: "success",
                isClosable: true,
            });
        }

        axios
            .post(`${process.env.REACT_APP_BACKEND}/verify`, {
                userId: userId,
                uniqueString: uniqueString,
            })
            .catch((err) => {
                console.log(err);
                errorToast(err.response.data || "Something went wrong.");
            })
            .then((res) => {
                console.log("Successfully verified email.");
                if (res.status === 200) {
                    successToast();
                    navigate("/email-verified");
                } else {
                    errorToast(res.data.message);
                }
            });
    });

    return (
        <VStack h="100vh" w="100vw" justify="center" bg="gray.200">
            <VStack
                p="60px"
                align="center"
                borderRadius="20px"
                bg="white"
                shadow="sm"
            >
                <Heading as="h1">Give us a moment...</Heading>
                <Text>We're checking the validity of this link.</Text>
            </VStack>
        </VStack>
    );
}
