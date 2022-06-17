import StatCard from "./StatCard";
import {StatArrow} from "@chakra-ui/react";
import BarChart from "../visuals/BarChart";

export default function NetWorthCard({value, change, data}) {
    return <StatCard
        label="Net Worth"
        value={`${value} SGD`}
        change={`${change}%`}
        symbol={<StatArrow type={change >= 0 ? "increase" : "decrease"}/>}
        body={<BarChart data={data}/>}
    />
}
