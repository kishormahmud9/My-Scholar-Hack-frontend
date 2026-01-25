"use client";
import Link from 'next/link';
import { Icon } from '@iconify/react';
import PrimaryBtn from "@/components/landing/PrimaryBtn";
import { cn } from "@/lib/utils";

export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-center">
                <div className="p-8">
                    <div className="mx-auto w-16 h-16 bg-[#FFFAEC] rounded-full flex items-center justify-center mb-6">
                        <Icon icon="solar:letter-unread-bold" className="text-3xl text-[#FFCA42]" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
                    <p className="text-gray-500 text-sm mb-8">
                        We've sent a verification link to<br />
                        <span className="font-semibold text-gray-900">name@example.com</span>
                    </p>

                    <PrimaryBtn
                        title="Open Email App"
                        style="w-full rounded-xl mb-4"
                    />

                    <div className="text-center">
                        <p className="text-gray-500 text-sm">
                            Didn't receive the email?{' '}
                            <button className="text-[#FFCA42] hover:text-[#eeb526] font-semibold transition-colors">
                                Click to resend
                            </button>
                        </p>
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-6">
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
