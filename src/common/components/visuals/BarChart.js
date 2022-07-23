import {
    Bar,
    BarChart as Chart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

/**
 * Wrapper component for a Recharts bar chart.
 * The bar chart only accepts one data series, and has neither a legend nor title.
 *
 * - data: An array of objects, where each object has a key and value.
 */
export default function BarChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <Chart data={data} margin={{ top: 40 }}>
                <XAxis
                    dataKey="key"
                    tickLine={false}
                    style={{
                        fontSize: "0.75rem",
                    }}
                />
                <YAxis
                    tickCount={4}
                    tickLine={false}
                    style={{
                        fontSize: "0.75rem",
                    }}
                />
                <Tooltip />
                <CartesianGrid strokeDasharray="4 1 2" />
                <Bar dataKey="value" fill="#662B42" />
            </Chart>
        </ResponsiveContainer>
    );
}
