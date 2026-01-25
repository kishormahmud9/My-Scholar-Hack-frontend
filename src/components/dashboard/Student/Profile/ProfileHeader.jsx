"use client";
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

export default function ProfileHeader() {
    const fileInputRef = useRef(null);
    const [image, setImage] = useState("/ceoProfile.png"); // Default placeholder

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                    <Image
                        src={image}
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                </div>

                <button
                    onClick={handleImageClick}
                    className="absolute bottom-1 right-1 bg-[#FFCA42] text-[#1B1B1B] p-2 rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer z-10"
                >
                    <Icon icon="solar:camera-minimalistic-bold" width="20" height="20" />
                </button>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">Student Name</h2>
            <p className="text-gray-500 text-sm">Update your photo and personal details</p>
        </div>
    );
}
