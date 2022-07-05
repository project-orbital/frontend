import { StrictMode, useEffect, useState } from "react";
import * as ReactDOMClient from "react-dom/client";
import {
    ChakraProvider,
    ColorModeScript,
    CSSReset,
    extendTheme,
} from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ky from "ky";
import SignUp from "./features/user/authentication/SignUp";
import SignIn from "./features/user/authentication/SignIn";
import Dashboard from "./features/dashboard/Dashboard";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";
import "@fontsource/dm-serif-display/400.css";
import Accounts from "./features/accounts/Accounts";
import AccountCreationModal from "./features/accounts/components/AccountCreationModal";
import Account from "./features/account/Account";
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
import TransactionDeletionModal from "./features/transactions/components/TransactionDeletionModal";
import PageNotFound from "./features/errors/PageNotFound";
import Plan from "./features/plan/Plan";
import { PersistGate } from "redux-persist/integration/react";
import SignOut from "./features/user/authentication/SignOut";
import Learn from "./features/learn/Learn";
import LandingPage from "./features/landing/LandingPage";
import Settings from "./features/settings/Settings";
import Portfolio from "./features/portfolio/Portfolio";
import DisclaimerModal from "./features/account/components/DisclaimerModal";
import UploadModal from "./features/account/components/UploadModal";
import ReviewModal from "./features/account/components/ReviewModal";
import ConfirmCancelModal from "./features/account/components/ConfirmCancelModal";

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
    semanticTokens: {
        colors: {
            error: "red.500",
            fg: {
                default: "#2a2a2a",
                _dark: "#e1e1e1",
            },
            "fg-light": {
                default: "#4a4a4a",
                _dark: "#e1e1e1",
            },
            bg: {
                default: "#f8f8f8",
                _dark: "#050203",
            },
            "bg-translucent": {
                default: "#f8f8f8f1",
                _dark: "#050203f1",
            },
            "bg-light": {
                default: "#f3f3f3",
                _dark: "#12070B",
            },
            accent: {
                default: "#662B42",
                _dark: "#4A1E30",
            },
            "accent-dark": {
                default: "#331D25",
                _dark: "#24141A",
            },
            dim: {
                default: "#E8E8E8",
                _dark: "#211318",
            },
        },
    },
    styles: {
        global: () => ({
            body: {
                bg: "bg",
            },
        }),
    },
    config: {
        initialColorMode: "light",
        useSystemColorMode: true,
    },
});

const routes = (
    <Routes>
        <Route path="/" element={<LandingPage />} />
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
            path="accounts/:id"
            element={
                <RequireAuth>
                    <Account />
                </RequireAuth>
            }
        >
            <Route path="upload-disclaimer" element={<DisclaimerModal />} />
            <Route path="upload-files" element={<UploadModal />} />
            <Route path="upload-review" element={<ReviewModal />}>
                <Route path="cancel" element={<ConfirmCancelModal />} />
            </Route>
            <Route path="rename" element={<AccountRenameModal />} />
            <Route path="delete" element={<AccountDeleteModal />} />
            <Route
                path="create-spending-transaction"
                element={<TransactionCreationModal isSpending={true} />}
            />
            <Route
                path="create-receiving-transaction"
                element={<TransactionCreationModal isSpending={false} />}
            />
            <Route
                path="delete-transaction"
                element={<TransactionDeletionModal />}
            />
        </Route>
        <Route
            path="learn"
            element={
                <RequireAuth>
                    <Learn />
                </RequireAuth>
            }
        />
        <Route
            path="portfolio"
            element={
                <RequireAuth>
                    <Portfolio />
                </RequireAuth>
            }
        />
        <Route
            path="settings"
            element={
                <RequireAuth>
                    <Settings />
                </RequireAuth>
            }
        />
        <Route path="plan" element={<Plan />} />
        <Route path="*" element={<PageNotFound />} />
    </Routes>
);

const element = (
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ChakraProvider theme={theme}>
                    <CSSReset />
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <BrowserRouter>{routes}</BrowserRouter>
                </ChakraProvider>
            </PersistGate>
        </Provider>
    </StrictMode>
);

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(element);
