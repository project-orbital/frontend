import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "../../common/components/RequireAuth";

export default function DashboardRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                }
            />
        </Routes>
    );
}
