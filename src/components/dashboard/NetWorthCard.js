import Card from "./Card";
import {StatArrow} from "@chakra-ui/react";
import BarChart from "../charts/BarChart";

export default function NetWorthCard({value, change, data}) {
    return <Card
        label="Net Worth"
        value={`${value} SGD`}
        change={`${change}%`}
        symbol={<StatArrow type={change >= 0 ? "increase" : "decrease"}/>}
        body={<BarChart data={data}/>}
    />
}
