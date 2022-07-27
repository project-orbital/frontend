import { Center, Text } from "@chakra-ui/react";
import PageTemplate from "../../components/PageTemplate";
import NavButton from "../../../common/components/buttons/NavButton";
import { BsFillCaretRightFill } from "react-icons/bs";

export default function EmailVerified() {
    return (
        <PageTemplate variant="auth" heading="Welcome to DollarPlanner!">
            <Text
                fontSize={["xl", null, "2xl", null, "3xl"]}
                fontWeight="medium"
                color="fg"
            >
                Your email has been verified.
            </Text>
            <Text fontSize={["sm", null, "md", null, "lg"]} color="fg">
                You may now sign in.
            </Text>
            <Center w="100%" pt="50px">
                <NavButton
                    to="/sign-in"
                    text="Sign in"
                    w="100%"
                    bgGradient="linear(to-br, accent, accent-dark)"
                    rightIcon={<BsFillCaretRightFill />}
                    color="white"
                ></NavButton>
            </Center>
        </PageTemplate>
    );
}
