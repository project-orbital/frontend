import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import LandingPage from "../../landing/LandingPage";
import { useSignOutMutation } from "../../../app/api";

export default function SignOut() {
    const [signOut] = useSignOutMutation();
    const navigate = useNavigate();
    const toast = useToast();
    const id = "sign-out";
    const action = useCallback(() => {
        navigate("/");
        try {
            signOut();
            if (!toast.isActive(id)) {
                toast({
                    id,
                    title: "Goodbye!",
                    description: "You have signed out successfully.",
                    status: "success",
                    isClosable: true,
                });
            }
        } catch {
            if (!toast.isActive(id)) {
                toast({
                    id,
                    title: "Goodbye!",
                    description: "You have signed out unsuccessfully.",
                    status: "error",
                    isClosable: true,
                });
            }
        }
    }, [navigate, toast, signOut]);

    useEffect(() => {
        action();
    }, [action]);
    return <LandingPage />;
}
