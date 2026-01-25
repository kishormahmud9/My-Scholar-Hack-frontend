"use client";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const dataLine = [
  { name: "0", value: 30, value2: 10 },
  { name: "10", value: 25, value2: 15 },
  { name: "20", value: 28, value2: 18 },
  { name: "30", value: 15, value2: 12 },
  { name: "40", value: 22, value2: 30 },
  { name: "50", value: 15, value2: 25 },
  { name: "60", value: 35, value2: 18 },
  { name: "70", value: 38, value2: 18 },
  { name: "80", value: 30, value2: 40 },
  { name: "90", value: 22, value2: 30 },
  { name: "100", value: 35, value2: 20 },
  { name: "110", value: 35, value2: 38 },
  { name: "120", value: 40, value2: 20 },
];

const dataBar = [
  { name: "1", value: 20 },
  { name: "2", value: 6 },
  { name: "3", value: 14 },
  { name: "4", value: 22 },
  { name: "5", value: 10 },
];

export default function ActiveUserChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col md:flex-row gap-8">
      {/* Left: Line Chart */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-8">Active User</h3>
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dataLine}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={true}
                horizontal={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                dy={10}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4F46E5" // Purple
                strokeWidth={2}
                dot={{ r: 4, fill: "#4F46E5" }}
                animationDuration={2000}
              />
              <Line
                type="monotone"
                dataKey="value2"
                stroke="#FFCA42" // Yellow
                strokeWidth={2}
                dot={{ r: 4, fill: "#FFCA42" }}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right: Info & Bar Chart */}
      <div className="w-[20%] md:w-1/3 flex flex-col justify-between">
        <div >
          <h3 className="text-xl font-bold text-gray-800 mb-2">Weekly</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 ">This Week</p>
              <p className="text-xl font-bold text-[#4F46E5]">+ 20%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 ">Last Week</p>
              <p className="text-xl font-bold text-[#FFCA42]">+ 13%</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800">Impression</h3>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataBar} barSize={25}>
              <Bar
                dataKey="value"
                radius={[4, 4, 4, 4]}
                animationDuration={2000}
              >
                <Cell fill="#4338CA" />
                <Cell fill="#4338CA" />
                <Cell fill="#4338CA" />
                <Cell fill="#4338CA" />
                <Cell fill="#4338CA" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between items-center ">
          <h4 className="text-2xl font-bold text-gray-800">12.345</h4>
          <p className="text-sm text-gray-500">
            <span className="text-[#FFCA42]">5.4%</span> than last year
          </p>
        </div>
      </div>
    </div>
  );
}
