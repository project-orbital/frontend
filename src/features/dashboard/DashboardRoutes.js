import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import AppTemplate from "../../common/components/AppTemplate";

export default function DashboardRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AppTemplate
                        page="dashboard"
                        path="Home/Dashboard"
                        links={["/dashboard", "/dashboard"]}
                        title="Dashboard"
                    />
                }
            >
                <Route path="/" element={<Dashboard />} />
            </Route>
        </Routes>
    );
}
