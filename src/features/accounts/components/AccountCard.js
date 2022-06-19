import Card from "../../../common/components/Card";
import UploadButton from "../../transactions/components/UploadButton";

export default function AccountCard({ account, index }) {
    return (
        <Card
            info={index}
            heading={account.name}
            subheading={account.nickname}
            link={`/accounts/${account.id}`}
        >
            <Card isNested heading="Balance" subheading="SGD 28,381.23"></Card>
            <Card
                isNested
                heading="Transactions"
                subheading="No transactions to display."
            >
                <UploadButton />
            </Card>
        </Card>
    );
}
