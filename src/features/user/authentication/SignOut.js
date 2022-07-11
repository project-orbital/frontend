import { useCallback, useEffect } from "react";
import ky from "ky";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import LandingPage from "../../landing/LandingPage";
import { useDispatch, useSelector } from "react-redux";
import { selectDataSync, signOut } from "../../settings/state/preferences";

export default function SignOut() {
    const dispatch = useDispatch();
    const dataSync = useSelector(selectDataSync);
    const navigate = useNavigate();
    const toast = useToast();
    const id = "sign-out";

    const action = useCallback(() => {
        navigate("/");
        // Only clear localStorage if the user is synchronizing data with the server.
        // If we didn't do this check, they would lose all their data!
        if (dataSync) {
            dispatch(signOut());
        }
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
            });
    }, [navigate, toast, dispatch, dataSync]);

    useEffect(() => {
        action();
    }, [action]);
    return <LandingPage />;
}
