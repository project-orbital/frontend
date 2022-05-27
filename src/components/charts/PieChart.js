import {Pie, PieChart as Chart, ResponsiveContainer, Tooltip} from 'recharts';

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
    let renderLabel = entry => `${entry.key}: ${entry.value}`;

    return <ResponsiveContainer width="100%" height="100%">
        <Chart data={props.data} margin={{top: 40}}>
            <Tooltip/>
            <Pie data={props.data}
                 nameKey="key"
                 dataKey="value"
                 innerRadius={80}
                 fill={props.color || "#8884d8"}
                 label={renderLabel}/>
        </Chart>
    </ResponsiveContainer>
}
