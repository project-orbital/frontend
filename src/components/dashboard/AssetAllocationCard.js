import Card from "./Card";
import PieChart from "../charts/PieChart";

export default function AssetAllocationCard({data}) {
    return <Card
        label="Asset Allocation"
        body={<PieChart data={data}/>}
    />
}
