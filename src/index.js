import { StrictMode } from "react";
import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import {
    BrowserRouter,
    Outlet,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as ReactDOMClient from "react-dom/client";
import { persistor, store } from "./app/store";
import { theme } from "./app/theme";
import { motion } from "framer-motion";
import AppTemplate from "./common/components/AppTemplate";

import UserRoutes from "./site/user/UserRoutes";
import DashboardRoutes from "./features/dashboard/DashboardRoutes";
import AccountsRoutes from "./features/accounts/AccountsRoutes";
import SettingsRoutes from "./features/settings/SettingsRoutes";
import DocsRoutes from "./site/docs/DocsRoutes";

import Portfolio from "./features/portfolio/Portfolio";
import Plan from "./features/plan/Budget";

import Learn from "./features/learn/Learn";
import ContributionCreate from "./features/learn/components/ContributionCreate";
import ContributionReport from "./features/learn/components/ReportContribution";

import BudgetDeleteModal from "./features/plan/components/BudgetDelete";
import BudgetUpdate from "./features/plan/components/BudgetUpdate";
import BudgetCreate from "./features/plan/components/BudgetCreate";

const pageVariants = {
    initial: {
        opacity: 0,
    },
    in: {
        opacity: 1,
    },
    out: {
        opacity: 0,
    },
};

const pageTransition = {
    type: "tween",
    ease: [0.17, 0.67, 0.83, 0.67],
    duration: 0.3,
};

const AnimationLayout = () => {
    const { pathname } = useLocation();
    return (
        <motion.div
            key={pathname}
            initial="initial"
            animate="in"
            variants={pageVariants}
            transition={pageTransition}
        >
            <Outlet />
        </motion.div>
    );
};

// TODO: Replace the remaining routes by creating "__Routes.js" in their respective folders and linking them here.
const routes = (
    <Routes>
        <Route element={<AnimationLayout />}>
            <Route path="/*" element={<UserRoutes />} />
            <Route path="/docs/*" element={<DocsRoutes />} />
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
            <Route path="/accounts/*" element={<AccountsRoutes />} />
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
                path="portfolio"
                element={
                    <AppTemplate
                        page="portfolio"
                        path={["Home", "Portfolio"]}
                        links={["/dashboard", "/portfolio"]}
                        title="Portfolio"
                    />
                }
            >
                <Route path="" element={<Portfolio />} />
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
            <PersistGate loading={null} persistor={persistor}>
                <ChakraProvider theme={theme}>
                    <CSSReset />
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <BrowserRouter>{routes}</BrowserRouter>
                </ChakraProvider>
            </PersistGate>
        </Provider>
    </StrictMode>
);

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(element);
