import PageTemplate from "../../PageTemplate";
import { Center, Text } from "@chakra-ui/react";
import NavButton from "../../../common/components/buttons/NavButton";

export default function EmailSent() {
    return (
        <PageTemplate variant="auth" heading="Verification email sent.">
            <Text
                fontSize={["xl", null, "2xl", null, "3xl"]}
                fontWeight="medium"
                color="fg"
            >
                Please check your email for a verification link.
            </Text>
            <Text fontSize={["sm", null, "md", null, "lg"]} color="fg">
                If you do not receive the email after a few minutes, please
                check the junk folder in your email.
            </Text>
            <Center w="100%" pt="50px">
                <NavButton
                    to="/sign-in"
                    text="Sign in"
                    w="100%"
                    bg="accent"
                    color="white"
                ></NavButton>
            </Center>
        </PageTemplate>
    );
}
