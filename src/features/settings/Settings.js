import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import {
    Badge,
    Box,
    Button,
    SimpleGrid,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import Card from "../../common/components/Card";
import NavButton from "../../common/components/buttons/NavButton";
import { CgDarkMode } from "react-icons/cg";
import { TbEraser } from "react-icons/tb";
import { AiOutlineUserDelete } from "react-icons/ai";
import ky from "ky";

export default function Settings() {
    // Dark mode toggle
    const { colorMode, toggleColorMode } = useColorMode();
    const handleColorModeToggle = () => {
        const prefersDarkMode = colorMode !== "dark";
        toggleColorMode();
        ky.post(
            `${process.env.REACT_APP_BACKEND}/users/preferences/dark-mode`,
            {
                json: { prefersDarkMode: prefersDarkMode },
                credentials: "include",
            }
        );
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
                        <Button
                            h="60px"
                            bg="dim"
                            color="fg"
                            onClick={handleColorModeToggle}
                        >
                            <CgDarkMode size="25px" />
                            <Text pl="10px">
                                {colorMode === "light" ? "Enable" : "Disable"}{" "}
                                dark mode
                            </Text>
                        </Button>
                    </Card>
                    <Card
                        badge={
                            <Badge colorScheme="orange">Work in Progress</Badge>
                        }
                        heading="Account Management"
                        subheading="You can update your email, username, and/or your password here."
                    >
                        <NavButton text="Update profile" bg="dim" c="fg" />
                        <NavButton text="Change password" bg="dim" c="fg" />
                        <NavButton
                            icon={
                                <AiOutlineUserDelete
                                    size="25px"
                                    color="white"
                                />
                            }
                            text="Delete account"
                            bg="red.500"
                        />
                    </Card>
                    <Card
                        badge={
                            <Badge colorScheme="orange">Work in Progress</Badge>
                        }
                        heading="Data Management"
                        subheading="You can control whether your data is stored on our servers here."
                    >
                        <NavButton text="Manage data storage" bg="dim" c="fg" />
                        <NavButton
                            text="Download stored data"
                            bg="dim"
                            c="fg"
                        />
                        <NavButton
                            icon={<TbEraser size="25px" color="white" />}
                            text="Erase stored data"
                            bg="red.500"
                        />
                    </Card>
                </SimpleGrid>
            </Box>
        </PageTemplate>
    );
}
