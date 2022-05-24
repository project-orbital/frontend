import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {ChakraProvider, CSSReset, extendTheme, Heading} from "@chakra-ui/react"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

const theme = extendTheme({
    // Theme extensions go here.
})

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<StrictMode>
    <ChakraProvider theme={theme}>
        <CSSReset/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="sign-up" element={<SignUp/>}/>
                <Route path="sign-in" element={<SignIn/>}/>
                <Route path="*" element={<Heading>404 Not Found</Heading>}/>
            </Routes>
        </BrowserRouter>
    </ChakraProvider>
</StrictMode>);
