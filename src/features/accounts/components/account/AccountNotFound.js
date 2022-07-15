import PageTemplate from "../../../../common/components/PageTemplate";
import Breadcrumbs from "../../../../common/components/Breadcrumbs";
import BaseCard from "../../../../common/components/cards/BaseCard";
import { Box, Text } from "@chakra-ui/react";
import NavButton from "../../../../common/components/buttons/NavButton";

export default function AccountNotFound() {
    return (
        <PageTemplate page="accounts">
            <Breadcrumbs
                path="Home/Accounts/404"
                links={["/dashboard", "/accounts", `/accounts/not-found`]}
            />
            <BaseCard>
                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        We couldn't find that account.
                    </Text>
                </Box>
                <NavButton to="/accounts" text="Back to accounts" />
            </BaseCard>
        </PageTemplate>
    );
}
