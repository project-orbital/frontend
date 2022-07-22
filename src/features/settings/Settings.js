import { Text, useColorMode, useToast } from "@chakra-ui/react";
import NavButton from "../../common/components/buttons/NavButton";
import ky from "ky";
import ActionButton from "../../common/components/buttons/ActionButton";
import { CgDarkMode } from "react-icons/cg";
import { TbEraser } from "react-icons/tb";
import { AiOutlineUserDelete } from "react-icons/ai";
import BaseCard from "../../common/components/cards/BaseCard";
import { Outlet } from "react-router-dom";

export default function Settings() {
    const toast = useToast();

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
                <ActionButton onClick={handleColorModeToggle} bg="bg" w="100%">
                    <CgDarkMode size="25px" />
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
                    w="100%"
                />
            </BaseCard>
            <BaseCard
                title="Account Management"
                subtitle="You can update your profile and/or your password here."
                spacing={4}
            >
                <NavButton
                    variant="secondary"
                    to="update-profile"
                    text="Update profile"
                    w="100%"
                />
                <NavButton
                    variant="secondary"
                    to="./change-password"
                    text="Change password"
                    w="100%"
                />
                <NavButton
                    variant="danger"
                    icon={<AiOutlineUserDelete size="25px" color="white" />}
                    to="delete-account"
                    text="Delete account"
                    w="100%"
                />
            </BaseCard>
            <Outlet />
        </>
    );
}
