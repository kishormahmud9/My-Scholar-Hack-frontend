"use client";
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import PrimaryBtn from "@/components/landing/PrimaryBtn";
import { cn } from "@/lib/utils";

export default function OTPPage() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 bg-[#FFFAEC] rounded-full flex items-center justify-center mb-6">
                            <Icon icon="solar:shield-check-bold" className="text-3xl text-[#FFCA42]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Code</h2>
                        <p className="text-gray-500 text-sm">
                            We have sent a verification code to your email.
                        </p>
                    </div>

                    <form className="space-y-8">
                        <div className="flex justify-between gap-2">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    maxLength="1"
                                    className={cn(
                                        "w-12 h-14 text-center text-xl font-bold bg-gray-50 border border-gray-200 rounded-xl",
                                        "focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all",
                                        "text-gray-900"
                                    )}
                                    value={data}
                                    onChange={e => handleChange(e, index)}
                                    onKeyDown={e => handleKeyDown(e, index)}
                                />
                            ))}
                        </div>

                        <PrimaryBtn
                            title="Verify Code"
                            style="w-full rounded-xl"
                        />
                    </form>

                    <div className="mt-8 border-t border-gray-100 pt-6 text-center">
                        <p className="text-gray-500 text-sm mb-4">
                            Didn't receive the code?{' '}
                            <button className="text-[#FFCA42] hover:text-[#eeb526] font-semibold transition-colors">
                                Resend Code
                            </button>
                        </p>
                        <Link href="/signin" className="text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2 group transition-colors">
                            <Icon icon="solar:arrow-left-linear" className="group-hover:-translate-x-1 transition-transform" />
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
