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
                variant="tertiary"
                to="/sign-in"
                fontWeight="normal"
                fontSize="sm"
                color="fg-light"
            >
                Sign in
            </NavButton>
        );
    };

    const SignUp = () => {
        return (
            <NavButton
                variant="secondary"
                p={4}
                to="/sign-up"
                text="Sign up"
                fontWeight="semibold"
                fontSize="sm"
                bg="fg"
                color="bg"
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
