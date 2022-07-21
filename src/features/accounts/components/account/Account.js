import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useReadAccountQuery } from "../../../../app/api";
import TransactionsCard from "../transactions/TransactionsCard";
import BalanceCard from "../transactions/BalanceCard";
import ParseCard from "../transactions/ParseCard";

/**
 * The page view for a specific account.
 * Distinct from `AccountCard` which only displays a brief summary of the account.
 */
export default function Account() {
    const navigate = useNavigate();
    const accountId = useParams().id;
    const {
        data: accounts,
        isLoading,
        isError,
    } = useReadAccountQuery(accountId);
    const { name, nickname } = accounts ?? {};

    if (isError) {
        navigate("/accounts/not-found", { replace: true });
    }

    return (
        <>
            <BalanceCard />
            <TransactionsCard />
            <ParseCard />
            <Outlet context={[accountId, name, nickname]} />
        </>
    );
}
