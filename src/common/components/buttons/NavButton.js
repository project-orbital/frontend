import { Box, Button, Text, useColorMode } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
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
 * @param fontWeight (optional) the font weight of the text on the button
 * @param fontSize (optional) the font size of the text on the button
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
    const navigate = useNavigate();
    const { colorMode } = useColorMode();

    if (variant === "primary") {
        return (
            <Button
                h="60px"
                px={16}
                py={8}
                bgGradient="linear(to-br, accent, accent-dark)"
                shadow={
                    colorMode === "light" ? "2px 4px 20px 0px #662B4244" : null
                }
                zIndex={4}
                onClick={() => navigate(to)}
                rightIcon={withArrow && <BsFillCaretRightFill />}
                transition="transform .1s"
                _hover={{
                    transform: "scale(1.05)",
                }}
                {...props}
            >
                {icon && <Box pr="8px">{icon}</Box>}
                <Text color="white" fontWeight={fontWeight} fontSize={fontSize}>
                    {text}
                </Text>
            </Button>
        );
    }

    if (variant === "secondary") {
        return (
            <Button
                h="60px"
                px={16}
                py={8}
                bg="bg"
                zIndex={4}
                onClick={() => navigate(to)}
                rightIcon={withArrow && <BsFillCaretRightFill />}
                transition="transform .1s"
                _hover={{
                    transform: "scale(1.05)",
                }}
            >
                {icon && <Box pr="8px">{icon}</Box>}
                <Text color="fg" fontWeight={fontWeight} fontSize={fontSize}>
                    {text}
                </Text>
            </Button>
        );
    }

    if (variant === "tertiary") {
        return (
            <Button
                as={Link}
                to={to}
                h={10}
                p={4}
                bg="none"
                color="gray.200"
                zIndex={4}
                transition="transform .1s"
                _hover={{
                    transform: "scale(1.05)",
                    bg: "whiteAlpha.50",
                }}
                _active={{
                    bg: "none",
                    color: "gray.400",
                }}
                {...props}
            >
                {children}
            </Button>
        );
    }

    if (variant === "danger") {
        return (
            <Button
                h="60px"
                px={16}
                py={8}
                bg="bg-danger"
                zIndex={4}
                onClick={() => navigate(to)}
                rightIcon={withArrow && <BsFillCaretRightFill />}
                transition="transform .1s"
                _hover={{
                    transform: "scale(1.05)",
                }}
            >
                {icon && <Box pr="8px">{icon}</Box>}
                <Text
                    color="fg-danger"
                    fontWeight={fontWeight}
                    fontSize={fontSize}
                >
                    {text}
                </Text>
            </Button>
        );
    }

    return (
        <Button
            h="60px"
            px={12}
            py={8}
            bg={variant === "primary" ? "accent" : "dim"}
            onClick={() => navigate(to)}
            rightIcon={withArrow && <BsFillCaretRightFill />}
            transition="transform .1s"
            _hover={{
                transform: "scale(1.05)",
            }}
            {...props}
        >
            {icon && <Box pr="8px">{icon}</Box>}
            <Text
                color={color ?? variant === "primary" ? "white" : "fg"}
                fontWeight={fontWeight}
                fontSize={fontSize}
            >
                {text}
            </Text>
        </Button>
    );
}
