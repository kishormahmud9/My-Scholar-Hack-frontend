"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import PrimaryBtn from "@/components/landing/PrimaryBtn";

export default function FAQs() {
  const [activeTab, setActiveTab] = useState("Pricing");
  const [openIndex, setOpenIndex] = useState(0);

  const [faqData, setFaqData] = useState({
    Pricing: [
      {
        question: "What's included in the free trial?",
        answer:
          "A: You can write 1 complete essay with up to 3 iterations (refinements). This lets you experience our voice matching and essay generation before committing to a paid plan.",
      },
      {
        question: "What happens after my free trial?",
        answer:
          "After your free trial, you can choose a subscription plan that best fits your needs. Your data will be saved.",
      },
      {
        question: "Can I cancel anytime?",
        answer:
          "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.",
      },
      {
        question: "What if I need more essays than my plan allows?",
        answer:
          "You can upgrade your plan or purchase additional essay credits as needed.",
      },
      {
        question: "Do unused essays roll over?",
        answer:
          "Unused essays typically do not roll over to the next billing cycle, but please check your specific plan details.",
      },
      {
        question: "Is there a discount for paying annually?",
        answer:
          "Yes, we offer a significant discount for annual subscriptions compared to monthly billing.",
      },
      {
        question: "Do you offer student discounts?",
        answer:
          "Our pricing is designed to be affordable for students. We also run special promotions periodically.",
      },
    ],
    "Getting Started": [
      {
        question: "How do I sign up?",
        answer:
          "Click the 'Get Started' button on the homepage and follow the instructions.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes, we prioritize data security and use encryption to protect your information.",
      },
    ],
    "How It Works": [
      {
        question: "How does the essay generation work?",
        answer:
          "Our AI analyzes your inputs and generates a unique essay tailored to your requirements.",
      },
    ],
    Privacy: [
      {
        question: "Do you share my data?",
        answer:
          "No, we do not share your personal data with third parties without your consent.",
      },
    ],
    Scholarships: [
      {
        question: "How do I find scholarships?",
        answer:
          "Our platform provides a curated list of scholarships matched to your profile.",
      },
    ],
    "Technical Questions": [
      {
        question: "What browsers are supported?",
        answer:
          "We support all modern browsers including Chrome, Firefox, Safari, and Edge.",
      },
    ],
    Support: [
      {
        question: "How can I contact support?",
        answer: "You can reach our support team via the contact form or email.",
      },
    ],
    "Academic Integrity": [
      {
        question: "Is using this tool cheating?",
        answer:
          "Our tool is designed to assist you in writing and brainstorming. We encourage you to review and edit all generated content to ensure it reflects your own work and adheres to your institution's academic integrity policies.",
      },
    ],
  });

  const categories = Object.keys(faqData);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null); // { category, index, question, answer }

  const openEditModal = (e, index) => {
    e.stopPropagation(); // Prevent toggling accordion when clicking edit
    const faq = faqData[activeTab][index];
    setEditingFaq({ ...faq, category: activeTab, index });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingFaq(null);
  };

  const saveFaq = () => {
    if (!editingFaq) return;

    const updatedFaqs = { ...faqData };
    updatedFaqs[editingFaq.category][editingFaq.index] = {
      question: editingFaq.question,
      answer: editingFaq.answer,
    };

    setFaqData(updatedFaqs); // Update global state
    alert("FAQ Updated Successfully"); // Optional feedback
    closeEditModal();
  };

  // Add FAQ Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFaq, setNewFaq] = useState({ category: "", question: "", answer: "" });

  const handleAddFaq = () => {
    setNewFaq({ category: categories[0], question: "", answer: "" }); // Default to first category
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewFaq({ category: "", question: "", answer: "" });
  };

  const saveNewFaq = () => {
    if (!newFaq.question || !newFaq.answer) {
      alert("Please fill in all fields");
      return;
    }

    const updatedFaqs = { ...faqData };
    // Initialize category array if strictly necessary, though keys exist
    if (!updatedFaqs[newFaq.category]) {
      updatedFaqs[newFaq.category] = [];
    }

    updatedFaqs[newFaq.category].push({
      question: newFaq.question,
      answer: newFaq.answer,
    });

    setFaqData(updatedFaqs); // Update global state
    alert("FAQ Added Successfully");
    closeAddModal();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 ">Edit FAQ</h1>
          <p className="text-gray-500 mt-1">Manage the frequently asked questions.</p>
        </div>

        <div>
          <PrimaryBtn
            title={"Add Question & Ansewr"}
            style={"rounded-full flex-row-reverse"}
            icon={'mdi:book-add'}
            hendleClick={handleAddFaq}
          />
        </div>
      </div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveTab(category);
              setOpenIndex(0);
            }}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${activeTab === category
              ? "bg-[#FCD34D] border-[#FCD34D] text-gray-900"
              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {faqData[activeTab]?.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-xl transition-all duration-300 bg-white overflow-hidden ${openIndex === index
              ? "border-yellow-400 shadow-sm"
              : "border-gray-100"
              }`}
          >
            <div
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center p-6 cursor-pointer select-none"
            >
              <span
                className={`text-lg font-medium pr-8 ${openIndex === index ? "text-gray-900" : "text-gray-700"
                  }`}
              >
                {faq.question}
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => openEditModal(e, index)}
                  className="p-2 text-gray-400 hover:text-[#FFCA42] hover:bg-yellow-50 rounded-full transition-colors"
                  title="Edit FAQ"
                >
                  <Icon icon="lucide:edit-2" width="20" height="20" />
                </button>
                <span
                  className={`transform transition-transform duration-300 text-gray-400 ${openIndex === index ? "rotate-180" : ""
                    }`}
                >
                  <Icon icon="lucide:chevron-down" width="24" height="24" />
                </span>
              </div>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out px-6 ${openIndex === index
                ? "max-h-96 opacity-100 pb-6"
                : "max-h-0 opacity-0 pb-0"
                }`}
            >
              <div className="text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add FAQ Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 transform transition-all scale-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New FAQ</h2>
              <button
                onClick={closeAddModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon icon="lucide:x" width="24" height="24" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors bg-white cursor-pointer"
                    value={newFaq.category}
                    onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                    <Icon icon="lucide:chevron-down" width="16" height="16" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Question
                </label>
                <input
                  type="text"
                  placeholder="Enter your question"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors"
                  value={newFaq.question}
                  onChange={(e) =>
                    setNewFaq({ ...newFaq, question: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Answer
                </label>
                <textarea
                  placeholder="Enter the answer"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors min-h-[120px]"
                  value={newFaq.answer}
                  onChange={(e) =>
                    setNewFaq({ ...newFaq, answer: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={closeAddModal}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 font-medium rounded-full hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveNewFaq}
                className="flex-1 px-6 py-3 bg-[#FFCA42] text-gray-900 font-semibold rounded-full hover:bg-[#ffc942c2] transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 transform transition-all scale-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit FAQ</h2>
              <button
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon icon="lucide:x" width="24" height="24" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Question
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors"
                  value={editingFaq.question}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, question: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Answer
                </label>
                <textarea
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors min-h-[120px]"
                  value={editingFaq.answer}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, answer: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={closeEditModal}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 font-medium rounded-full hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveFaq}
                className="flex-1 px-6 py-3 bg-[#FFCA42] text-gray-900 font-semibold rounded-full hover:bg-[#ffc942c2] transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
