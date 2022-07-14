import { Route, Routes } from "react-router-dom";
import Accounts from "./Accounts";
import RequireAuth from "../../common/components/RequireAuth";
import AccountCreate from "./components/account/AccountCreate";
import AccountRename from "./components/account/AccountRename";
import AccountDelete from "./components/account/AccountDelete";
import AccountNotFound from "./components/account/AccountNotFound";
import Account from "./components/account/Account";
import TransactionCreate from "./components/transactions/TransactionCreate";

export default function AccountsRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <Accounts />
                    </RequireAuth>
                }
            >
                <Route path="create" element={<AccountCreate />} />
            </Route>
            <Route
                path="/not-found"
                element={
                    <RequireAuth>
                        <AccountNotFound />
                    </RequireAuth>
                }
            />
            <Route
                path="/:id"
                element={
                    <RequireAuth>
                        <Account />
                    </RequireAuth>
                }
            >
                <Route path="rename" element={<AccountRename />} />
                <Route path="delete" element={<AccountDelete />} />
                <Route path="transactions">
                    <Route path="create">
                        <Route
                            path="withdrawal"
                            element={<TransactionCreate type="withdrawal" />}
                        />
                        <Route
                            path="deposit"
                            element={<TransactionCreate type="deposit" />}
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}
