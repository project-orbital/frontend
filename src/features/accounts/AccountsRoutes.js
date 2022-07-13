import { Route, Routes } from "react-router-dom";
import Accounts from "./Accounts";
import RequireAuth from "../../common/components/RequireAuth";
import AccountCreate from "./components/AccountCreate";
import AccountRename from "./components/AccountRename";
import AccountDelete from "./components/AccountDelete";
import AccountNotFound from "./account/AccountNotFound";
import Account from "./account/Account";

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
