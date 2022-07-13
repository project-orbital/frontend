import { Button } from "@chakra-ui/react";

/**
 * A pre-styled button for cancelling actions.
 *
 * The text on the cancel button can (and should) be customized with the `text`
 * prop to provide more contextual information about the action.
 *
 * By default, the act of cancelling an action is assumed to be destructive.
 * However, this can be overridden by passing the `isNonDestructive` prop,
 * which is useful in the case that the action which would otherwise be cancelled
 * is more destructive.
 * Use this sparingly, though, as few actions are actually more destructive.
 * As a general rule of thumb, it the action this button would cancel can be undone,
 * then this button should *not* be marked as non-destructive.
 *
 * @param isNonDestructive whether the action is non-destructive
 * @param text (optional, default: "Cancel") the text to display on the button
 * @param props the style props to pass to Chakra UI's button component
 * @return {JSX.Element}
 */
export default function CancelButton({ isNonDestructive, text, ...props }) {
    return (
        <Button
            h="60px"
            w="100%"
            bg={isNonDestructive ? "dim" : "bg-danger"}
            color={isNonDestructive ? "fg" : "fg-danger"}
            transition="transform .08s"
            _hover={{
                transform: "scale(1.06)",
            }}
            {...props}
        >
            {text || "Cancel"}
        </Button>
    );
}
