import {
    Box,
    HStack,
    IconButton,
    Spacer,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import Logo from "./Logo";
import NavButton from "../buttons/NavButton";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Navbar({
    hasSignInButton,
    hasSignUpButton,
    buttons = [],
}) {
    const { toggleColorMode } = useColorMode();
    const darkModeIcon = useColorModeValue(
        <MoonIcon boxSize={[4]} />,
        <SunIcon boxSize={[4]} />
    );

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
            position="fixed"
            spacing={0}
            w="100%"
            h={[16, 20]}
            pt={2}
            pl={[6, 6, 8, 16]}
            pr={[2, 4, 6, 12]}
            bg="bg-translucent"
            zIndex={1}
            overflowX="hidden"
        >
            <Logo />
            <Spacer />
            {hasSignInButton && <SignIn />}
            {hasSignUpButton && <SignUp />}
            <HStack pl={[2, 4, 6, 8, 8]}>
                <IconButton
                    bg="none"
                    aria-label="Toggle dark mode"
                    onClick={toggleColorMode}
                    icon={darkModeIcon}
                />
                {buttons?.map((bt, i) => (
                    <Box key={i}>{bt}</Box>
                ))}
            </HStack>
        </HStack>
    );
}
