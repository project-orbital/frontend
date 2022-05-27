import {Heading, VStack} from "@chakra-ui/react";

/**
 * Vertically stacks sidebar items under a category.
 *
 * Props:
 * - name: The name of the category.
 * - items: An array of components to display under the category, usually <SidebarLink/>s.
 */
export default function SidebarCategory(props) {
    return <VStack pt="40px" align="start" spacing="5px">
        <Heading as="h3" pb="20px" size="xs" color="white">{props.name.toUpperCase()}</Heading>
        {props.items}
    </VStack>
}
