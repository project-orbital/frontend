import {
    Area,
    AreaChart as Chart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { AspectRatio } from "@chakra-ui/react";

export default function AreaChart({ data }) {
    return (
        <AspectRatio ratio={16 / 10}>
            <ResponsiveContainer width="100%" height="100%">
                <Chart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colory" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="#8884d8"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="#8884d8"
                                stopOpacity={0}
                            />
                        </linearGradient>
                        <linearGradient
                            id="colorPv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#82ca9d"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="#82ca9d"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="x"
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
                    <Area
                        type="monotone"
                        dataKey="y"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colory)"
                    />
                </Chart>
            </ResponsiveContainer>
        </AspectRatio>
    );
}
