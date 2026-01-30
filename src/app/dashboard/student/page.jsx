"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import AdminStatsCard from "@/components/dashboard/Admin/AdminStatsCard";
import ScholershipCard from "@/components/dashboard/Student/ScholershipCard";
import Table from "@/components/dashboard/Table";
import { useRouter } from "next/navigation";
import { getDashboardStats } from "@/lib/api";
import { getUserData } from "@/lib/auth";

export default function StudentDashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserData());

    let isMounted = true;

    const fetchDashboardStats = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getDashboardStats();

        if (!isMounted) return;
        if (response.success) {
          setDashboardData(response.data);
        } else {
          setError(response.message || "Failed to load dashboard data");
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err?.message || "Failed to load dashboard data. Try again later.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDashboardStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const TableHeads = [
    {
      Title: "Essay",
      key: "essay",
      width: "70%",
      render: (row) => (
        <div className="text-left pl-4">
          <h3 className="font-semibold text-gray-900 text-base">{row.title}</h3>
          <p className="text-gray-400 text-sm mt-0.5">{row.subject}</p>
        </div>
      ),
    },
    {
      Title: "Status",
      key: "status",
      width: "20%",
      render: (row) => (
        <div className="flex justify-center">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "SAVED" ? "bg-green-100 text-green-700" :
            row.status === "EDITED" ? "bg-blue-100 text-blue-700" :
              "bg-gray-100 text-gray-700"
            }`}>
            {row.status}
          </span>
        </div>
      ),
    },
    {
      Title: "View",
      key: "view",
      width: "10%",
      render: (row) => (
        <div className="flex justify-center">
          <button
            onClick={() => router.push(`/dashboard/student/view_essay?id=${row.id}`)}
            className="w-10 h-10 rounded-lg border border-[#FFCA42] text-[#FFCA42] flex items-center justify-center hover:bg-[#FFF9E5] transition-colors"
          >
            <Icon icon="lucide:eye" width={20} height={20} />
          </button>
        </div>
      ),
    },
  ];

  const stats = [
    {
      icon: "mdi:file-document-edit-outline",
      label: "Total Essays",
      value: dashboardData?.totalEssays?.toString().padStart(2, "0") || "00",
      iconColor: "text-[#ECA20E]",
      bgIconColor: "bg-[#FEF5E3]",
    },
    {
      icon: "mdi:school-outline",
      label: "Scholarship Added",
      value: dashboardData?.scholarshipAdded?.toString().padStart(2, "0") || "00",
      iconColor: "text-[#36B37E]",
      bgIconColor: "bg-[#EBF9F3]",
    },
    {
      icon: "mdi:clock-time-four-outline",
      label: "Upcoming Application Datelines",
      value: dashboardData?.upcomingDeadlineCount?.toString().padStart(2, "0") || "00",
      iconColor: "text-[#FF5630]",
      bgIconColor: "bg-[#FFF0ED]",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || "Student"}
        </h1>
        <p className="text-gray-500 mt-1">Here’s your progress this week.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <AdminStatsCard
            key={idx}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            iconColor={stat.iconColor}
            bgIconColor={stat.bgIconColor}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Your Essays Table */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900">Your Essays</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {isLoading ? (
              <div className="text-center py-20 text-gray-500">Loading essays...</div>
            ) : error ? (
              <div className="text-center py-20 text-red-500">{error}</div>
            ) : dashboardData?.essays?.length > 0 ? (
              <Table TableHeads={TableHeads} TableRows={dashboardData.essays} />
            ) : (
              <div className="text-center py-20 text-gray-500">No essays found. Start writing!</div>
            )}
          </div>
        </div>

        {/* Right Column: Recommended Scholarships */}
        <div className="w-full">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recommended Scholarships
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {isLoading ? (
              <div className="col-span-2 text-gray-500 text-center py-10 bg-white rounded-2xl border border-gray-100">
                Loading recommendations...
              </div>
            ) : error ? (
              <div className="col-span-2 text-red-500 text-center py-10 bg-white rounded-2xl border border-gray-100">
                {error}
              </div>
            ) : dashboardData?.recommendations?.length > 0 ? (
              dashboardData.recommendations.map((item, idx) => (
                <ScholershipCard
                  key={idx}
                  Details={item.scholarship}
                  onApply={() =>
                    router.push("/dashboard/student/all_scholarship")
                  }
                  compact={true}
                />
              ))
            ) : (
              <div className="col-span-2 text-gray-500 text-center py-10 bg-white rounded-2xl border border-gray-100">
                No recommendations available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
