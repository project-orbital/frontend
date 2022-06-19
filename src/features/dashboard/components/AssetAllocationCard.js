import StatCard from "./StatCard";
import PieChart from "../../../common/components/visuals/PieChart";

export default function AssetAllocationCard({ data }) {
    return (
        <StatCard label="Asset Allocation" body={<PieChart data={data} />} />
    );
}
