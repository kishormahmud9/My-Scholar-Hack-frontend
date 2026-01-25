"use client";
import React from 'react';
import SectionWrapper from '../SectionWrapper';

export default function ExtraCurricular() {
    return (
        <SectionWrapper
            title="Extra Curricular Activities"
            description="Highlight your involvement in clubs, sports, and other organizations."
            onSave={() => console.log("Saving Extra Curricular...")}
        >
            {({ isEditing }) => (
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Activity Name</label>
                            <input disabled={!isEditing} type="text" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="e.g. Debate Club" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Years Involved</label>
                            <input disabled={!isEditing} type="number" min="0" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="e.g. 2" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Leadership positions held</label>
                        <input disabled={!isEditing} type="text" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="e.g. President, Treasurer" />
                    </div>
                </form>
            )}
        </SectionWrapper>
    );
}
