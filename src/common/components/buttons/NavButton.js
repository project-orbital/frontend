import { Box, Button, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsFillCaretRightFill } from "react-icons/bs";

/**
 * A button which navigates to the specified route when clicked.
 *
 * The background color of the button defaults to the accent color of the app.
 * To override this, pass a custom background color to the `bg` prop.
 *
 * @param to the route to navigate to
 * @param text the text to display on the button
 * @param icon an optional icon to display to the left of the button text
 * @param withArrow `true` to display a right arrow icon in the button text, `false` otherwise
 * @param color (optional, default: "white") the color of the text on the button
 * @param variant (optional, default: "primary") "primary", "secondary", "tertiary", "danger"
 * @param fontWeight (optional) the font weight of the text on the button
 * @param fontSize (optional) the font size of the text on the button
 * @param children (optional) the body of the button
 * @param props (optional) the style props to pass to the Chakra UI button
 * @return the button
 */
export default function NavButton({
    to,
    icon,
    text,
    withArrow,
    color,
    variant = "primary",
    fontWeight,
    fontSize,
    children,
    ...props
}) {
    const { colorMode } = useColorMode();
    let buttonProps = {};
    let textProps = {};

    if (variant === "primary") {
        buttonProps = {
            bgGradient: "linear(to-br, accent, accent-dark)",
            color: "white",
            shadow: colorMode === "light" ? "2px 4px 20px 0px #662B4244" : null,
            _hover: { transform: "scale(1.05)" },
        };
        textProps = { color: "white" };
    } else if (variant === "secondary") {
        buttonProps = {
            bg: "bg",
            _hover: { transform: "scale(1.05)" },
        };
        textProps = { color: "fg" };
    } else if (variant === "tertiary") {
        buttonProps = {
            h: 10,
            p: 4,
            bg: "none",
            color: "gray.200",
            _hover: {
                transform: "scale(1.05)",
                bg: "whiteAlpha.50",
            },
            _active: {
                bg: "none",
                color: "gray.400",
            },
        };
        textProps = { color: "gray.200" };
    } else if (variant === "danger") {
        buttonProps = {
            bg: "bg-danger",
            color: "fg-danger",
            _hover: { transform: "scale(1.05)" },
        };
        textProps = { color: "fg-danger" };
    }

    // noinspection JSValidateTypes
    return (
        <Button
            as={Link}
            to={to}
            px={16}
            py={8}
            rightIcon={withArrow && <BsFillCaretRightFill />}
            transition="transform .1s"
            {...buttonProps}
            {...props}
        >
            {icon && <Box pr="8px">{icon}</Box>}
            <Text
                {...textProps}
                fontWeight={fontWeight}
                fontSize={fontSize}
                color={color}
            >
                {children ?? text}
            </Text>
        </Button>
    );
}
