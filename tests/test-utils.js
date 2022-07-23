import React from "react";
import { render } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../src/app/theme";

const Providers = ({ children }) => {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

const customRender = (ui, options) =>
    render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
