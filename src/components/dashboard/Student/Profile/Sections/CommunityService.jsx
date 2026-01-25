"use client";
import React from 'react';
import SectionWrapper from '../SectionWrapper';

export default function CommunityService() {
    return (
        <SectionWrapper
            title="Community Service (Volunteer Work)"
            description="Detail your volunteer work and community engagement."
            onSave={() => console.log("Saving Community Service...")}
        >
            {({ isEditing }) => (
                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">What volunteer work or community service have you done?</label>
                        <textarea disabled={!isEditing} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 min-h-[120px] resize-y disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="Describe your service..."></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Organization / Cause</label>
                            <input disabled={!isEditing} type="text" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="e.g. Red Cross" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Total hours</label>
                            <input disabled={!isEditing} type="number" min="0" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="e.g. 50" />
                        </div>
                    </div>
                </form>
            )}
        </SectionWrapper>
    );
}
