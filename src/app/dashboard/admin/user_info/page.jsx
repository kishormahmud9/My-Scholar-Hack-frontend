"use client"
import Table from "@/components/dashboard/Table";

export default function UserInfo() {
  const TableHeads = [
    { Title: "No", key: "no", width: "5%" },
    { Title: "Name", key: "name", width: "20%" },
    { Title: "Email", key: "email", width: "30%" },
    { Title: "Total Essays", key: "total_essays", width: "10%" },
    { Title: "Subscription Plans", key: "subscription_plans", width: "20%" },
    {
      Title: "Status",
      key: "status",
      width: "15%",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${row.status === "Active"
            ? "bg-[#E6F8EF] text-[#00A47E]"
            : "bg-[#FEE4E2] text-[#B42318]"
            }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const TableRows = [
    {
      "no": 1,
      "name": "Leadership and Community Work",
      "email": "bill.sanders@example.com",
      "total_essays": "05",
      "subscription_plans": "Essay Hack",
      "status": "Inaction"
    },
    {
      "no": 2,
      "name": "Overcoming Adversity",
      "email": "nathan.roberts@example.com",
      "total_essays": "02",
      "subscription_plans": "Essay Hack Plus",
      "status": "Active"
    },
    {
      "no": 3,
      "name": "Career Goals",
      "email": "dolores.chambers@example.com",
      "total_essays": "02",
      "subscription_plans": "Essay Hack",
      "status": "Inaction"
    },
    {
      "no": 4,
      "name": "Academic Journey",
      "email": "michelle.rivera@example.com",
      "total_essays": "04",
      "subscription_plans": "Essay Hack Pro",
      "status": "Active"
    },
    {
      "no": 5,
      "name": "Academic Journey",
      "email": "michelle.rivera@example.com",
      "total_essays": "04",
      "subscription_plans": "Essay Hack Pro",
      "status": "Active"
    },
    {
      "no": 6,
      "name": "Academic Journey",
      "email": "michelle.rivera@example.com",
      "total_essays": "04",
      "subscription_plans": "Essay Hack Pro",
      "status": "Active"
    },
    {
      "no": 7,
      "name": "Academic Journey",
      "email": "michelle.rivera@example.com",
      "total_essays": "04",
      "subscription_plans": "Essay Hack Pro",
      "status": "Active"
    },
    {
      "no": 8,
      "name": "Academic Journey",
      "email": "michelle.rivera@example.com",
      "total_essays": "04",
      "subscription_plans": "Essay Hack Pro",
      "status": "Active"
    },
    {
      "no": 9,
      "name": "Challenges Faced",
      "email": "jessica.hanson@example.com",
      "total_essays": "41",
      "subscription_plans": "Essay Hack",
      "status": "Active"
    },
    {
      "no": 10,
      "name": "Educational Goals",
      "email": "michael.mitc@example.com",
      "total_essays": "12",
      "subscription_plans": "Essay Hack",
      "status": "Active"
    }
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Information</h1>
        <p className="text-gray-500 mt-1">Here’s your progress this week.</p>
      </div>

      <Table TableHeads={TableHeads} TableRows={TableRows} />
    </div>
  );
}
