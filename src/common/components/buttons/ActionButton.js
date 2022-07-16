import { Button } from "@chakra-ui/react";
import { useState } from "react";

/**
 * A button with a customizable delay.
 *
 * @param onClick the callback to call when the button is clicked
 * @param delay (optional) the delay in milliseconds before the callback is called
 * @param children the elements, e.g. text, to display on the button
 * @param props (optional) the style props to pass to the Chakra UI button
 * @return {JSX.Element}
 */
export default function ActionButton({
    onClick,
    delay,
    variant,
    children,
    ...props
}) {
    const [isLoading, setIsLoading] = useState(false);

    function handleClick() {
        setIsLoading(true);
        setTimeout(() => {
            onClick();
            setIsLoading(false);
        }, delay);
    }

    if (variant === "tertiary") {
        return (
            <Button
                h={10}
                p={4}
                bg="none"
                color="gray.200"
                isLoading={delay && isLoading}
                onClick={handleClick}
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

    return (
        <Button
            h="60px"
            bg="dim"
            color="fg"
            isLoading={delay && isLoading}
            onClick={handleClick}
            transition="transform .1s"
            _hover={{
                transform: "scale(1.05)",
            }}
            {...props}
        >
            {children}
        </Button>
    );
}
