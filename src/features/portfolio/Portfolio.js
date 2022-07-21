import Card from "../../common/components/Card";
import { MdConstruction } from "react-icons/md";

export default function Portfolio() {
    return (
        <Card
            isCentered
            icon={<MdConstruction size="200px" />}
            heading="This page is under construction."
            subheading="Please check back again in milestone 3!"
        />
    );
}
