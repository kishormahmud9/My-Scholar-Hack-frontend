"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function Subscriptions() {
    const [isYearly, setIsYearly] = useState(false);
    const [plans, setPlans] = useState([
        {
            id: 1,
            name: "Free Trial",
            monthlyPrice: 0,
            yearlyPrice: 0,
            description: "Start Your Free Trial and Experience MyScholarHack Today",
            features: [
                "1 complete essay",
                "3 AI-powered revisions",
                "Basic profile setup",
                "Budgeting Tools",
            ],
            isActive: true,
            buttonText: "Start Free Trial",
        },
        {
            id: 2,
            name: "Essay Hack",
            monthlyPrice: 9.99,
            yearlyPrice: 89,
            description: "Perfect for students applying to a few scholarships",
            features: [
                "5 essays per month",
                "Unlimited AI refinements",
                "AI voice matching",
                "Application tracker",
                "Deadline reminders",
                "Export to DOCX & PDF",
            ],
            isActive: true,
            buttonText: "Start with Essay Hack",
        },
        {
            id: 3,
            name: "Essay Hack+",
            monthlyPrice: 19.99,
            yearlyPrice: 179,
            description: "Best for serious scholarship applicants",
            features: [
                "10 essays per month",
                "Unlimited revisions",
                "Advanced reminders",
                "Essay performance insights",
                "Scholarship suggestions",
                "Priority email support",
            ],
            isActive: true,
            buttonText: "Get Essay Hack+",
            highlight: true,
        },
        {
            id: 4,
            name: "Essay Hack Pro",
            monthlyPrice: 29.99,
            yearlyPrice: 269,
            description: "Designed for students applying year-round",
            features: [
                "Unlimited essays",
                "Priority AI generation",
                "Advanced analytics",
                "Multiple profile versions",
                "24-hour priority support",
                "Early access to new features",
            ],
            isActive: true,
            buttonText: "Go Pro Today",
        },
    ]);

    // Modal States
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    // Edit Form State
    const [editForm, setEditForm] = useState({
        name: "",
        monthlyPrice: "",
        yearlyPrice: "",
        description: "",
        features: "",
    });

    // Handlers
    const toggleStatus = (id) => {
        setPlans(plans.map(plan =>
            plan.id === id ? { ...plan, isActive: !plan.isActive } : plan
        ));
    };

    const openDeleteConfirm = (plan) => {
        setSelectedPlan(plan);
        setShowDeleteConfirm(true);
    };

    const closeDeleteConfirm = () => {
        setShowDeleteConfirm(false);
        setSelectedPlan(null);
    };

    const confirmDelete = () => {
        setPlans(plans.filter(p => p.id !== selectedPlan.id));
        closeDeleteConfirm();
        alert("Plan deleted successfully");
    };

    const openEditModal = (plan) => {
        setSelectedPlan(plan);
        setEditForm({
            name: plan.name,
            monthlyPrice: plan.monthlyPrice,
            yearlyPrice: plan.yearlyPrice,
            description: plan.description,
            features: plan.features.join("\n"),
        });
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setSelectedPlan(null);
    };

    const savePlan = () => {
        if (!selectedPlan) return;

        const updatedFeatures = editForm.features.split("\n").filter(f => f.trim() !== "");

        setPlans(plans.map(plan =>
            plan.id === selectedPlan.id ? {
                ...plan,
                name: editForm.name,
                monthlyPrice: parseFloat(editForm.monthlyPrice),
                yearlyPrice: parseFloat(editForm.yearlyPrice),
                description: editForm.description,
                features: updatedFeatures,
            } : plan
        ));

        closeEditModal();
        alert("Plan updated successfully");
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
                    <p className="text-gray-500 mt-1">Manage pricing packages and plans.</p>
                </div>

                {/* Toggle Switch */}
                <div className="bg-gray-100 p-1 rounded-full flex items-center">
                    <button
                        onClick={() => setIsYearly(false)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isYearly ? "bg-[#FFCA42] shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setIsYearly(true)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isYearly ? "bg-[#FFCA42] shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col h-full ${!plan.isActive ? "opacity-60 grayscale-[0.8]" : "shadow-lg hover:shadow-xl border-gray-100"
                            } ${plan.highlight ? "ring-2 ring-[#FFCA42] ring-offset-2" : ""}`}
                        style={{
                            background: !plan.isActive ? "#f9fafb" : "white"
                        }}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div onClick={() => toggleStatus(plan.id)} className={`cursor-pointer w-10 h-6 rounded-full p-1 transition-colors duration-300 ${plan.isActive ? "bg-green-500" : "bg-gray-300"}`}>
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${plan.isActive ? "translate-x-4" : "translate-x-0"}`} />
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => openEditModal(plan)} className="p-2 text-gray-400 hover:text-[#FFCA42] hover:bg-yellow-50 rounded-full transition-colors">
                                    <Icon icon="lucide:edit-2" width="18" height="18" />
                                </button>
                                <button onClick={() => openDeleteConfirm(plan)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                                    <Icon icon="line-md:trash" width="18" height="18" />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                        <p className="text-sm text-gray-500 mb-6 min-h-[40px]">{plan.description}</p>

                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold text-gray-900">
                                ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                            </span>
                            <span className="text-gray-500 text-sm">/{isYearly ? "year" : "mo"}</span>
                        </div>

                        <div className="flex-1 space-y-3 mb-8">
                            {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                    <Icon icon="mdi:check-circle" className="text-green-500 mt-0.5 shrink-0" width="16" height="16" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full py-3 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors text-sm">
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 transform transition-all scale-100 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Edit Plan</h2>
                            <button
                                onClick={closeEditModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <Icon icon="lucide:x" width="24" height="24" />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Plan Name</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Price</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors"
                                        value={editForm.monthlyPrice}
                                        onChange={(e) => setEditForm({ ...editForm, monthlyPrice: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Yearly Price</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors"
                                        value={editForm.yearlyPrice}
                                        onChange={(e) => setEditForm({ ...editForm, yearlyPrice: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors"
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Features (One per line)</label>
                                <textarea
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#FFCA42] focus:ring-1 focus:ring-[#FFCA42] transition-colors min-h-[150px]"
                                    value={editForm.features}
                                    onChange={(e) => setEditForm({ ...editForm, features: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={closeEditModal}
                                className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 font-medium rounded-full hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={savePlan}
                                className="flex-1 px-6 py-3 bg-[#FFCA42] text-gray-900 font-semibold rounded-full hover:bg-[#ffc942c2] transition-colors shadow-sm"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && selectedPlan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all scale-100 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-600">
                            <Icon icon="fluent:delete-24-regular" width="24" height="24" />
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Plan?</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to remove <span className="font-semibold text-gray-700">{selectedPlan.name}</span>? This action cannot be undone.
                        </p>

                        <div className="flex gap-3 w-full">
                            <button
                                onClick={closeDeleteConfirm}
                                className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
