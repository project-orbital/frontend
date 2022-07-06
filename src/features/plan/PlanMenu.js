import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import { useSelector } from "react-redux";
import { selectAccounts } from "../accounts/state/accounts";
import { Box, SimpleGrid } from "@chakra-ui/react";
import SelectionCard from "./components/SelectionCard";

export default function PlanMenu() {
    const accounts = useSelector(selectAccounts);

    return (
        <PageTemplate page="Plan">
            <Breadcrumbs
                path="Home/Budget Planner"
                links={["/dashboard", "/planMenu"]}
            />
            <Box
                fontWeight="semibold"
                bg="gray.300"
                w="100%"
                p={5}
                color="black"
                rounded="xl"
            >
                Select the account that you want to fetch the expenditure data
                to create a budgeting plan!
            </Box>

            <Box w="100%" h="100%">
                <SimpleGrid minChildWidth="500px" spacing="30px" mb="40px">
                    {accounts.map((account, index) => (
                        <SelectionCard
                            key={index}
                            index={`#${index + 1}`}
                            account={account}
                        />
                    ))}
                </SimpleGrid>
            </Box>
        </PageTemplate>
    );
}
