"use client";
import React from 'react';
import SectionWrapper from '../SectionWrapper';

export default function AcademicInterests() {
    return (
        <SectionWrapper
            title="Academic Interests"
            description="Share your educational background and future goals."
            onSave={() => console.log("Saving Academic Interests...")}
        >
            {({ isEditing }) => (
                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">You plan to major</label>
                        <input disabled={!isEditing} type="text" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="e.g. Computer Science" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Why does this field interest you?</label>
                        <textarea disabled={!isEditing} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 min-h-[120px] resize-y disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="Tell us why..."></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">What are your college/career goals?</label>
                        <textarea disabled={!isEditing} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 min-h-[120px] resize-y disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="Describe your goals..."></textarea>
                    </div>
                </form>
            )}
        </SectionWrapper>
    );
}
