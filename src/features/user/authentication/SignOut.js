import { useCallback, useEffect } from "react";
import ky from "ky";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import LandingPage from "../../landing/LandingPage";

export default function SignOut() {
    const navigate = useNavigate();
    const toast = useToast();
    const id = "sign-out";

    const signOut = useCallback(() => {
        ky.get(`${process.env.REACT_APP_BACKEND}/users/sign-out`, {
            credentials: "include",
        })
            .then(() => {
                if (!toast.isActive(id)) {
                    toast({
                        id,
                        title: "Goodbye!",
                        description: "You have signed out successfully.",
                        status: "success",
                        isClosable: true,
                    });
                }
                navigate("/");
            })
            .catch(() => {
                if (!toast.isActive(id)) {
                    toast({
                        id,
                        title: "Goodbye!",
                        description: "You have signed out unsuccessfully.",
                        status: "error",
                        isClosable: true,
                    });
                }
                navigate("/");
            });
    }, [navigate, toast]);

    useEffect(() => {
        signOut();
    }, [signOut]);
    return <LandingPage />;
}
