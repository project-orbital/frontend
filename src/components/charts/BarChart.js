import {Bar, BarChart as Chart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

/**
 * Wrapper component for a Recharts bar chart.
 * The bar chart only accepts one data series, and has neither a legend nor title.
 *
 * Props:
 * - data: An array of objects, where each object has a key and value.
 * - color: The uniform color of the bars. Defaults to "#8884d8".
 */
export default function BarChart(props) {
    return <ResponsiveContainer width="100%" height="100%">
        <Chart data={props.data} margin={{top: 40}}>
            <XAxis dataKey="key"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="value" fill={props.color || "#8884d8"}/>
        </Chart>
    </ResponsiveContainer>
}
