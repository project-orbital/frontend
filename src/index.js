import {StrictMode} from "react";
import * as ReactDOM from "react-dom";
import {ChakraProvider, CSSReset, extendTheme, Heading} from "@chakra-ui/react"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Dashboard from "./routes/Dashboard";
import store from "./states/store";
import {Provider} from "react-redux";

const theme = extendTheme({
    // Theme extensions go here.
})

const element = <StrictMode>
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <CSSReset/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="sign-up" element={<SignUp/>}/>
                    <Route path="sign-in" element={<SignIn/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="*" element={<Heading>404 Not Found</Heading>}/>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    </Provider>
</StrictMode>;

ReactDOM.render(element, document.getElementById('root'));
