import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
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
    fontWeight,
    fontSize,
    ...props
}) {
    const navigate = useNavigate();
    return (
        <Button
            h="60px"
            bg="accent"
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
                color={color || "white"}
                fontWeight={fontWeight}
                fontSize={fontSize}
            >
                {text}
            </Text>
        </Button>
    );
}
