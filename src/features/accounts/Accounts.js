import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAccounts } from "./state/accounts";
import Card from "../../common/components/Card";
import AccountCard from "./components/AccountCard";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import PageTemplate from "../../common/components/PageTemplate";

/**
 * Route for the accounts page, which renders information for all accounts with the ability to create new accounts.
 * Not to be confused with the `Account` route, which renders information only for a particular account.
 */
export default function Accounts() {
    const navigate = useNavigate();
    const accounts = useSelector(selectAccounts);

    // The default card to be displayed when no accounts have been created, and hidden otherwise.
    const NoAccounts = () => (
        <Card
            isCentered
            heading="No accounts to display."
            subheading="Get started by creating an account."
        >
            <Button h="60px" onClick={() => navigate("/accounts/create")}>
                Create an account
            </Button>
        </Card>
    );

    // The card to display when at least 1 account is created, with a button for creating another account.
    const AddAccount = () => (
        <Card
            isCentered
            heading="Want to create another account?"
            subheading="Click the button below!"
        >
            <Button h="60px" onClick={() => navigate("/accounts/create")}>
                Create another account
            </Button>
        </Card>
    );

    return (
        <PageTemplate page="accounts">
            <Breadcrumbs
                path="Home/Accounts"
                links={["/dashboard", "/accounts"]}
            />
            {/* Render each account as a card in a responsive grid. */}
            <Box w="100%" h="100%">
                <SimpleGrid minChildWidth="400px" spacing="30px">
                    {accounts.map((account, index) => (
                        <AccountCard
                            key={index}
                            index={`#${index + 1}`}
                            account={account}
                        />
                    ))}
                    {accounts.length > 0 ? <AddAccount /> : <NoAccounts />}
                </SimpleGrid>
            </Box>
            <Outlet />
        </PageTemplate>
    );
}
