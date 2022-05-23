import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {ChakraProvider, CSSReset, extendTheme} from "@chakra-ui/react"

import App from "./App";

const theme = extendTheme({
    // Theme extensions go here.
})

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <ChakraProvider theme={theme}>
            <CSSReset/>
            <App/>
        </ChakraProvider>
    </StrictMode>
);
