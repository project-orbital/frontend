import { useEffect } from "react";
import ky from "ky";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import App from "../../../app/App";

export default function SignOut() {
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        ky.get(`${process.env.REACT_APP_BACKEND}/users/sign-out`, {
            credentials: "include",
        })
            .then(() => {
                toast({
                    title: "Goodbye!",
                    description: "You have signed out successfully.",
                    status: "success",
                    isClosable: true,
                });
                navigate("/");
            })
            .catch(() => {
                toast({
                    title: "Goodbye!",
                    description: "You have signed out unsuccessfully.",
                    status: "error",
                    isClosable: true,
                });
                navigate("/");
            });
    });
    return <App />;
}
