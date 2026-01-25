"use client";
import Table from "@/components/dashboard/Table";
import { Icon } from "@iconify/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import ViewEssayModal from "@/components/dashboard/Student/ViewEssayModal";
import CompareSelectionModal from "@/components/dashboard/Student/CompareSelectionModal";

// Moved outside to be reusable or just statically defined here for now
const ESSAY_DATA = [
  {
    id: "01",
    title: "The Impact of Artificial Intelligence on Modern Society",
    subject: "Computer Science & IT",
    date: "2023-10-15",
    content: "Artificial Intelligence (AI) is transforming every aspect of our lives... (Full essay content would go here)"
  },
  {
    id: "02",
    title: "Sustainable Urban Planning in the 21st Century",
    subject: "Urban Studies",
    date: "2023-11-02",
    content: "As urbanization accelerates, the need for sustainable planning becomes critical..."
  },
  {
    id: "03",
    title: "Analysis of Shakespeare's Macbeth",
    subject: "English Literature",
    date: "2023-11-20",
    content: "Macbeth is a tragedy that explores the damaging effects of political ambition..."
  },
  {
    id: "04",
    title: "The Role of Microorganisms in Ecosystems",
    subject: "Biology",
    date: "2023-12-05",
    content: "Microorganisms play a vital role in nutrient cycling and decomposition..."
  },
  {
    id: "05",
    title: "Economic Implications of Global Warming",
    subject: "Economics",
    date: "2023-12-10",
    content: "Global warming introduces significant risks to the global economy..."
  },
  {
    id: "06",
    title: "Modern Art Movements: 1900-1950",
    subject: "Art History",
    date: "2023-12-15",
    content: "The early 20th century saw an explosion of new artistic styles..."
  },
  {
    id: "07",
    title: "Introduction to Quantum Mechanics",
    subject: "Physics",
    date: "2023-12-18",
    content: "Quantum mechanics describes the behavior of matter and light on the atomic scale..."
  },
  // Adding a duplicate subject for testing comparison
  {
    id: "08",
    title: "Machine Learning Algorithms",
    subject: "Computer Science",
    date: "2023-10-20",
    content: "Machine learning, a subset of AI, focuses on building systems that learn from data..."
  }
];

function ViewEssayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Initialize filter from URL
  useEffect(() => {
    const subjectParam = searchParams.get("subject");
    if (subjectParam) {
      // Decode and set, ensuring it exists in our list roughly 
      // (or just set it, user can clear it)
      setSelectedSubject(decodeURIComponent(subjectParam));
    }
  }, [searchParams]);

  const uniqueSubjects = ["All Subjects", ...new Set(ESSAY_DATA.map(item => item.subject))];

  const filteredEssays = selectedSubject === "All Subjects"
    ? ESSAY_DATA
    : ESSAY_DATA.filter(essay => essay.subject === selectedSubject);

  const handleViewClick = (row) => {
    setSelectedEssay(row);
    setIsViewModalOpen(true);
  };

  const handleCompareClick = () => {
    setIsViewModalOpen(false);
    setIsCompareModalOpen(true);
  };

  const handleConfirmCompare = (targetEssay) => {
    setIsCompareModalOpen(false);
    router.push(`/dashboard/student/view_essay/compare_essay?original=${selectedEssay.id}&target=${targetEssay.id}`);
  };

  const handleSelectEssay = (essay) => {
    // Update Application Tracker if active
    const activeId = localStorage.getItem("current_active_scholarship");
    if (activeId) {
      const currentData = JSON.parse(localStorage.getItem("application_tracker_data") || "[]");
      const appIndex = currentData.findIndex(item => item.id === activeId);

      if (appIndex >= 0) {
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
          onClick={() => router.push('/dashboard/student/essays/edit_essay')}
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

      <CompareSelectionModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        originalEssay={selectedEssay}
        allEssays={ESSAY_DATA}
        onConfirmSelection={handleConfirmCompare}
      />
    </div>
  );
}

export default function ViewEssay() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewEssayContent />
    </Suspense>
  );
}
