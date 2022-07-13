import { StrictMode } from "react";
import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as ReactDOMClient from "react-dom/client";

import RequireAuth from "./common/components/RequireAuth";
import { persistor, store } from "./app/store";
import { theme } from "./app/theme";

import UserRoutes from "./features/user/UserRoutes";
import DashboardRoutes from "./features/dashboard/DashboardRoutes";
import AccountsRoutes from "./features/accounts/AccountsRoutes";
import SettingsRoutes from "./features/settings/SettingsRoutes";

import Portfolio from "./features/portfolio/Portfolio";
import Plan from "./features/plan/Plan";
import PlanMenu from "./features/plan/PlanMenu";
import Learn from "./features/learn/Learn";

// TODO: Replace the remaining routes by creating "__Routes.js" in their respective folders and linking them here.
const routes = (
    <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="/accounts/*" element={<AccountsRoutes />} />
        <Route path="/settings/*" element={<SettingsRoutes />} />
        <Route
            path="learn"
            element={
                <RequireAuth>
                    <Learn />
                </RequireAuth>
            }
        ></Route>
        <Route
            path="portfolio"
            element={
                <RequireAuth>
                    <Portfolio />
                </RequireAuth>
            }
        ></Route>
        <Route
            path="planMenu"
            element={
                <RequireAuth>
                    <PlanMenu />
                </RequireAuth>
            }
        ></Route>
        <Route
            path="plan/:id"
            element={
                <RequireAuth>
                    <Plan />
                </RequireAuth>
            }
        />
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
