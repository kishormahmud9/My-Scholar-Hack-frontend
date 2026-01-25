"use client";
import Link from 'next/link';
import { Icon } from '@iconify/react';
import PrimaryBtn from "@/components/landing/PrimaryBtn";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFFAEC] mb-4">
                            <Icon icon="solar:lock-keyhole-minimalistic-bold" className="text-[#FFCA42] text-xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
                        <p className="text-gray-500 text-sm">
                            Enter your email address to get the password reset link.
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Email Address</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    className={cn(
                                        "w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl",
                                        "focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all",
                                        "placeholder:text-gray-400 text-gray-900",
                                        "group-hover:border-gray-300"
                                    )}
                                    placeholder="name@example.com"
                                />
                                <Icon icon="solar:letter-linear" className="absolute left-3.5 top-3.5 text-gray-400 text-lg transition-colors group-hover:text-gray-500" />
                            </div>
                        </div>

                        <PrimaryBtn
                            title="Reset Password"
                            style="w-full rounded-xl"
                        />
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-gray-100">
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
