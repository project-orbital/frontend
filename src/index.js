import { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import { ChakraProvider, CSSReset, extendTheme, Heading } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Dashboard from "./routes/Dashboard";
import EmailSent from "./routes/EmailSent";
import VerifyEmail from "./routes/VerifyEmail";
import EmailVerified from "./routes/EmailVerified";
import RequestPasswordReset from "./routes/RequestPasswordReset";
import PasswordResetEmailSent from "./routes/PasswordResetEmailSent";
import ResetPasswordSuccess from "./routes/ResetPasswordSuccess";
import ResetPassword from "./routes/ResetPassword";

const theme = extendTheme({
    // Theme extensions go here.
})

const element = <StrictMode>
    <ChakraProvider theme={theme}>
        <CSSReset />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="email-sent" element={<EmailSent />} />
                <Route path="email-verified" element={<EmailVerified />} />
                <Route path="request-password-reset" element={<RequestPasswordReset />} />
                <Route path="verify/:userId/:uniqueString" element={<VerifyEmail />} />
                <Route path="*" element={<Heading>404 Not Found</Heading>} />
                <Route path="reset-password/:userId/:resetString" element={<ResetPassword />} />
                <Route path="password-reset-email-sent" element={<PasswordResetEmailSent />} />
                <Route path="reset-password-success" element={<ResetPasswordSuccess />} />
            </Routes>
        </BrowserRouter>
    </ChakraProvider>
</StrictMode>;

ReactDOM.render(element, document.getElementById('root'));
