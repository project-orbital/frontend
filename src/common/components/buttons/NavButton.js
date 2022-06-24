import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsFillCaretRightFill } from "react-icons/bs";

/**
 * A button which navigates to the specified route when clicked.
 *
 * @param to the route to navigate to
 * @param text the text to display on the button
 * @param withArrow `true` to display a right arrow icon in the button text, `false` otherwise
 * @return the button
 */
export default function NavButton({
    to,
    text,
    withArrow,
    h,
    w,
    bg,
    c,
    fw,
    fs,
    zIndex,
}) {
    const navigate = useNavigate();
    return (
        <Button
            h={h || "60px"}
            w={w}
            bg={bg}
            onClick={() => navigate(to)}
            zIndex={zIndex}
            rightIcon={withArrow && <BsFillCaretRightFill />}
            transition="transform .1s"
            _hover={{
                transform: "scale(1.08)",
            }}
        >
            <Text color={c} fontWeight={fw} fontSize={fs}>
                {text}
            </Text>
        </Button>
    );
}
