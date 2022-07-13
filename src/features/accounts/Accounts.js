import { Box, SimpleGrid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Card from "../../common/components/Card";
import AccountCard from "./components/AccountCard";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import PageTemplate from "../../common/components/PageTemplate";
import NavButton from "../../common/components/buttons/NavButton";

import { useReadAccountsQuery } from "../../app/api";

/**
 * Route for the accounts page, which renders information for all accounts with the ability to create new accounts.
 * Not to be confused with the `Account` route, which renders information only for a particular account.
 */
export default function Accounts() {
    const { data: accounts, isLoading } = useReadAccountsQuery();

    // The default card to be displayed when no accounts have been created, and hidden otherwise.
    const NoAccounts = () => (
        <Card
            isCentered
            heading="No accounts to display."
            subheading="Get started by creating an account."
        >
            <NavButton to="/accounts/create" text="Create account" />
        </Card>
    );

    // The card to display when at least 1 account is created, with a button for creating another account.
    const AddAccount = () => (
        <Card
            isCentered
            heading="Want to create another account?"
            subheading="Click the button below!"
        >
            <NavButton
                to="/accounts/create"
                text="Create another account"
                bg="dim"
                color="fg"
            />
        </Card>
    );

    const PageContent = () => {
        if (accounts === undefined || accounts.length === 0) {
            return <NoAccounts />;
        } else {
            return accounts
                .map((account, index) => (
                    <AccountCard
                        key={index}
                        index={`#${index + 1}`}
                        account={account}
                    />
                ))
                .concat(<AddAccount key="add-account" />);
        }
    };

    return (
        <PageTemplate page="accounts" isLoading={isLoading}>
            <Breadcrumbs
                path="Home/Accounts"
                links={["/dashboard", "/accounts"]}
            />
            <Box w="100%" h="100%">
                <SimpleGrid minChildWidth="500px" spacing="30px" mb="40px">
                    <PageContent />
                </SimpleGrid>
            </Box>
            <Outlet />
        </PageTemplate>
    );
}
