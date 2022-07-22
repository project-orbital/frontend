import { Route, Routes } from "react-router-dom";
import AppTemplate from "../../common/components/AppTemplate";
import Portfolio from "./Portfolio";
import AssetCreate from "./components/AssetCreate";
import LiabilityCreate from "./components/LiabilityCreate";
import OrderCreate from "./components/OrderCreate";
import AssetUpdate from "./components/AssetUpdate";
import AssetDelete from "./components/AssetDelete";
import PaymentCreate from "./components/PaymentCreate";

export default function PortfolioRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AppTemplate
                        page="portfolio"
                        path={["Home", "Portfolio"]}
                        links={["/dashboard", "/portfolio"]}
                        title="Portfolio"
                    />
                }
            >
                <Route path="" element={<Portfolio />}>
                    <Route path="assets">
                        <Route path="create" element={<AssetCreate />} />
                        <Route path=":assetId">
                            <Route path="update" element={<AssetUpdate />} />
                            <Route path="delete" element={<AssetDelete />} />
                            <Route path="orders">
                                <Route path="create">
                                    <Route
                                        path="buy"
                                        element={<OrderCreate type="buy" />}
                                    />
                                    <Route
                                        path="sell"
                                        element={<OrderCreate type="sell" />}
                                    />
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                    <Route path="liabilities">
                        <Route path="create" element={<LiabilityCreate />} />
                        <Route path=":liabilityId">
                            <Route path="update" element={<AssetUpdate />} />
                            <Route path="delete" element={<AssetDelete />} />
                            <Route path="payments">
                                <Route
                                    path="create"
                                    element={<PaymentCreate />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Route>
            <Route
                path="not-found"
                element={
                    <AppTemplate
                        page="portfolio"
                        path={["Home", "Portfolio", "404"]}
                        links={[
                            "/dashboard",
                            "/portfolio",
                            "/portfolio/not-found",
                        ]}
                        title="404"
                    />
                }
            >
                <Route path="" element={<Portfolio />} />
            </Route>
        </Routes>
    );
}
