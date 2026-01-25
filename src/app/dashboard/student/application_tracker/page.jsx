"use client";
import Table from "@/components/dashboard/Table";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

// Simple modal for viewing essay content
function EssayPreviewModal({ isOpen, onClose, title, content }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl">
                <div className="flex items-center justify-between p-4 border-b border-[#E2E4E9]">
                    <h3 className="text-xl font-bold text-[#0C0C0D]">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-[#F8F9FA] rounded-full transition-colors">
                        <Icon icon="mdi:close" width="24" height="24" className="text-[#6D6E73]" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    <div className="prose prose-sm max-w-none text-[#4A4B57]">
                        {content ? (
                            <div className="whitespace-pre-wrap">{content}</div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 text-[#6D6E73]">
                                <Icon icon="mdi:file-document-outline" width="48" height="48" className="mb-2 opacity-50" />
                                <p>No content available to preview.</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-4 border-t border-[#E2E4E9] flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[#F8F9FA] text-[#0C0C0D] font-medium rounded-lg hover:bg-[#E2E4E9] transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ApplicationTracker() {
    const [applications, setApplications] = useState([]);
    const [selectedEssay, setSelectedEssay] = useState(null); // { title, content }
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Load data from localStorage
        const savedData = localStorage.getItem("application_tracker_data");
        if (savedData) {
            setApplications(JSON.parse(savedData));
        }
    }, []);

    const handleEssayClick = (app) => {
        if (app.essayTitle && app.essayTitle !== "—" && app.essayTitle !== "Pending Selection...") {
            setSelectedEssay({ title: app.essayTitle, content: app.essayContent });
            setIsModalOpen(true);
        }
    };

    const TableHeads = [
        { Title: "No", key: "no", width: "5%", render: (_, idx) => idx + 1 },
        { Title: "Scholarship Title", key: "title", width: "25%" },
        {
            Title: "Essay",
            key: "essayTitle",
            width: "25%",
            render: (row) => (
                <button
                    onClick={() => handleEssayClick(row)}
                    disabled={!row.essayContent}
                    className={`text-left font-medium truncate max-w-[200px] ${row.essayContent ? 'text-[#5069E5] hover:underline cursor-pointer' : 'text-[#6D6E73] cursor-default'}`}
                >
                    {row.essayTitle || "Pending Selection..."}
                </button>
            )
        },
        { Title: "Amount", key: "amount", width: "15%" },
        {
            Title: "Deadline",
            key: "deadline",
            width: "15%",
            render: (row) => {
                if (!row.deadline) return <span className="text-[#6D6E73]">-</span>;

                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const deadlineDate = new Date(row.deadline);
                deadlineDate.setHours(0, 0, 0, 0);

                const diffTime = deadlineDate - today;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                let colorClass = "text-[#0D894F]"; // Default Green (Future)
                if (diffDays < 0) {
                    colorClass = "text-[#F04438]"; // Red (Expired)
                } else if (diffDays >= 0 && diffDays <= 2) {
                    colorClass = "text-[#E46A11]"; // Yellow/Orange (Near)
                }

                return (
                    <span className={`font-medium ${colorClass}`}>
                        {row.deadline}
                    </span>
                );
            }
        },
        {
            Title: "Status",
            key: "status",
            width: "15%",
            render: (row) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${row.status === "Done"
                        ? "bg-[#D1FADF] text-[#0D894F]" // Green for Done
                        : "bg-[#FEF0C7] text-[#E46A11]" // Orange for Processing
                        }`}
                >
                    {row.status}
                </span>
            ),
        },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">Application Tracker</h1>
            <p className="text-[#6D6E73] mb-6">Track the status of your scholarship applications.</p>

            {applications.length > 0 ? (
                <Table TableHeads={TableHeads} TableRows={applications} />
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-[#E2E4E9]">
                    <div className="bg-[#F8F9FA] p-4 rounded-full mb-4">
                        <Icon icon="lucide:clipboard-list" width="32" height="32" className="text-[#6D6E73]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0C0C0D] mb-1">No Applications Yet</h3>
                    <p className="text-[#6D6E73] max-w-sm text-center">
                        Start by applying to a scholarship from the "All Scholarships" page.
                    </p>
                </div>
            )}

            {/* Essay Preview Modal */}
            <EssayPreviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedEssay?.title}
                content={selectedEssay?.content}
            />
        </div>
    );
}
