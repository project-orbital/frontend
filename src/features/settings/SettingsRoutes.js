import { Route, Routes } from "react-router-dom";
import ProfileUpdate from "./components/ProfileUpdate";
import PasswordChange from "./components/PasswordChange";
import UserAccountDelete from "./components/AccountDelete";
import DataErase from "./components/DataErase";
import AppTemplate from "../../common/components/AppTemplate";
import Settings from "./Settings";

export default function SettingsRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AppTemplate
                        page="settings"
                        path={["Home", "Settings"]}
                        links={["/dashboard", "/Settings"]}
                        title="Settings"
                    />
                }
            >
                <Route path="" element={<Settings />}>
                    <Route path="update-profile" element={<ProfileUpdate />} />
                    <Route
                        path="change-password"
                        element={<PasswordChange />}
                    />
                    <Route
                        path="delete-account"
                        element={<UserAccountDelete />}
                    />
                    <Route path="erase-data" element={<DataErase />} />
                </Route>
            </Route>
        </Routes>
    );
}
