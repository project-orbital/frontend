import { HStack, IconButton, Spacer, useColorMode } from "@chakra-ui/react";
import Logo from "./Logo";
import NavButton from "../../../common/components/buttons/NavButton";
import { CgDarkMode } from "react-icons/cg";

export default function Header() {
    const { toggleColorMode } = useColorMode();

    const SignIn = () => {
        return (
            <NavButton
                to="/sign-in"
                text="Sign in"
                h="40px"
                fw="normal"
                fs="sm"
                bg="none"
                c="fg-light"
                zIndex={2}
            />
        );
    };

    const SignUp = () => {
        return (
            <NavButton
                to="/sign-up"
                text="Sign up"
                h="40px"
                fw="semibold"
                fs="sm"
                bg="fg"
                c="bg"
                zIndex={2}
            />
        );
    };

    return (
        <HStack
            w="100%"
            h="90px"
            px="20%"
            pt="25px"
            pb="20px"
            pos="fixed"
            bg="bg-translucent"
            zIndex={1}
        >
            <Logo />
            <Spacer />
            <SignIn />
            <SignUp />
            <HStack position="absolute" justifyContent="end" w="75%">
                <IconButton
                    bg="none"
                    aria-label="Toggle dark mode"
                    onClick={toggleColorMode}
                    icon={<CgDarkMode size="25px" />}
                />
            </HStack>
        </HStack>
    );
}
