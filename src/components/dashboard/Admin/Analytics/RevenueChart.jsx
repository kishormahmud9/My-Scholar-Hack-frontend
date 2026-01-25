"use client";
import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const dataYear = [
    { name: "Jan", value: 8 },
    { name: "Feb", value: 18 },
    { name: "Mar", value: 10 },
    { name: "Apr", value: 15 },
    { name: "May", value: 20 },
    { name: "Jun", value: 18 },
    { name: "Jul", value: 30 },
    { name: "Aug", value: 20 },
    { name: "Sep", value: 16 },
    { name: "Oct", value: 14 },
    { name: "Nov", value: 20 },
];

const dataMonth = [
    { name: "Week 1", value: 5 },
    { name: "Week 2", value: 12 },
    { name: "Week 3", value: 8 },
    { name: "Week 4", value: 15 },
];

export default function RevenueChart() {
    const [period, setPeriod] = useState("1 Year");

    const getData = () => {
        return period === "1 Year" ? dataYear : dataMonth;
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Revenue</h3>
                <div className="bg-gray-100 rounded-lg p-1 flex">
                    {["1 Year", "Month"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setPeriod(item)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${period === item
                                ? "bg-[#FFCA42] text-white shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={getData()}
                        margin={{ top: 20, right: 30, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#22C55E"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 8, fill: "#22C55E", stroke: "white", strokeWidth: 2 }}
                            animationDuration={2000}
                        />
                        {/* Custom Label for highest point if needed, or handled by activeDot on hover/default */}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
