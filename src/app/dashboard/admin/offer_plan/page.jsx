"use client";
import Table from "@/components/dashboard/Table";
import PrimaryBtn from "@/components/landing/PrimaryBtn";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function offer_plan() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Create Offer Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newOffer, setNewOffer] = useState({
    heading: "",
    startDate: "",
    endDate: "",
    subheading: "",
    ctaText: "",
  });

  const handleCreateOffer = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewOffer({
      heading: "",
      startDate: "",
      endDate: "",
      subheading: "",
      ctaText: "",
    });
  };

  const createBanner = () => {

    alert("Offer Banner Created Successfully");
    closeCreateModal();
  };

  // Reactivation Modal State
  const [showReactivateConfirm, setShowReactivateConfirm] = useState(false);
  const [offerToReactivate, setOfferToReactivate] = useState(null);
  const [reactivateDates, setReactivateDates] = useState({
    start_date: "",
    end_date: "",
  });

  // Converted TableRows to State
  const [offers, setOffers] = useState([
    {
      no: 1,
      offer_name: "Eid offer",
      discount: "50%",
      start_date: "20 Nov 2025",
      end_date: "20 Nov 2025",
      status: true,
    },
    {
      no: 2,
      offer_name: "Puja offer",
      discount: "50%",
      start_date: "20 Nov 2025",
      end_date: "20 Nov 2025",
      status: false,
    },
    {
      no: 3,
      offer_name: "Black Friday",
      discount: "50%",
      start_date: "20 Nov 2025",
      end_date: "20 Nov 2025",
      status: false,
    },
    {
      no: 4,
      offer_name: "Academic Journey",
      discount: "50%",
      start_date: "20 Nov 2025",
      end_date: "20 Nov 2023", // Expired
      status: true,
    },
    {
      no: 5,
      offer_name: "Challenges Faced",
      discount: "50%",
      start_date: "20 Nov 2025",
      end_date: "20 Nov 2025",
      status: false,
    },
    {
      no: 6,
      offer_name: "Educational Goals",
      discount: "50%",
      start_date: "20 Nov 2025",
      end_date: "20 Nov 2025",
      status: false,
    },
  ]);

  const openDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const confirmDelete = () => {
    // In a real app, delete from backend/state
    alert(`User ${userToDelete?.offer_name} deleted successfully`);
    const updatedOffers = offers.filter((o) => o.no !== userToDelete.no);
    setOffers(updatedOffers);
    closeDeleteConfirmation();
  };

  // Logic for Toggle
  const handleToggle = (row) => {
    const isExpired = new Date(row.end_date) < new Date();
    const isActive = !isExpired && row.status;

    if (!isActive) {
      // Open modal to reactivate
      setOfferToReactivate(row);
      setShowReactivateConfirm(true);
      setReactivateDates({ start_date: "", end_date: "" });
    } else {
      // If already active, just toggle to inactive immediately
      const updatedOffers = offers.map((offer) =>
        offer.no === row.no ? { ...offer, status: false } : offer
      );
      setOffers(updatedOffers);
    }
  };

  const closeReactivateConfirmation = () => {
    setShowReactivateConfirm(false);
    setOfferToReactivate(null);
  };

  const confirmReactivation = () => {
    if (!reactivateDates.start_date || !reactivateDates.end_date) {
      alert("Please select both start and end dates.");
      return;
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };

    const updatedOffers = offers.map((offer) =>
      offer.no === offerToReactivate.no
        ? {
          ...offer,
          status: true,
          start_date: formatDate(reactivateDates.start_date),
          end_date: formatDate(reactivateDates.end_date),
        }
        : offer
    );
    setOffers(updatedOffers);
    closeReactivateConfirmation();
  };

  const TableHeads = [
    { Title: "No", key: "no", width: "5%" },
    { Title: "Offer Tittle", key: "offer_name", width: "30%" },
    { Title: "Offer (%)", key: "discount", width: "10%" },
    { Title: "Start  Date", key: "start_date", width: "15%" },
    { Title: "End  Date", key: "end_date", width: "15%" },
    {
      Title: "Status",
      key: "status",
      width: "10%",
      render: (row) => {
        const isExpired = new Date(row.end_date) < new Date();
        const isActive = !isExpired && row.status;

        return (
          <div className="flex items-center justify-center">
            <div
              onClick={() => handleToggle(row)}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 cursor-pointer ${isActive ? "bg-green-500" : "bg-gray-300"
                }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isActive ? "translate-x-6" : "translate-x-0"
                  }`}
              />
            </div>
          </div>
        );
      },
    },
    {
      Title: "Action",
      key: "action",
      width: "5%",
      render: (row) => (
        <>
          <span
            onClick={() => openDeleteConfirmation(row)}
            className="text-red-500 flex justify-center items-center cursor-pointer"
          >
            <Icon icon={"line-md:trash"} width={28} height={28} />
          </span>
        </>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offer Plan</h1>
          <p className="text-gray-500 mt-1">Here’s your progress this week.</p>
        </div>

        <div>
          <PrimaryBtn title={"Create offer"} style={"rounded-full"} hendleClick={handleCreateOffer} />
        </div>
      </div>

      <Table TableHeads={TableHeads} TableRows={offers} />

      {/* Create Offer Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-10 transform transition-all scale-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Create Offer Banner</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-3">Heading Text</label>
                <input
                  type="text"
                  placeholder="Ad text"
                  className="w-full border border-gray-200 rounded-full px-6 py-3.5 text-gray-600 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors"
                  value={newOffer.heading}
                  onChange={(e) => setNewOffer({ ...newOffer, heading: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-3">Started Date</label>
                  <input
                    type="text"
                    placeholder="Ad text"
                    className="w-full border border-gray-200 rounded-full px-6 py-3.5 text-gray-600 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors"
                    value={newOffer.startDate}
                    onChange={(e) => setNewOffer({ ...newOffer, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-3">End Date</label>
                  <input
                    type="text"
                    placeholder="Ad text"
                    className="w-full border border-gray-200 rounded-full px-6 py-3.5 text-gray-600 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors"
                    value={newOffer.endDate}
                    onChange={(e) => setNewOffer({ ...newOffer, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-3">Subheading Text</label>
                  <input
                    type="text"
                    placeholder="Ad text"
                    className="w-full border border-gray-200 rounded-full px-6 py-3.5 text-gray-600 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors"
                    value={newOffer.subheading}
                    onChange={(e) => setNewOffer({ ...newOffer, subheading: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-3">CTA Test</label>
                  <input
                    type="text"
                    placeholder="Ad text"
                    className="w-full border border-gray-200 rounded-full px-6 py-3.5 text-gray-600 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors"
                    value={newOffer.ctaText}
                    onChange={(e) => setNewOffer({ ...newOffer, ctaText: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={createBanner}
                className="w-full py-4 bg-[#FFCA42] text-gray-900 font-medium text-lg rounded-full hover:bg-[#ffc942c2] transition-colors shadow-sm"
              >
                Create Banner
              </button>
            </div>

            {/* Hidden close button overlay for UX optionally, or just relying on standard close logic/button if not in design. 
                Design shows no cancel button, so I will add a way to close it by clicking outside or a subtle X if needed, 
                but for now strictly matching the image which only has "Create Banner". 
                I will add a background click close for usability.
            */}
            <button
              onClick={closeCreateModal}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon icon="lucide:x" width="24" height="24" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all scale-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-600">
              <Icon icon="fluent:delete-24-regular" width="24" height="24" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Offer?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-gray-700">
                {userToDelete.offer_name}
              </span>
              ? This action cannot be undone.
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

      {/* Reactivate Modal */}
      {showReactivateConfirm && offerToReactivate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Activate Offer</h3>
              <button
                onClick={closeReactivateConfirmation}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon icon="lucide:x" width="24" height="24" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FFCA42] focus:border-transparent outline-none"
                  value={reactivateDates.start_date}
                  onChange={(e) =>
                    setReactivateDates({
                      ...reactivateDates,
                      start_date: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FFCA42] focus:border-transparent outline-none"
                  value={reactivateDates.end_date}
                  onChange={(e) =>
                    setReactivateDates({
                      ...reactivateDates,
                      end_date: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeReactivateConfirmation}
                className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmReactivation}
                className="px-5 py-2.5 bg-[#FFCA42] text-black font-medium rounded-lg hover:bg-[#ffc942c2] transition-colors shadow-sm"
              >
                Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
