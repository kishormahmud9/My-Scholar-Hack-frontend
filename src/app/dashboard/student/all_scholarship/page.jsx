"use client";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ScholershipCard from "@/components/dashboard/Student/ScholershipCard";
import Loader from "@/components/Loader";
import { apiPost, apiGet } from "@/lib/api";

export default function AllScholarship() {
  const [recommendedScholarships, setRecommendedScholarships] = useState([]);
  const [allScholarships, setAllScholarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    
    // Function to load data
    const loadData = async (page) => {
        setLoading(true);
        try {
            // Parallel fetch: Recommended (Page 1 only) & All Scholarships (Paginated)
            const promises = [
                apiGet(`/essay-recommendation/scholarships?page=${page}&limit=${itemsPerPage}`)
            ];

            let recomPromise = null;
            if (page === 1) {
                // Fetch recommendations specifically
                recomPromise = apiGet("/essay-recommendation");
                promises.push(recomPromise);
            }

            const results = await Promise.all(promises);
            const apiRes = results[0];
            const recomRes = page === 1 ? results[1] : null;

            if (isMounted) {
                // 1. All Scholarships
                if (apiRes && apiRes.success) {
                    let data = apiRes.data || [];
                    
                    // Sort: Items with amount come first
                    data = data.sort((a, b) => {
                        const getVal = (val) => {
                             if (!val) return 0;
                             const num = Number(String(val).replace(/[^0-9.-]+/g,""));
                             return isNaN(num) ? 0 : num;
                        };
                        const amountA = getVal(a.amount);
                        const amountB = getVal(b.amount);
                        
                        if (amountA > 0 && amountB === 0) return -1;
                        if (amountA === 0 && amountB > 0) return 1;
                        if (amountA > 0 && amountB > 0) return amountB - amountA; // Descending
                        return 0;
                    });
    
                    setAllScholarships(data);
                    
                    if (apiRes.meta) {
                        setTotalPages(apiRes.meta.totalPage);
                    }
                }

                // 2. Recommended Scholarships (Logic from Dashboard)
                if (recomRes && recomRes.success) {
                    const rawRecom = recomRes.data || [];
                    // Apply filtering logic: Amount > 0 && Description exists
                    const filteredRecom = rawRecom.filter(item => {
                         const scholarship = item.scholarship || item;
                         const hasAmount = scholarship.amount && Number(String(scholarship.amount).replace(/[^0-9.-]+/g,"")) > 0;
                         const hasDescription = scholarship.description && scholarship.description.trim().length > 0;
                         return hasAmount && hasDescription;
                    }).slice(0, 4).map(item => item.scholarship || item);

                    setRecommendedScholarships(filteredRecom);
                }
            }
        } catch (err) {
            console.error("Failed to load scholarships", err);
        } finally {
            if (isMounted) setLoading(false);
        }
    };

    // Initial load & Page Change
    loadData(currentPage);

    // Background Sync Logic (Only on mount)
    if (currentPage === 1) {
        const syncResult = async () => {
            try {
                await apiPost("/essay-recommendation/sync-scholarships");
                // Reload data after sync
                if (isMounted) loadData(1);
            } catch (error) {
                console.error("Background sync failed:", error);
            }
        };
        syncResult();
    }

    return () => { isMounted = false; };
  }, [currentPage]);

  if (loading) return <Loader fullScreen={false} />;

  const Recomended = recommendedScholarships;
  const subjects = [...new Set(allScholarships.map((item) => item.subject))];

  const handleApplyClick = (scholarship) => {
    setSelectedScholarship(scholarship);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedScholarship(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
          All Scholarships
        </h1>
        <p className="text-sm sm:text-base font-medium text-gray-600 max-w-4xl leading-relaxed">
          We collect scholarship information from various reliable sources and
          bring them together on one platform. Based on your profile details, we
          analyze and match the most relevant opportunities. The scholarships
          shown here are carefully recommended because they best align with your
          background and eligibility.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Recommended Scholarships
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="bg-white border border-gray-200 rounded-lg py-2.5 px-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
            <Icon icon="lucide:search" width={20} height={20} className="text-gray-400" />
            <input
              type="search"
              placeholder="Search Scholarships"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="focus:outline-none text-sm w-full sm:w-64"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="px-5 py-2.5 border border-gray-200 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 justify-center min-w-[150px]"
            >
              <Icon icon="lucide:filter" width={18} height={18} />
              <span className="flex-1 text-left">{selectedSubject === "All Subjects" ? "Categorize" : selectedSubject}</span>
              <Icon icon={showCategoryDropdown ? "lucide:chevron-up" : "lucide:chevron-down"} width={16} height={16} />
            </button>

            {showCategoryDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-200 max-h-60 overflow-y-auto scrollbar-hide">
                <div className="py-2">
                  <button
                    onClick={() => {
                      setSelectedSubject("All Subjects");
                      setShowCategoryDropdown(false);
                    }}
                    className={`block px-4 py-2.5 text-sm w-full text-left transition-colors ${selectedSubject === "All Subjects"
                      ? "bg-amber-50 text-amber-900 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    All Subjects
                  </button>
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => {
                        setSelectedSubject(subject);
                        setShowCategoryDropdown(false);
                      }}
                      className={`block px-4 py-2.5 text-sm w-full text-left transition-colors ${selectedSubject === subject
                        ? "bg-amber-50 text-amber-900 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {Recomended && Recomended.length > 0 && (
          <div className="bg-linear-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="mdi:star" width={24} height={24} className="text-amber-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                Recommended for You ({Recomended.length})
              </h3>
            </div>
            <div className={`grid gap-4 ${Recomended.length === 1 ? 'grid-cols-1 max-w-md' :
              Recomended.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl' :
                Recomended.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                  'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}>
              {Recomended.map((item, idx) => (
                <ScholershipCard key={idx} Details={item} onApply={handleApplyClick} isRecommended={true} />
              ))}
            </div>
          </div>
        )}

        <div className="bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            All Available Scholarships
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allScholarships.map((item, idx) => (
              <ScholershipCard key={idx} Details={item} onApply={handleApplyClick} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.max(prev - 1, 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border ${currentPage === 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                <Icon icon="lucide:chevron-left" width={20} height={20} />
              </button>
              
              <span className="text-sm text-gray-600 font-medium px-2">
                 Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => {
                   setCurrentPage(prev => Math.min(prev + 1, totalPages));
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border ${currentPage === totalPages ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                <Icon icon="lucide:chevron-right" width={20} height={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && selectedScholarship && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Scholarship Details</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon icon="mdi:close" width={24} height={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedScholarship.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Icon icon="mdi:clock-outline" width={16} height={16} className="text-orange-500" />
                    <span>Deadline: {selectedScholarship.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="mdi:domain" width={20} height={20} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Provider</span>
                  </div>
                  <p className="text-base font-semibold text-gray-900">{selectedScholarship.provider}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="mdi:book-outline" width={20} height={20} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Subject</span>
                  </div>
                  <p className="text-base font-semibold text-gray-900">{selectedScholarship.subject}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="mdi:currency-usd" width={20} height={20} className="text-green-600" />
                    <span className="text-sm font-medium text-green-700">Scholarship Amount</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">{selectedScholarship.amount}</p>
                </div>
              </div>

              {selectedScholarship.description && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedScholarship.description}</p>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  // Track application start
                  const currentData = JSON.parse(localStorage.getItem("application_tracker_data") || "[]");
                  // Check if already exists to avoid dupes or overwrites if unintended, 
                  // but for this flow we update/overwrite to set active
                  const existingIndex = currentData.findIndex(item => item.id === selectedScholarship.id);
                  const newEntry = {
                    id: selectedScholarship.id,
                    title: selectedScholarship.title,
                    essayTitle: "Pending Selection...",
                    essayContent: "",
                    amount: selectedScholarship.amount,
                    deadline: selectedScholarship.deadline,
                    status: "Processing"
                  };

                  if (existingIndex >= 0) {
                    currentData[existingIndex] = { ...currentData[existingIndex], status: "Processing" }; // Update status if re-applying? Or keep existing. Let's just update active.
                  } else {
                    currentData.push(newEntry);
                  }

                  localStorage.setItem("application_tracker_data", JSON.stringify(currentData));
                  localStorage.setItem("current_active_scholarship", selectedScholarship.id);

                  router.push('/dashboard/student/essays');
                }}
                className="flex-1 bg-linear-to-r from-[#FFCA42] to-[#FFB834] hover:from-[#FFB834] hover:to-[#FFCA42] text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:pencil" width={20} height={20} />
                <span>Write Essay</span>
              </button>
              <button
                onClick={() => {
                  // Track application start
                  const currentData = JSON.parse(localStorage.getItem("application_tracker_data") || "[]");
                  const existingIndex = currentData.findIndex(item => item.id === selectedScholarship.id);
                  const newEntry = {
                    id: selectedScholarship.id,
                    title: selectedScholarship.title,
                    essayTitle: "Pending Selection...",
                    essayContent: "",
                    amount: selectedScholarship.amount,
                    deadline: selectedScholarship.deadline,
                    status: "Processing"
                  };

                  if (existingIndex >= 0) {
                    // Keep existing entry but set as active
                  } else {
                    currentData.push(newEntry);
                  }

                  localStorage.setItem("application_tracker_data", JSON.stringify(currentData));
                  localStorage.setItem("current_active_scholarship", selectedScholarship.id);

                  router.push(`/dashboard/student/view_essay?subject=${encodeURIComponent(selectedScholarship.subject)}`);
                }}
                className="flex-1 bg-white border-2 border-[#FFCA42] text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-amber-50 flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:file-document-outline" width={20} height={20} />
                <span>Select Best Essay</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
