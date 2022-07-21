import Breadcrumbs from "../../common/components/Breadcrumbs";
import PageTemplate from "../PageTemplate";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
    const navigate = useNavigate();
    return (
        <PageTemplate>
            <Breadcrumbs
                path="Home/Under Development"
                links={["/dashboard", "/Work In Progress"]}
                title={" "}
            />
            <VStack h="full" w="full" spacing="0px">
                <Box textAlign="center" py={10} px={6}>
                    <Heading
                        color="black.500"
                        display="inline-block"
                        as="h2"
                        size="4xl"
                    >
                        Oh no...
                    </Heading>
                    <Text fontSize="50px" mt={3} mb={2}>
                        We are currently still working on this page!
                    </Text>
                    <Button
                        colorScheme="teal"
                        color="white"
                        variant="solid"
                        onClick={() => navigate("/dashboard")}
                    >
                        Back to dashboard
                    </Button>
                </Box>
            </VStack>
        </PageTemplate>
    );
}
