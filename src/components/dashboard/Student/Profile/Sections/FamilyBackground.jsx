"use client";
import React from 'react';
import SectionWrapper from '../SectionWrapper';

export default function FamilyBackground() {
    return (
        <SectionWrapper
            title="Community Service (Family Background)"
            description="Information about your family background for scholarship eligibility."
            onSave={() => console.log("Saving Family Info...")}
        >
            {({ isEditing }) => (
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Are you a first-generation college student?</label>
                            <select disabled={!isEditing} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all text-gray-700 cursor-pointer disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600">
                                <option value="">Select option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">What is your household income range?</label>
                            <select disabled={!isEditing} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all text-gray-700 cursor-pointer disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600">
                                <option value="">Select range</option>
                                <option value="under_25k">Under $25,000</option>
                                <option value="25k_50k">$25,000–$50,000</option>
                                <option value="50k_75k">$50,000–$75,000</option>
                                <option value="75k_100k">$75,000–$100,000</option>
                                <option value="over_100k">Over $100,000</option>
                                <option value="prefer_not_say">Prefer not to say</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Your family member</label>
                            <input disabled={!isEditing} type="text" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="Enter details..." />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Which option fits your family?</label>
                            <input disabled={!isEditing} type="text" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="Enter details..." />
                        </div>
                    </div>
                </form>
            )}
        </SectionWrapper>
    );
}
