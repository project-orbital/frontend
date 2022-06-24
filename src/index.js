import { StrictMode, useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ky from "ky";
import App from "./app/App";
import SignUp from "./features/user/authentication/SignUp";
import SignIn from "./features/user/authentication/SignIn";
import Dashboard from "./features/dashboard/Dashboard";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";
import "@fontsource/dm-serif-display/400.css";
import Accounts from "./features/accounts/Accounts";
import AccountCreationModal from "./features/accounts/components/AccountCreationModal";
import Account from "./features/accounts/Account";
import AccountRenameModal from "./features/accounts/components/AccountRenameModal";
import AccountDeleteModal from "./features/accounts/components/AccountDeleteModal";
import EmailSent from "./features/user/email-verification/EmailSent";
import VerifyEmail from "./features/user/email-verification/VerifyEmail";
import EmailVerified from "./features/user/email-verification/EmailVerified";
import RequestPasswordReset from "./features/user/password-reset/RequestPasswordReset";
import PasswordResetEmailSent from "./features/user/password-reset/PasswordResetEmailSent";
import ResetPasswordSuccess from "./features/user/password-reset/ResetPasswordSuccess";
import ResetPassword from "./features/user/password-reset/ResetPassword";
import TransactionCreationModal from "./features/transactions/components/TransactionCreationModal";
import PageNotFound from "./features/errors/PageNotFound";
import Plan from "./features/planbudget/Plan";
import { PersistGate } from "redux-persist/integration/react";
import SignOut from "./features/user/authentication/SignOut";
import Learn from "./features/learn/Learn";

function RequireAuth({ children }) {
    const [isAuth, setIsAuth] = useState(); // initially undefined

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
    if (isAuth === undefined) return null;
    return isAuth ? <>{children}</> : <Navigate to="/sign-in" />;
}

const theme = extendTheme({
    fonts: {
        heading: "DM Serif Display, serif",
    },
    styles: {
        global: () => ({
            body: {
                bg: "gray.200",
            },
        }),
    },
});

const routes = (
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-out" element={<SignOut />} />
        <Route path="email-sent" element={<EmailSent />} />
        <Route path="email-verified" element={<EmailVerified />} />
        <Route
            path="request-password-reset"
            element={<RequestPasswordReset />}
        />
        <Route path="verify/:userId/:uniqueString" element={<VerifyEmail />} />
        <Route
            path="reset-password/:userId/:resetString"
            element={<ResetPassword />}
        />
        <Route
            path="password-reset-email-sent"
            element={<PasswordResetEmailSent />}
        />
        <Route
            path="reset-password-success"
            element={<ResetPasswordSuccess />}
        />
        <Route
            path="dashboard"
            element={
                <RequireAuth>
                    <Dashboard />
                </RequireAuth>
            }
        />
        <Route
            path="accounts/:id"
            element={
                <RequireAuth>
                    <Account />
                </RequireAuth>
            }
        >
            <Route path="rename" element={<AccountRenameModal />} />
            <Route path="delete" element={<AccountDeleteModal />} />
            <Route
                path="create-transaction"
                element={<TransactionCreationModal />}
            />
        </Route>
        <Route
            path="accounts"
            element={
                <RequireAuth>
                    <Accounts />
                </RequireAuth>
            }
        >
            <Route path="create" element={<AccountCreationModal />} />
        </Route>
        <Route
            path="learn"
            element={
                <RequireAuth>
                    <Learn />
                </RequireAuth>
            }
        >
            <Route path="create" element={<AccountCreationModal />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
    </Routes>
);

const element = (
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ChakraProvider theme={theme}>
                    <CSSReset />
                    <BrowserRouter>{routes}</BrowserRouter>
                </ChakraProvider>
            </PersistGate>
        </Provider>
    </StrictMode>
);

ReactDOM.render(element, document.getElementById("root"));
