import Breadcrumbs from "../../common/components/Breadcrumbs";
import PageTemplate from "../../common/components/PageTemplate";
import Header from "../landing/components/Header";
import { Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

/**
 * Page Not Found
 *
 * @param IsLoggedIn a boolean
 * @return a suitable Page Not Found that depends on the login status of the user.
 */
export default function PageNotFound({ IsLoggedIn }) {
    IsLoggedIn = true;
    const navigate = useNavigate();

    if (IsLoggedIn) {
        return (
            <PageTemplate>
                <Breadcrumbs
                    path="Home/404"
                    links={["/404", "/404"]}
                    title={"Page not Found"}
                />
                <VStack h="full" w="full" spacing="0px">
                    <Box textAlign="center" py={10} px={6}>
                        <Heading
                            display="inline-block"
                            as="h2"
                            size="4xl"
                            bgGradient="linear(to-r, red.400, red.600)"
                            backgroundClip="text"
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
                            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                            color="white"
                            variant="solid"
                            onClick={() => navigate("/dashboard")}
                        >
                            Go to dashboard
                        </Button>
                    </Box>
                </VStack>
            </PageTemplate>
        );
    } else {
        return (
            <VStack h="full" w="full" spacing="0px">
                <Header />
                <Box textAlign="center" py={10} px={6}>
                    <Heading
                        display="inline-block"
                        as="h2"
                        size="4xl"
                        bgGradient="linear(to-r, red.400, red.600)"
                        backgroundClip="text"
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
                        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
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
