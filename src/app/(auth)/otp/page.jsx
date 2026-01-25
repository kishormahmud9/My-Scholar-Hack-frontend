"use client";
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { apiPost } from "@/lib/api";
import { storeAuthData, getDashboardRoute } from "@/lib/auth";
import toast from "react-hot-toast";

export default function OTPPage() {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        setError(""); // Clear error when user types

        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();

        const otpCode = otp.join('');

        if (otpCode.length !== 6) {
            setError("Please enter the complete 6-digit code");
            toast.error("Please enter the complete 6-digit code");
            return;
        }

        setIsVerifying(true);
        setError("");

        try {
            const response = await apiPost("/auth/verify-otp", { otp: otpCode });

            if (response?.success) {
                // If verification returns auth tokens, store them
                if (response?.data?.accessToken && response?.data?.refreshToken && response?.data?.user) {
                    const { accessToken, refreshToken, user } = response.data;
                    storeAuthData(accessToken, refreshToken, user);

                    // Clear pending email from sessionStorage
                    if (typeof window !== 'undefined') {
                        sessionStorage.removeItem('pendingVerificationEmail');
                    }
                    // Redirect to appropriate dashboard
                    const dashboardRoute = getDashboardRoute();
                    toast.success("Email verified successfully!");
                    router.push(dashboardRoute);
                } else {
                    // Clear pending email from sessionStorage
                    if (typeof window !== 'undefined') {
                        sessionStorage.removeItem('pendingVerificationEmail');
                    }
                    // If just verification success without tokens, redirect to signin
                    toast.success("Email verified successfully! Please sign in.");
                    router.push("/signin");
                }
            } else {
                const errorMsg = response?.message || "Invalid verification code";
                setError(errorMsg);
                toast.error(errorMsg);
            }
        } catch (err) {
            const errorMessage =
                err?.data?.message ||
                err?.data?.error ||
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                err?.response?.message ||
                "Failed to verify code. Please try again.";

            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResendOTP = async () => {
        setIsResending(true);
        setError("");

        // Get email from sessionStorage (stored during registration)
        const email = typeof window !== 'undefined'
            ? sessionStorage.getItem('pendingVerificationEmail')
            : null;

        if (!email) {
            toast.error("Email not found. Please register again.");
            setIsResending(false);
            return;
        }

        try {
            const response = await apiPost("/otp/send", { email });

            if (response?.success) {
                toast.success("Verification code resent successfully!");
                // Reset OTP inputs
                setOtp(['', '', '', '', '', '']);
                if (inputRefs.current[0]) {
                    inputRefs.current[0].focus();
                }
            } else {
                const errorMsg = response?.message || "Failed to resend code";
                toast.error(errorMsg);
            }
        } catch (err) {
            const errorMessage =
                err?.data?.message ||
                err?.data?.error ||
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                err?.response?.message ||
                "Failed to resend code. Please try again.";

            toast.error(errorMessage);
        } finally {
            setIsResending(false);
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

                    <form onSubmit={handleVerifyOTP} className="space-y-8">
                        <div className="flex justify-between gap-2">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    className={cn(
                                        "w-12 h-14 text-center text-xl font-bold bg-gray-50 border rounded-xl",
                                        "focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all",
                                        error ? "border-red-300" : "border-gray-200",
                                        "text-gray-900"
                                    )}
                                    value={data}
                                    onChange={e => handleChange(e, index)}
                                    onKeyDown={e => handleKeyDown(e, index)}
                                    disabled={isVerifying}
                                />
                            ))}
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isVerifying}
                            className={cn(
                                "w-full font-medium text-sm md:text-base text-[#1B1B1B] bg-[#FFCA42] py-3.5 px-6 rounded-xl",
                                "hover:bg-[#ffc942c2] duration-300 transition-colors",
                                "disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                        >
                            {isVerifying ? "Verifying..." : "Verify Code"}
                        </button>
                    </form>

                    <div className="mt-8 border-t border-gray-100 pt-6 text-center">
                        <p className="text-gray-500 text-sm mb-4">
                            Didn't receive the code?{' '}
                            <button
                                onClick={handleResendOTP}
                                disabled={isResending}
                                className="text-[#FFCA42] hover:text-[#eeb526] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {isResending ? "Resending..." : "Resend Code"}
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
