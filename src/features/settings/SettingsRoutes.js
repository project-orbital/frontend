import { Route, Routes } from "react-router-dom";
import ProfileUpdate from "./components/ProfileUpdate";
import PasswordChange from "./components/PasswordChange";
import UserAccountDelete from "./components/AccountDelete";
import DataErase from "./components/DataErase";
import Settings from "./Settings";
import RequireAuth from "../../common/components/RequireAuth";

export default function SettingsRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <Settings />
                    </RequireAuth>
                }
            >
                <Route path="update-profile" element={<ProfileUpdate />} />
                <Route path="change-password" element={<PasswordChange />} />
                <Route path="delete-account" element={<UserAccountDelete />} />
                <Route path="erase-data" element={<DataErase />} />
            </Route>
        </Routes>
    );
}
