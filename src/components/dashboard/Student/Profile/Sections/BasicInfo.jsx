"use client";
import React from 'react';
import SectionWrapper from '../SectionWrapper';

export default function BasicInfo() {
    return (
        <SectionWrapper
            title="Basic Information"
            description="Manage your personal details and contact information."
            onSave={() => console.log("Saving Basic Info...")}
        >
            {({ isEditing }) => (
                <form className="space-y-6">
                    {/* Full Name - Full Width */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                        <input disabled={!isEditing} type="text" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="Enter your full name" defaultValue="Alex Johnson" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Grade - Dropdown */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Grade <span className="text-red-500">*</span></label>
                            <select disabled={!isEditing} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all text-gray-700 cursor-pointer disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600">
                                <option value="">Select Grade</option>
                                <option value="9">9th grade</option>
                                <option value="10">10th grade</option>
                                <option value="11" selected>11th grade</option>
                                <option value="12">12th grade</option>
                                <option value="gap">Gap year</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Type of School - Dropdown */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Type of School <span className="text-red-500">*</span></label>
                            <select disabled={!isEditing} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all text-gray-700 cursor-pointer disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600">
                                <option value="">Select School Type</option>
                                <option value="public" selected>Public school</option>
                                <option value="private">Private school</option>
                                <option value="charter">Charter school</option>
                                <option value="homeschool">Homeschool</option>
                                <option value="online">Online school</option>
                                <option value="international">International school</option>
                            </select>
                        </div>

                        {/* Location - Half Width */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Where are you located?</label>
                            <input disabled={!isEditing} type="text" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="e.g. New York, USA" defaultValue="New York, NY" />
                        </div>

                        {/* GPA - Half Width */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">GPA</label>
                            <input disabled={!isEditing} type="number" step="0.01" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all placeholder:text-gray-400 disabled:bg-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-600" placeholder="4.0" defaultValue="3.8" />
                        </div>
                    </div>
                </form>
            )}
        </SectionWrapper>
    );
}
