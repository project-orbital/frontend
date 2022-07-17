const React = require("react");
const { render } = require("@testing-library/react");
const { ChakraProvider } = require("@chakra-ui/react");
const { theme } = require("../src/app/theme");

const Providers = ({ children }) => {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

const customRender = (ui, options) =>
    render(ui, { wrapper: Providers, ...options });

module.exports = customRender;
