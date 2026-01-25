"use client";
import React, { useState } from "react";
import SectionHead from "../SectionHead";

const FaqTabs = () => {
    const [activeTab, setActiveTab] = useState("Pricing");
    const [openIndex, setOpenIndex] = useState(0);

    const categories = [
        "Pricing",
        "Getting Started",
        "How It Works",
        "Privacy",
        "Scholarships",
        "Technical Questions",
        "Support",
        "Academic Integrity",
    ];

    const faqData = {
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
                answer: "Click the 'Get Started' button on the homepage and follow the instructions.",
            },
            {
                question: "Is my data secure?",
                answer: "Yes, we prioritize data security and use encryption to protect your information.",
            },
        ],
        "How It Works": [
            {
                question: "How does the essay generation work?",
                answer: "Our AI analyzes your inputs and generates a unique essay tailored to your requirements.",
            },
        ],
        Privacy: [
            {
                question: "Do you share my data?",
                answer: "No, we do not share your personal data with third parties without your consent."
            }
        ],
        Scholarships: [
            {
                question: "How do I find scholarships?",
                answer: "Our platform provides a curated list of scholarships matched to your profile."
            }
        ],
        "Technical Questions": [
            {
                question: "What browsers are supported?",
                answer: "We support all modern browsers including Chrome, Firefox, Safari, and Edge."
            }
        ],
        Support: [
            {
                question: "How can I contact support?",
                answer: "You can reach our support team via the contact form or email."
            }
        ],
        "Academic Integrity": [
            {
                question: "Is using this tool cheating?",
                answer: "Our tool is designed to assist you in writing and brainstorming. We encourage you to review and edit all generated content to ensure it reflects your own work and adheres to your institution's academic integrity policies."
            }
        ]
    };

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="py-12">
            <div className="flex justify-center">
                <SectionHead
                    title="Frequently Asked Questions"
                    description="Each package includes personalized consultation and revisions to guarantee your satisfaction."
                    Status="FAQ"
                    statusStyle="bg-[#E6F8F3] text-[#00A47E] border border-[#00A47E]"
                />
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 my-10 max-w-5xl mx-auto">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            setActiveTab(category);
                            setOpenIndex(0); // Reset accordion on tab change
                        }}
                        className={`px-6 py-2 rounded-full border transition-all duration-300 font-medium ${activeTab === category
                            ? "bg-[#FCD34D] border-[#FCD34D] text-gray-900"
                            : "bg-white border-[#FCD34D] text-gray-700 hover:bg-yellow-50"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Accordion */}
            <div className="max-w-4xl mx-auto flex flex-col gap-4">
                {faqData[activeTab]?.map((faq, index) => (
                    <div
                        key={index}
                        className={`border rounded-lg transition-all duration-300 overflow-hidden ${openIndex === index
                            ? "border-yellow-400 shadow-sm bg-white"
                            : "border-gray-100 bg-white"
                            }`}
                    >
                        <button
                            onClick={() => toggleFaq(index)}
                            className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                        >
                            <span
                                className={`text-lg font-medium ${openIndex === index ? "text-gray-900" : "text-gray-700"
                                    }`}
                            >
                                {faq.question}
                            </span>
                            <span
                                className={`transform transition-transform duration-300 text-gray-400 ${openIndex === index ? "rotate-180" : ""
                                    }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </span>
                        </button>
                        <div
                            className={`transition-all duration-300 ease-in-out ${openIndex === index
                                ? "max-h-40 opacity-100"
                                : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="px-6 pb-6 text-gray-500 leading-relaxed">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FaqTabs;
