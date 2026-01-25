"use client";
import React from 'react';
import SectionWrapper from '../SectionWrapper';

export default function UniqueExperiences() {
    return (
        <SectionWrapper
            title="Unique Experiences"
            description="Share distinct experiences that help tell your ambition story."
            onSave={() => console.log("Saving Unique Experiences...")}
        >
            {({ isEditing }) => (
                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">What are your hobbies or interests outside of school?</label>
                        <textarea disabled={!isEditing} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 min-h-[120px] resize-y disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="Tell us about yourself..."></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Have you had any unique or unusual experiences?</label>
                        <textarea disabled={!isEditing} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 min-h-[120px] resize-y disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="Describe any unique experiences..."></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">What are you most proud of?</label>
                        <textarea disabled={!isEditing} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 min-h-[120px] resize-y disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="Share your proudest moment..."></textarea>
                    </div>
                </form>
            )}
        </SectionWrapper>
    );
}
