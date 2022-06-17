import Card from "../visuals/Card";
import UploadButton from "../upload/UploadButton";
import {SimpleGrid, Spacer} from "@chakra-ui/react";

export default function AccountCard({account, index}) {
    return <Card
        info={index}
        heading={account.name}
        subheading={account.nickname}
        link="/dashboard"
    >
        <SimpleGrid minChildWidth="300px" spacing="10px">
            <Card
                isNested
                heading="Balance"
                subheading="SGD 28,381.23"
            >
            </Card>
            <Spacer/>
            <Card
                isNested
                heading="Transactions"
                subheading="No transactions to display."
            >
                <UploadButton/>
            </Card>
        </SimpleGrid>
    </Card>;
}
