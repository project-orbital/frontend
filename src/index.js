import { StrictMode } from "react";
import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import * as ReactDOMClient from "react-dom/client";
import { store } from "./app/store";
import { theme } from "./app/theme";
import AppTemplate from "./common/components/AppTemplate";

import UserRoutes from "./site/user/UserRoutes";
import DashboardRoutes from "./features/dashboard/DashboardRoutes";
import AccountsRoutes from "./features/accounts/AccountsRoutes";
import SettingsRoutes from "./features/settings/SettingsRoutes";
import DocsRoutes from "./site/docs/DocsRoutes";
import Plan from "./features/plan/Budget";

import Learn from "./features/learn/Learn";
import ContributionCreate from "./features/learn/components/ContributionCreate";
import ContributionReport from "./features/learn/components/ReportContribution";

import BudgetDeleteModal from "./features/plan/components/BudgetDelete";
import BudgetUpdate from "./features/plan/components/BudgetUpdate";
import BudgetCreate from "./features/plan/components/BudgetCreate";
import PortfolioRoutes from "./features/portfolio/PortfolioRoutes";

const AnimationLayout = () => {
    return <Outlet />;
};

// TODO: Replace the remaining routes by creating "__Routes.js" in their respective folders and linking them here.
const routes = (
    <Routes>
        <Route element={<AnimationLayout />}>
            <Route path="/*" element={<UserRoutes />} />
            <Route path="/docs/*" element={<DocsRoutes />} />
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
            <Route path="/accounts/*" element={<AccountsRoutes />} />
            <Route path="/portfolio/*" element={<PortfolioRoutes />} />
            <Route path="/settings/*" element={<SettingsRoutes />} />
            <Route
                path="learn"
                element={
                    <AppTemplate
                        page="learn"
                        path={["Home", "Learn"]}
                        links={["/dashboard", "/learn"]}
                        title="Learn"
                    />
                }
            >
                <Route path="" element={<Learn />}>
                    <Route path="contribute" element={<ContributionCreate />} />
                    <Route path="report/:id" element={<ContributionReport />} />
                </Route>
            </Route>
            <Route
                path="plan"
                element={
                    <AppTemplate
                        page="plan"
                        path={["Home", "Plan"]}
                        links={["/dashboard", "/plan"]}
                        title="Plan"
                    />
                }
            >
                <Route path="" element={<Plan />}>
                    <Route path="create-budget" element={<BudgetCreate />} />
                    <Route
                        path="delete-budget"
                        element={<BudgetDeleteModal />}
                    />
                    <Route path="update-budget" element={<BudgetUpdate />} />
                </Route>
            </Route>
        </Route>
    </Routes>
);

const element = (
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <CSSReset />
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <BrowserRouter>{routes}</BrowserRouter>
            </ChakraProvider>
        </Provider>
    </StrictMode>
);

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(element);
