import {Heading, Text, VStack} from '@chakra-ui/react';

/**
 * A dynamically-sized card component to display optional headings and body elements.
 *
 * @param heading the heading text
 * @param subheading the subheading text
 * @param children the body content
 * @return the card component
 */
export default function Card({heading, subheading, children}) {
    return <VStack align="start" p="30px" bg="white" borderRadius="10px" shadow="sm">
        {(heading || subheading) && <VStack align="start">
            {heading && <Heading as="h3" size="md" pb={subheading ? '0px' : '20px'}>{heading}</Heading>}
            {subheading && <Text fontSize="sm" pb="20px">{subheading}</Text>}
        </VStack>}
        <VStack align="start">
            {children}
        </VStack>
    </VStack>;
}
