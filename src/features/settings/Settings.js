import {
    Text,
    useColorMode,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import NavButton from "../../common/components/buttons/NavButton";
import ky from "ky";
import ActionButton from "../../common/components/buttons/ActionButton";
import { TbEraser } from "react-icons/tb";
import { AiOutlineUserDelete } from "react-icons/ai";
import BaseCard from "../../common/components/cards/BaseCard";
import { Outlet } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Settings() {
    const toast = useToast();
    const darkModeIcon = useColorModeValue(
        <MoonIcon boxSize={[4]} />,
        <SunIcon boxSize={[4]} />
    );

    // Dark mode toggle
    const { colorMode, toggleColorMode } = useColorMode();
    const handleColorModeToggle = () => {
        const prefersDarkMode = colorMode !== "dark";
        toggleColorMode();
        try {
            ky.post(`${process.env.REACT_APP_BACKEND}/learn`, {
                json: { prefersDarkMode: prefersDarkMode },
                credentials: "include",
            });
        } catch {
            toast({
                title: `Dark mode preference could not be saved.`,
                description: "Please try again.",
                duration: 2000,
            });
        }
    };

    return (
        <>
            <BaseCard
                title="Appearance"
                subtitle="You can change how the app looks here."
            >
                <ActionButton
                    onClick={handleColorModeToggle}
                    bgGradient="linear(to-br, gray.400, gray.600)"
                    px={8}
                    color="white"
                >
                    {darkModeIcon}
                    <Text pl="10px">
                        {colorMode === "light" ? "Enable" : "Disable"} dark mode
                    </Text>
                </ActionButton>
            </BaseCard>
            <BaseCard
                title="Data Management"
                subtitle="If you wish to reset your account without having to create another account,
                        you can do so here."
                spacing={4}
            >
                <NavButton
                    variant="danger"
                    icon={<TbEraser size="25px" color="white" />}
                    to="erase-data"
                    text="Erase data"
                />
            </BaseCard>
            <BaseCard
                title="Account Management"
                subtitle="You can update your profile and/or your password here."
                spacing={6}
            >
                <NavButton
                    variant="secondary"
                    to="update-profile"
                    text="Update profile"
                />
                <NavButton
                    variant="secondary"
                    to="./change-password"
                    text="Change password"
                />
                <NavButton
                    variant="danger"
                    icon={<AiOutlineUserDelete size="25px" color="white" />}
                    to="delete-account"
                    text="Delete account"
                />
            </BaseCard>
            <Outlet />
        </>
    );
}
