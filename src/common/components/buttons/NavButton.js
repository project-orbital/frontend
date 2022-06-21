import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

/**
 * A button which navigates to the specified route when clicked.
 *
 * @param to the route to navigate to
 * @param text the text to display on the button
 * @return the button
 */
export default function NavButton({ to, text }) {
    const navigate = useNavigate();
    return (
        <Button h="60px" onClick={() => navigate(to)}>
            {text}
        </Button>
    );
}
