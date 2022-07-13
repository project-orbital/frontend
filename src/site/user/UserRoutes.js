import { Route, Routes } from "react-router-dom";
import LandingPage from "../landing/LandingPage";
import SignUp from "./authentication/SignUp";
import SignIn from "./authentication/SignIn";
import SignOut from "./authentication/SignOut";
import EmailSent from "./email-verification/EmailSent";
import EmailVerified from "./email-verification/EmailVerified";
import RequestPasswordReset from "./password-reset/RequestPasswordReset";
import VerifyEmail from "./email-verification/VerifyEmail";
import ResetPassword from "./password-reset/ResetPassword";
import PasswordResetEmailSent from "./password-reset/PasswordResetEmailSent";
import ResetPasswordSuccess from "./password-reset/ResetPasswordSuccess";
import PageNotFound from "../errors/PageNotFound";

export default function UserRoutes() {
    return (
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
            <Route
                path="verify/:userId/:uniqueString"
                element={<VerifyEmail />}
            />
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
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}
