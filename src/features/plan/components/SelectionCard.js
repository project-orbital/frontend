import Card from "../../../common/components/Card";

export default function SelectionCard({ account, index }) {
    return (
        <Card
            info={index}
            heading={account.name}
            subheading={account.nickname}
            link={`/plan/${account.id}`}
        ></Card>
    );
}
