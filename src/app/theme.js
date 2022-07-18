import { extendTheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";
import "@fontsource/dm-serif-display/400.css";

export const theme = extendTheme(
    {
        fonts: {
            heading: "DM Serif Display, serif",
        },
        semanticTokens: {
            // All these colors are color mode responsive.
            colors: {
                // The go-to primary color for backgrounds in the UI
                // (e.g. page backgrounds).
                bg: {
                    default: "#f8f8f8",
                    _dark: "#050203",
                },
                // The go-to secondary color for elements which need separation from the background
                // (e.g. cards).
                "bg-light": {
                    default: "#f3f3f3",
                    _dark: "#12070B",
                },
                "bg-lighter": {
                    default: "#F2EBEE",
                    _dark: "#12070B",
                },
                // Used for overlaying content on top of main content
                // (e.g. navigation bars).
                "bg-translucent": {
                    default: "#f8f8f8f1",
                    _dark: "#050203f1",
                },
                // The go-to primary color for text in the UI. Chakra UI's default font color
                // (i.e. without specifying a color in a prop) is also acceptable.
                fg: {
                    default: "#2a2a2a",
                    _dark: "#e1e1e1",
                },
                // The go-to secondary color for less important (but still important) text in the UI.
                "fg-light": {
                    default: "#4a4a4a",
                    _dark: "#e1e1e1",
                },
                // Background color for minor elements that need to blend into the background
                // (e.g. action buttons).
                dim: {
                    default: "#E8E8E8",
                    _dark: "#211318",
                },
                // Background color for important elements that need to stand out
                // (e.g. action buttons).
                accent: {
                    default: "#662B42",
                    _dark: "#4A1E30",
                },
                // Background color for less important (but still important) elements that need to stand out
                // (e.g. sidebar).
                "accent-dark": {
                    default: "#331D25",
                    _dark: "#24141A",
                },
                // Colors for elements with potentially destructive actions
                // (e.g. cancellation, deletion buttons).
                "bg-danger": "red.500",
                "fg-danger": "white",
                // Foreground color used for error messages.
                error: "red.500",
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
    },
    withProse({
        baseStyle: {
            h3: {
                fontFamily: "body",
            },
            h4: {
                fontFamily: "body",
            },
            blockquote: {
                color: "gray.500",
                fontSize: "sm",
                fontWeight: "normal",
                fontStyle: "normal",
            },
            a: {
                "text-decoration": "underline",
            },
        },
    })
);
