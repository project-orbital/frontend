import { Box, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";

export default function FeatureCard(props) {
    return (
        <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
            <Heading size="md" my="2">
                <LinkOverlay href="#">
                    {props.heading || faker.lorem.sentence()}
                </LinkOverlay>
            </Heading>
            <Text mb="3">{props.body || faker.lorem.paragraph()}</Text>
            <Box as="a" color="teal.400" href="#" fontWeight="bold">
                {props.link || faker.lorem.sentence()}
            </Box>
        </LinkBox>
    );
}
