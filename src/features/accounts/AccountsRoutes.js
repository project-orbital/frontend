import { Route, Routes } from "react-router-dom";
import Accounts from "./Accounts";
import AccountCreate from "./components/account/AccountCreate";
import AccountRename from "./components/account/AccountRename";
import AccountDelete from "./components/account/AccountDelete";
import AccountNotFound from "./components/account/AccountNotFound";
import TransactionCreate from "./components/transactions/TransactionCreate";
import DisclaimerModal from "./components/upload/DisclaimerModal";
import UploadModal from "./components/upload/UploadModal";
import ReviewModal from "./components/upload/ReviewModal";
import ConfirmCancelModal from "./components/upload/ConfirmCancelModal";
import TransactionDelete from "./components/transactions/TransactionDelete";
import TransactionUpdate from "./components/transactions/TransactionUpdate";
import AppTemplate from "../../common/components/AppTemplate";
import Account from "./components/account/Account";

export default function AccountsRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AppTemplate
                        page="accounts"
                        path={["Home", "Accounts"]}
                        links={["/dashboard", "/accounts"]}
                        title="Accounts"
                    />
                }
            >
                <Route path="" element={<Accounts />}>
                    <Route path="create" element={<AccountCreate />} />
                    <Route path="update/:id" element={<AccountRename />} />
                    <Route path="delete/:id" element={<AccountDelete />} />
                </Route>
            </Route>
            <Route
                path="not-found"
                element={
                    <AppTemplate
                        page="accounts"
                        path={["Home", "Accounts", "404"]}
                        links={[
                            "/dashboard",
                            "/accounts",
                            "/accounts/not-found",
                        ]}
                        title="404"
                    />
                }
            >
                <Route path="" element={<AccountNotFound />} />
            </Route>
            <Route
                path=":id"
                element={
                    <AppTemplate
                        page="accounts"
                        path={["Home", "Accounts"]}
                        links={["/dashboard", "/accounts"]}
                        title="Accounts"
                    />
                }
            >
                <Route path="" element={<Account />}>
                    <Route path="upload">
                        <Route
                            path="disclaimer"
                            element={<DisclaimerModal />}
                        />
                        <Route path="files" element={<UploadModal />} />
                        <Route path="review" element={<ReviewModal />}>
                            <Route
                                path="cancel"
                                element={<ConfirmCancelModal />}
                            />
                        </Route>
                    </Route>
                    <Route path="transactions">
                        <Route path="create">
                            <Route
                                path="withdrawal"
                                element={
                                    <TransactionCreate type="withdrawal" />
                                }
                            />
                            <Route
                                path="deposit"
                                element={<TransactionCreate type="deposit" />}
                            />
                        </Route>
                        <Route path=":transactionId">
                            <Route
                                path="update"
                                element={<TransactionUpdate />}
                            />
                            <Route
                                path="delete"
                                element={<TransactionDelete />}
                            />
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}
