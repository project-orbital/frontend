import { Link as RouterLink } from "react-router-dom";
import { Link, Text, VStack } from "@chakra-ui/react";

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
            <VStack
                py="18px"
                spacing="8px"
                bgColor={isSelected ? "whiteAlpha.100" : null}
                borderLeft={isSelected ? "4px solid white" : null}
            >
                {icon}
                <Text fontSize="xs" fontWeight="semibold" casing="uppercase">
                    {text}
                </Text>
            </VStack>
        </Link>
    );
}
