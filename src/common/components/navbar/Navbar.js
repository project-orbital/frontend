import {
    Box,
    HStack,
    IconButton,
    Spacer,
    useColorMode,
} from "@chakra-ui/react";
import Logo from "./Logo";
import NavButton from "../buttons/NavButton";
import { CgDarkMode } from "react-icons/cg";

export default function Navbar({ hasSignInButton, hasSignUpButton }) {
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
            position="absolute"
            w="100%"
            h="90px"
            px="5%"
            bg="bg-translucent"
            zIndex={1}
        >
            <Logo />
            <Spacer />
            {hasSignInButton && <SignIn />}
            {hasSignUpButton && <SignUp />}
            <Box pl="40px">
                <IconButton
                    bg="none"
                    aria-label="Toggle dark mode"
                    onClick={toggleColorMode}
                    icon={<CgDarkMode size="25px" />}
                />
            </Box>
        </HStack>
    );
}
