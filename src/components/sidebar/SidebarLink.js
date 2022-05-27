import {Link as RouterLink} from "react-router-dom";
import {Link, Text} from "@chakra-ui/react";

/**
 * Wrapper component for links in the sidebar.
 *
 * Props:
 * - to: The path to link to.
 * - text: The text to display.
 * - size ("lg", "sm"): The size of the text. Defaults to "lg".
 */
export default function SidebarLink(props) {
    const fontWeight = !props.size || props.size === "lg" ? "semibold" : "normal";
    const fontSize = !props.size || props.size === "lg" ? "xl" : "sm";

    return <Link as={RouterLink} to={props.to} color="white">
        <Text fontSize={fontSize} fontWeight={fontWeight}>{props.text}</Text>
    </Link>
}
