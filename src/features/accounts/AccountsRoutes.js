import { Route, Routes } from "react-router-dom";
import Accounts from "./Accounts";
import RequireAuth from "../../common/components/RequireAuth";
import AccountCreate from "./components/account/AccountCreate";
import AccountRename from "./components/account/AccountRename";
import AccountDelete from "./components/account/AccountDelete";
import AccountNotFound from "./components/account/AccountNotFound";
import Account from "./components/account/Account";

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
            <Route path="/not-found" element={<AccountNotFound />} />
            <Route path="/:id" element={<Account />}>
                <Route path="rename" element={<AccountRename />} />
                <Route path="delete" element={<AccountDelete />} />
            </Route>
        </Routes>
    );
}
