import {Pie, PieChart as Chart, ResponsiveContainer, Sector} from 'recharts';
import {useState} from "react";

// https://recharts.org/en-US/examples/CustomActiveShapePieChart
function renderActiveShape(props) {
    const RADIAN = Math.PI / 180;
    const {cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, name, value} = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (<g>
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
        />
        <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{name}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor}
              fill="#999">{`${value} SGD`}</text>
    </g>);
}

/**
 * Wrapper component for a Recharts pie chart.
 * Each segment of the pie chart is labelled with its key and value.
 * The chart does not have a legend or title.
 *
 * Props:
 * - data: An array of objects, where each object has a key and value.
 * - color: The uniform color of each segment of the pie. Defaults to "#8884d8".
 */
export default function PieChart(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = (_, index) => setActiveIndex(index);

    return <ResponsiveContainer width="100%" height="100%">
        <Chart data={props.data}>
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={props.data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={90}
                fill={props.color || "#8884d8"}
                nameKey="key"
                dataKey="value"
                onMouseEnter={onPieEnter}
            />
        </Chart>
    </ResponsiveContainer>
}
