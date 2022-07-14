import { useEffect, useState } from "react";
import ky from "ky";
import { Navigate } from "react-router-dom";
import PageTemplate from "./PageTemplate";

export default function RequireAuth({ children }) {
    const [isAuth, setIsAuth] = useState(undefined);

    useEffect(() => {
        ky.get(`${process.env.REACT_APP_BACKEND}/users/authenticate`, {
            credentials: "include",
        })
            .then(() => {
                setIsAuth(true);
            })
            .catch(() => {
                setIsAuth(false);
            });
    }, []);
    if (isAuth === undefined) return <PageTemplate />;
    return isAuth ? <>{children}</> : <Navigate to="/sign-in" />;
}