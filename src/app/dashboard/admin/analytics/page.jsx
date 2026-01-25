"use client";
import RevenueChart from "@/components/dashboard/Admin/Analytics/RevenueChart";
import EssayGenerationChart from "@/components/dashboard/Admin/Analytics/EssayGenerationChart";
import ActiveUserChart from "@/components/dashboard/Admin/Analytics/ActiveUserChart";

export default function Analytics() {
    return (
        <div className="p-6 bg-[#FAFAFA] min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-500 mt-1">Here's your progress this week.</p>
            </div>

            {/* Top Row: Revenue and Essay Generation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="h-[400px]">
                    <RevenueChart />
                </div>
                <div className="h-[400px]">
                    <EssayGenerationChart />
                </div>
            </div>

            {/* Bottom Row: Active Users (Full Width) */}
            <div className="h-[500px]">
                <ActiveUserChart />
            </div>
        </div>
    );
}
