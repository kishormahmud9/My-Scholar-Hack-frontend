"use client"
"use client";
import { useState } from "react";
import Table from "@/components/dashboard/Table";
import PrimaryBtn from "@/components/landing/PrimaryBtn";
import { Icon } from "@iconify/react";

export default function AddAdmin() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Add Admin Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", number: "" });

  const openDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const confirmDelete = () => {
    alert(`User ${userToDelete?.name} deleted successfully`);
    closeDeleteConfirmation();
  };

  const handleAddAdmin = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewAdmin({ name: "", email: "", number: "" });
  };

  const saveAdmin = () => {
    // Logic to save admin

    alert("Admin Added Successfully");
    closeAddModal();
  };


  const TableHeads = [
    { Title: "No", key: "no", width: "5%" },
    { Title: "Name", key: "name", width: "20%" },
    { Title: "Email", key: "email", width: "30%" },
    { Title: "Phone Number", key: "phone_number", width: "10%" },
    {
      Title: "Action",
      key: "action",
      width: "15%",
      render: (row) => (
        <>
          <span
            onClick={() => openDeleteConfirmation(row)}
            className="text-red-500 flex justify-center items-center cursor-pointer"
          >
            <Icon icon={"line-md:trash"} width={28} height={28} />
          </span>

          {showDeleteConfirm && userToDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all scale-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-600">
                  <Icon icon="fluent:delete-24-regular" width="24" height="24" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">Delete User?</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure you want to remove <span className="font-semibold text-gray-700">{userToDelete.name}</span>? This action cannot be undone.
                </p>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={closeDeleteConfirmation}
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ),
    },
  ];

  const TableRows = [
    {
      "no": 1,
      "name": "Leadership and Community Work",
      "email": "bill.sanders@example.com",
      "phone_number": "(217) 555-0113"
    },
    // ... (rest of rows can stay or be truncated for brevity in this response, but I will keep structure)
    {
      "no": 2,
      "name": "Overcoming Adversity",
      "email": "nathan.roberts@example.com",
      "phone_number": "(671) 555-0110"
    },
    {
      "no": 3,
      "name": "Career Goals",
      "email": "dolores.chambers@example.com",
      "phone_number": "(229) 555-0109"
    },
    {
      "no": 4,
      "name": "Academic Journey",
      "email": "michelle.rivera@example.com",
      "phone_number": "(629) 555-0129"
    },
    {
      "no": 5,
      "name": "Academic Journey",
      "email": "michelle.rivera@example.com",
      "phone_number": "(319) 555-0115"
    },
    {
      "no": 6,
      "name": "Academic Journey",
      "email": "michelle.rivera@example.com",
      "phone_number": "(219) 555-0114"
    },
    {
      "no": 7,
      "name": "Academic Journey",
      "email": "michelle.rivera@example.com",
      "phone_number": "(316) 555-0116"
    },
    {
      "no": 8,
      "name": "Academic Journey",
      "email": "michelle.rivera@example.com",
      "phone_number": "(225) 555-0118"
    },
    {
      "no": 9,
      "name": "Challenges Faced",
      "email": "jessica.hanson@example.com",
      "phone_number": "(252) 555-0126"
    },
    {
      "no": 10,
      "name": "Educational Goals",
      "email": "michael.mitc@example.com",
      "phone_number": "(209) 555-0104"
    }
  ]


  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Information</h1>
          <p className="text-gray-500 mt-1">Here’s your progress this week.</p>
        </div>

        <div>
          <PrimaryBtn title={"Add Admin"} style={"rounded-full"} hendleClick={handleAddAdmin} />
        </div>
      </div>

      <Table TableHeads={TableHeads} TableRows={TableRows} />

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-10 transform transition-all scale-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Add Admin</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-3">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="w-full border border-gray-200 rounded-full px-6 py-3.5 text-gray-600 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-800 mb-3">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full border border-gray-200 rounded-full px-6 py-3.5 text-gray-600 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-base font-semibold text-gray-800 mb-3">Number</label>
                <input
                  type="text"
                  placeholder="Enter number"
                  className="w-full border border-gray-200 rounded-full px-6 py-3.5 text-gray-600 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors"
                  value={newAdmin.number}
                  onChange={(e) => setNewAdmin({ ...newAdmin, number: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={closeAddModal}
                className="flex-1 px-6 py-3.5 border border-red-500 text-red-500 font-medium rounded-full hover:bg-red-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveAdmin}
                className="flex-1 px-6 py-3.5 bg-[#FFCA42] text-gray-900 font-semibold rounded-full hover:bg-[#ffc942c2] transition-colors shadow-sm"
              >
                Save Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
