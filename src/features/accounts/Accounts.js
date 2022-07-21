import { Box, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AccountCard from "./components/account/AccountCard";
import NavButton from "../../common/components/buttons/NavButton";

import { useReadAccountsQuery } from "../../app/api";
import BaseCard from "../../common/components/cards/BaseCard";

/**
 * The main account page view displaying all accounts in a grid.
 * The grid items comprise of `AccountCard`.
 */
export default function Accounts() {
    const { data: accounts, isLoading } = useReadAccountsQuery();

    // The default card to be displayed when no accounts have been created, and hidden otherwise.
    const NoAccounts = () => (
        <BaseCard>
            <Box>
                <Text fontSize="xl" fontWeight="bold">
                    {"You haven't created an account yet."}
                </Text>
                <Text>
                    Creating an account will allow you to keep a record of your
                    transactions and plan a budget with our budget planner.
                </Text>
            </Box>
            <NavButton to="/accounts/create" text="Create an account" p={8} />
        </BaseCard>
    );

    // The card to display when at least 1 account is created, with a button for creating another account.
    const AddAccount = () => (
        <BaseCard>
            <Box>
                <Text fontSize="xl" fontWeight="bold">
                    Have another account you want to add?
                </Text>
                <Text>We support multiple accounts!</Text>
            </Box>
            <NavButton
                to="/accounts/create"
                text="Create another account"
                variant="secondary"
                px={16}
                py={8}
            />
        </BaseCard>
    );

    const PageContent = () => {
        if (accounts === undefined || accounts.length === 0) {
            return <NoAccounts />;
        } else {
            return accounts
                .map((account, index) => (
                    <AccountCard account={account} index={index} key={index} />
                ))
                .concat(<AddAccount key="add-account" />);
        }
    };

    return (
        <>
            <PageContent />
            <Outlet />
        </>
    );
}
