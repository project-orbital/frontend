import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Text } from "@chakra-ui/react";

/**
 * Clickable link component with an optional icon for the sidebar.
 *
 * @param to the destination URL
 * @param icon the optional icon to display
 * @param text the text to display
 * @param isSelected true if the link should be accented, false otherwise
 * @return the link component
 */
export default function SidebarLink({ to, icon, text, isSelected }) {
    return (
        <Link w="100%" as={RouterLink} to={to} color="white">
            <Stack
                direction={["row", null, null, "column"]}
                align="center"
                justify="start"
                px={[8, null, null, 0]}
                py="18px"
                spacing={[4, null, null, 2]}
                bgColor={isSelected ? "whiteAlpha.100" : null}
                borderLeft={isSelected ? "4px solid white" : null}
            >
                {icon}
                <Text fontSize="xs" fontWeight="semibold" casing="uppercase">
                    {text}
                </Text>
            </Stack>
        </Link>
    );
}
