import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import {
    Box,
    SimpleGrid,
    Text,
    useColorMode,
    useToast,
} from "@chakra-ui/react";
import Card from "../../common/components/Card";
import NavButton from "../../common/components/buttons/NavButton";
import { Outlet } from "react-router-dom";
import ky from "ky";
import ActionButton from "../../common/components/buttons/ActionButton";
import { CgDarkMode } from "react-icons/cg";
import { TbEraser } from "react-icons/tb";
import { AiOutlineUserDelete } from "react-icons/ai";
import { MdSync, MdSyncDisabled } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectDataSync, toggleDataSync } from "./state/preferences";

export default function Settings() {
    const dispatch = useDispatch();
    const dataSync = useSelector(selectDataSync);
    const toast = useToast();

    // Data synchronization toggle
    const handleDataSyncToggle = async () => {
        // dataSync is updated asynchronously, so we invert the old value now
        // instead of sending the new value to the server.
        const allowsDataStorage = !dataSync;
        try {
            const URL = `${process.env.REACT_APP_BACKEND}/users/preferences/data-sync`;
            // Prevent duplicate toasts presenting conflicting messages.
            await toast.closeAll();
            await ky.post(URL, {
                json: { allowsDataStorage: allowsDataStorage },
                credentials: "include",
            });
            dispatch(toggleDataSync());
            toast({
                title: `Data synchronization ${
                    allowsDataStorage ? "enabled" : "disabled"
                }.`,
                status: "success",
                duration: 2000,
            });
        } catch {
            toast({
                title: `Data synchronization could not be ${
                    allowsDataStorage ? "enabled" : "disabled"
                }.`,
                description: "Please try again.",
                status: "error",
                duration: 2000,
            });
        }
    };

    // Dark mode toggle
    const { colorMode, toggleColorMode } = useColorMode();
    const handleColorModeToggle = () => {
        const prefersDarkMode = colorMode !== "dark";
        toggleColorMode();
        try {
            ky.post(
                `${process.env.REACT_APP_BACKEND}/users/preferences/dark-mode`,
                {
                    json: { prefersDarkMode: prefersDarkMode },
                    credentials: "include",
                }
            );
        } catch {
            toast({
                title: `Dark mode preference could not be saved.`,
                description: "Please try again.",
                duration: 2000,
            });
        }
    };

    return (
        <PageTemplate page="settings">
            <Breadcrumbs
                path="Home/Settings"
                links={["/dashboard", "/Settings"]}
            />
            <Box w="100%" h="100%">
                <SimpleGrid columns={2} spacing="30px">
                    <Card
                        heading="Appearance"
                        subheading="You can change how the app looks here."
                    >
                        <ActionButton onClick={handleColorModeToggle}>
                            <CgDarkMode size="25px" />
                            <Text pl="10px">
                                {colorMode === "light" ? "Enable" : "Disable"}{" "}
                                dark mode
                            </Text>
                        </ActionButton>
                    </Card>
                    <Card
                        heading="Data Management"
                        subheading="Data synchronization across your devices requires your data
                        to be stored on our servers. You can choose whether to disable this feature,
                        and also erase your existing data."
                    >
                        <ActionButton
                            onClick={handleDataSyncToggle}
                            delay={650}
                        >
                            {dataSync ? (
                                <MdSyncDisabled size="25px" />
                            ) : (
                                <MdSync size="25px" />
                            )}
                            <Text pl="10px">
                                {`${
                                    dataSync === true ? "Disable" : "Enable"
                                } data synchronization`}
                            </Text>
                        </ActionButton>
                        <NavButton
                            icon={<TbEraser size="25px" color="white" />}
                            to="erase-data"
                            text="Erase stored data"
                            bg="red.500"
                        />
                    </Card>
                    <Card
                        heading="Account Management"
                        subheading="You can update your profile and/or your password here."
                    >
                        <NavButton
                            to="update-profile"
                            text="Update profile"
                            bg="dim"
                            color="fg"
                        />
                        <NavButton
                            to="./change-password"
                            text="Change password"
                            bg="dim"
                            color="fg"
                        />
                        <NavButton
                            icon={
                                <AiOutlineUserDelete
                                    size="25px"
                                    color="white"
                                />
                            }
                            to="delete-account"
                            text="Delete account"
                            bg="red.500"
                        />
                    </Card>
                </SimpleGrid>
            </Box>
            <Outlet />
        </PageTemplate>
    );
}
