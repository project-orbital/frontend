import Breadcrumbs from "../../common/components/Breadcrumbs";
import PageTemplate from "../../common/components/PageTemplate";
import Navbar from "../../common/components/navbar/Navbar";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

/**
 * Page Not Found
 *
 * @param IsLoggedIn a boolean
 * @return a suitable Page Not Found that depends on the login status of the user.
 */
export default function PageNotFound({ IsLoggedIn }) {
    const navigate = useNavigate();

    if (IsLoggedIn) {
        return (
            <PageTemplate>
                <Breadcrumbs
                    path="Home/Page Not Found"
                    links={["/dashboard", "/404"]}
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
                            404
                        </Heading>
                        <Text fontSize="50px" mt={3} mb={2}>
                            Page Not Found
                        </Text>
                        <Text fontSize="25px" color={"gray.500"} mb={6}>
                            The page you were looking for doesn't exist.
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
    } else {
        return (
            <VStack h="full" w="full" spacing="0px">
                <Navbar />
                <Box textAlign="center" py={10} px={6}>
                    <Heading
                        display="inline-block"
                        as="h2"
                        size="4xl"
                        color="black.500"
                    >
                        404
                    </Heading>
                    <Text fontSize="50px" mt={3} mb={2}>
                        Page Not Found
                    </Text>
                    <Text fontSize="25px" color={"gray.500"} mb={6}>
                        The page you were looking for doesn't exist.
                    </Text>
                    <Button
                        colorScheme="teal"
                        color="white"
                        variant="solid"
                        onClick={() => navigate("/")}
                    >
                        Go to Homepage
                    </Button>
                </Box>
            </VStack>
        );
    }
}
