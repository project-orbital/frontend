import { Button } from "@chakra-ui/react";
import { BsFillCaretRightFill } from "react-icons/bs";

/**
 * A pre-styled button for submit actions with a right arrow icon.
 *
 * The text on the submit button can (and should) be customized with the `text`
 * prop to provide more contextual information about the action.
 *
 * By default, the act of submitting is assumed to be non-destructive.
 * However, this can be overridden by passing the `isDestructive` prop.
 * Use this sparingly, though, as few actions are actually destructive.
 * As a general rule of thumb, it the action this button would trigger can be undone,
 * then this button should *not* be marked as destructive.
 *
 * @param isDestructive whether the action is destructive
 * @param text (optional, default: "Submit") the text to display on the button
 * @param props the style props to pass to Chakra UI's button component
 * @return {JSX.Element}
 */
export default function SubmitButton({ text, isDestructive, ...props }) {
    return (
        <Button
            type="submit"
            h="60px"
            w="100%"
            bg={isDestructive ? "bg-danger" : "dim"}
            color={isDestructive ? "fg-danger" : "fg"}
            rightIcon={<BsFillCaretRightFill />}
            transition="transform .08s"
            _hover={{
                transform: "scale(1.06)",
            }}
            {...props}
        >
            {text || "Submit"}
        </Button>
    );
}
