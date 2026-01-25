"use client";
import React from 'react';
import SectionWrapper from '../SectionWrapper';

export default function EssayQuestions() {
    return (
        <SectionWrapper
            title="Essay Specific Questions"
            description="Pre-answer common essay prompts to speed up generation."
            onSave={() => console.log("Saving Essay Questions...")}
        >
            {({ isEditing }) => (
                <form className="space-y-6">
                    {[
                        "Who has been the most influential person in your life?",
                        "What's a mistake you made that taught you something important?",
                        "What issue or cause do you care deeply about?",
                        "Describe a time you failed at something.",
                        "What makes you different from other students?",
                        "If you could change one thing about your school or community, what would it be?"
                    ].map((question, index) => (
                        <div key={index} className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">{question}</label>
                            <textarea disabled={!isEditing} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 min-h-[100px] disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="Draft your answer..."></textarea>
                        </div>
                    ))}
                </form>
            )}
        </SectionWrapper>
    );
}
