import Card from "../visuals/Card";
import UploadButton from "../upload/UploadButton";

export default function AccountCard({account, index}) {
    return <Card
        info={index}
        heading={account.name}
        subheading={account.nickname}
        link={`/accounts/${account.id}`}
    >
        <Card
            isNested
            heading="Balance"
            subheading="SGD 28,381.23"
        >
        </Card>
        <Card
            isNested
            heading="Transactions"
            subheading="No transactions to display."
        >
            <UploadButton/>
        </Card>
    </Card>;
}
