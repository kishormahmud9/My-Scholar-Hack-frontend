"use client";
import { Icon } from "@iconify/react";

export default function EssayResultModal({
    isOpen,
    essay,
    onClose,
    onSave,
    onEdit,
    onRemove
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur effect */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 animate-fade-in">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between z-10">
                    <h2 className="text-2xl font-bold text-[#2D3748]">Generated Essay</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                    >
                        <Icon icon="mdi:close" width={28} height={28} />
                    </button>
                </div>

                {/* Essay Content - Scrollable */}
                <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                    <div className="prose prose-lg max-w-none">
                        {/* Render essay with basic markdown formatting */}
                        {essay.split('\n').map((line, index) => {
                            if (line.startsWith('# ')) {
                                return <h1 key={index} className="text-3xl font-bold text-[#2D3748] mb-4 mt-6">{line.substring(2)}</h1>;
                            } else if (line.startsWith('## ')) {
                                return <h2 key={index} className="text-2xl font-bold text-[#2D3748] mb-3 mt-5">{line.substring(3)}</h2>;
                            } else if (line.match(/^\d+\./)) {
                                return <p key={index} className="text-[#4A5568] leading-relaxed mb-2 ml-4">{line}</p>;
                            } else if (line.trim() === '') {
                                return <div key={index} className="h-2"></div>;
                            } else {
                                // Handle bold text **text**
                                const parts = line.split(/(\*\*.*?\*\*)/g);
                                return (
                                    <p key={index} className="text-[#4A5568] leading-relaxed mb-3">
                                        {parts.map((part, i) => {
                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                return <strong key={i} className="font-semibold text-[#2D3748]">{part.slice(2, -2)}</strong>;
                                            }
                                            return part;
                                        })}
                                    </p>
                                );
                            }
                        })}
                    </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6">
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={onSave}
                            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#F6C844] to-[#EDB91C] text-[#2D3748] font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            <Icon icon="mdi:content-save" width={22} height={22} />
                            Save
                        </button>
                        <button
                            onClick={onEdit}
                            className="flex items-center gap-2 px-8 py-3 bg-white text-[#2D3748] font-semibold rounded-full border-2 border-[#F6C844] hover:bg-[#FFF9E6] transform hover:scale-105 transition-all duration-200"
                        >
                            <Icon icon="mdi:pencil" width={22} height={22} />
                            Edit
                        </button>
                        <button
                            onClick={onRemove}
                            className="flex items-center gap-2 px-8 py-3 bg-white text-red-600 font-semibold rounded-full border-2 border-red-500 hover:bg-red-50 transform hover:scale-105 transition-all duration-200"
                        >
                            <Icon icon="mdi:delete" width={22} height={22} />
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
