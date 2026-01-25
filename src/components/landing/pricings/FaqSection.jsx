"use client";
import React, { useState } from "react";
import StatusBtn from "../statusBtn";

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "Can I change plans anytime?",
            answer:
                "Yes! Upgrade, downgrade, or cancel anytime. No long-term commitment",
        },
        {
            question: "What if I need more essays than my plan allows?",
            answer:
                "You can purchase additional essay reviews as add-ons at any time.",
        },
        {
            question: "Do unused essays roll over?",
            answer:
                "Unused essays do not roll over to the next month. We encourage you to use them within the billing cycle.",
        },
        {
            question: "Is there a student discount?",
            answer:
                "Our pricing is already optimized for students. However, we occasionally offer seasonal promotions.",
        },
        {
            question: "What if I don't win any scholarships?",
            answer:
                "While we cannot guarantee wins, our tools significantly increase your chances. We offer a satisfaction guarantee on our essay reviews.",
        },
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-10 lg:my-20">
            {/* Left Column: Header */}
            <div className="lg:col-span-5">
                <div className="flex justify-start mb-4">
                    <StatusBtn title="FAQ" style="bg-[#E6F8F3] text-[#00A47E] border border-[#00A47E]" />
                </div>
                <h2 className="text-5xl font-semibold text-gray-800 mb-6 leading-tight">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                    Each package includes personalized consultation and revisions to
                    guarantee your satisfaction.
                </p>
            </div>

            {/* Right Column: Accordion */}
            <div className="lg:col-span-7 flex flex-col gap-4">
                {faqs.map((faq, index) => (
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

export default FaqSection;
