"use client";
import Table from "@/components/dashboard/Table";
import { Icon } from "@iconify/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import ViewEssayModal from "@/components/dashboard/Student/ViewEssayModal";
import EditEssayModal from "@/components/dashboard/Student/EditEssayModal";
import Loader from "@/components/Loader";
import CompareSelectionModal from "@/components/dashboard/Student/CompareSelectionModal";
import { apiPost, apiGet } from "@/lib/api";

// Static data removed
const ESSAY_DATA = [];

function ViewEssayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [essays, setEssays] = useState([]);

  const fetchEssays = async () => {
     setLoading(true);
     try {
         const response = await apiGet("/generate-essay");
         if (response.success) {
            setEssays(response.data || []);
         }
     } catch (error) {
         console.error("Failed to fetch essays:", error);
     } finally {
         setLoading(false);
     }
  };

  useEffect(() => {
     fetchEssays();
  }, []);

  // Initialize filter from URL
  useEffect(() => {
    const subjectParam = searchParams.get("subject");
    if (subjectParam) {
      // Decode and set, ensuring it exists in our list roughly 
      // (or just set it, user can clear it)
      setSelectedSubject(decodeURIComponent(subjectParam));
    }
  }, [searchParams]);

  const uniqueSubjects = ["All Subjects", ...new Set(essays.map(item => item.subject))];

  const filteredEssays = selectedSubject === "All Subjects"
    ? essays
    : essays.filter(essay => essay.subject === selectedSubject);

  const handleViewClick = async (row) => {
    // Ideally show a loader for the specific row or global
    // But since we are opening a modal, we can maybe set selectedEssay to a loading state?
    // Or just fetch then open.
    try {
        setLoading(true); // Using global loader for simplicity as it covers the screen usually or we can check. 
        // Actually global loader replaces the table. That might be annoying.
        // Let's rely on the fact that it's fast or just show the table loader.
        
        const response = await apiGet(`/generate-essay/${row.id}`);
        if (response.success) {
             setSelectedEssay(response.data);
             setIsViewModalOpen(true);
        } else {
             // Fallback to row data if fetch fails? Or alert.
             alert("Failed to fetch essay details.");
        }
    } catch (error) {
        console.error("Error fetching essay details:", error);
        alert("Failed to load essay.");
    } finally {
        setLoading(false);
    }
  };

  const handleCompareClick = () => {
    setIsViewModalOpen(false);
    setIsCompareModalOpen(true);
  };

  const handleEditClick = (row) => {
    setSelectedEssay(row);
    setIsEditModalOpen(true);
  };

  const handleUpdateSuccess = (updatedEssay) => {
      // Update the essay in the local list
      setEssays(prev => prev.map(e => e.id === updatedEssay.id ? updatedEssay : e));
      // Also update selected if needed
      if (selectedEssay && selectedEssay.id === updatedEssay.id) {
          setSelectedEssay(updatedEssay);
      }
  };

  const handleConfirmCompare = (targetEssay) => {
    setIsCompareModalOpen(false);
    router.push(`/dashboard/student/view_essay/compare_essay?original=${selectedEssay.id}&target=${targetEssay.id}`);
  };

  const handleSelectEssay = async (essay) => {
    // Update Application Tracker if active
    const activeId = localStorage.getItem("current_active_scholarship");
    if (activeId) {
      const currentData = JSON.parse(localStorage.getItem("application_tracker_data") || "[]");
      const appIndex = currentData.findIndex(item => item.id === activeId);

      if (appIndex >= 0) {
        // Sync to backend
        try {
            await apiPost("/application/save", {
                scholarshipId: activeId,
                essayId: essay.id
            });
        } catch (error) {
            console.error("Failed to save application to backend:", error);
            // Optionally show toast error, but proceeding with local save for now
        }

        currentData[appIndex] = {
          ...currentData[appIndex],
          status: "Done",
          essayTitle: essay.title,
          essayContent: essay.content
        };
        localStorage.setItem("application_tracker_data", JSON.stringify(currentData));
        localStorage.removeItem("current_active_scholarship");
      }
    }

    // Redirect to Application Tracker
    router.push('/dashboard/student/application_tracker');
  };

  const TableHeads = [
    { Title: "ID", key: "id", width: "10%" },
    { Title: "Essay Title", key: "title", width: "40%" },
    { Title: "Subject", key: "subject", width: "30%" },
    {
      Title: "Edit",
      key: "edit",
      width: "10%",
      render: (row) => (
        <button
          onClick={() => handleEditClick(row)}
          className="text-[#FFCA42] hover:bg-[#F8F9FA] p-2 rounded-full transition-colors"
        >
          <Icon icon="lucide:edit-3" width="20" height="20" />
        </button>
      )
    },
    {
      Title: "View",
      key: "view",
      width: "10%",
      render: (row) => (
        <button
          onClick={() => handleViewClick(row)}
          className="text-[#6D6E73] hover:bg-[#F8F9FA] p-2 rounded-full transition-colors"
        >
          <Icon icon="lucide:eye" width="20" height="20" />
        </button>
      )
    },
  ];

  if (loading) return <Loader fullScreen={false} />;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold mb-1">View Essay</h1>
          <p className="text-[#6D6E73]">Manage and view your generated essays.</p>
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="px-4 py-2 bg-white border border-[#E2E4E9] rounded-lg text-sm font-medium text-[#0C0C0D] hover:bg-[#F8F9FA] shadow-sm flex items-center gap-2 min-w-[180px] justify-between"
          >
            <div className="flex items-center gap-2">
              <Icon icon="lucide:filter" width={16} height={16} className="text-[#6D6E73]" />
              <span className="truncate max-w-[140px]">{selectedSubject}</span>
            </div>
            <Icon icon={showFilterDropdown ? "lucide:chevron-up" : "lucide:chevron-down"} width={16} height={16} className="text-[#6D6E73]" />
          </button>

          {showFilterDropdown && (
            <div className="absolute right-0 z-20 mt-2 w-56 rounded-lg bg-white shadow-xl border border-[#E2E4E9] py-1 max-h-60 overflow-y-auto">
              {uniqueSubjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => {
                    setSelectedSubject(subject);
                    setShowFilterDropdown(false);
                  }}
                  className={`block px-4 py-2.5 text-sm w-full text-left transition-colors ${selectedSubject === subject
                    ? "bg-[#FFF9E5] text-[#0C0C0D] font-medium"
                    : "text-[#6D6E73] hover:bg-[#F8F9FA]"
                    }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Table TableHeads={TableHeads} TableRows={filteredEssays} />

      {/* Modals */}
      <ViewEssayModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        essay={selectedEssay}
        onCompare={handleCompareClick}
        onSelect={handleSelectEssay}
      />

      <EditEssayModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        essay={selectedEssay}
        onUpdate={handleUpdateSuccess}
      />

      <CompareSelectionModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        originalEssay={selectedEssay}
        allEssays={essays}
        onConfirmSelection={handleConfirmCompare}
      />
    </div>
  );
}

export default function ViewEssay() {
  return (
    <Suspense fallback={<Loader fullScreen={false} />}>
      <ViewEssayContent />
    </Suspense>
  );
}
