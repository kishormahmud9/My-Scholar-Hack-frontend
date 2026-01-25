"use client";
import React from 'react';
import SectionWrapper from '../SectionWrapper';
import { cn } from "@/lib/utils";

const SCHOLARSHIP_TYPES = [
    "Merit-based", "Athletic scholarships", "Need-based", "Community service scholarships",
    "Leadership scholarships", "Essay contests", "Major-specific", "No preference", "Identity-based"
];

export default function ScholarshipInfo() {
    return (
        <SectionWrapper
            title="Scholarship Specific Info"
            description="Information specific to scholarship eligibility requirements."
            onSave={() => console.log("Saving Scholarship Info...")}
        >
            {({ isEditing }) => (
                <form className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">What types of scholarships are you most interested in?</label>
                        <div className="flex flex-wrap gap-3">
                            {SCHOLARSHIP_TYPES.map((type) => (
                                <label key={type} className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm cursor-pointer transition-all",
                                    !isEditing ? "opacity-75 pointer-events-none bg-gray-50" : "hover:border-[#FFCA42] hover:bg-[#FFCA42]/5"
                                )}>
                                    <input type="checkbox" disabled={!isEditing} className="w-4 h-4 text-[#FFCA42] rounded border-gray-300 focus:ring-[#FFCA42]" />
                                    <span className="text-gray-700">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Do you have specific scholarships you're planning to apply for?</label>
                        <textarea disabled={!isEditing} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 min-h-[100px] disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="List any specific scholarships..."></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">What's your scholarship deadline timeline?</label>
                        <select disabled={!isEditing} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all text-gray-700 cursor-pointer disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600">
                            <option value="">Select timeline</option>
                            <option value="6_months">I'm just starting to explore (6+ months out)</option>
                            <option value="3_6_months">I'm planning ahead (3–6 months out)</option>
                            <option value="1_3_months">I'm actively applying (1–3 months out)</option>
                            <option value="1_month">I need help ASAP (less than 1 month!)</option>
                        </select>
                    </div>
                </form>
            )}
        </SectionWrapper>
    );
}
