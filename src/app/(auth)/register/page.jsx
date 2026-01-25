"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import PrimaryBtn from "@/components/landing/PrimaryBtn";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!toastMessage) return undefined;

    const timer = setTimeout(() => {
      setToastMessage("");
      router.push("/otp");
    }, 2000);

    return () => clearTimeout(timer);
  }, [toastMessage, router]);

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.target;

    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    const data = { name: fullName, email, password };

    setIsSubmitting(true);
    setSubmitError("");
    setToastMessage("");

    try {
      const response = await registerUser(data);
      if (response?.success) {
        form.reset();
        setToastMessage("Account created successfully.");
      } else {
        setSubmitError(response?.message || "Registration failed. Please try again later.");
      }
    } catch (err) {
      setSubmitError(err?.message || "Registration failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      {toastMessage ? (
        <div className="fixed top-6 right-6 z-50 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-lg">
          {toastMessage}
        </div>
      ) : null}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFFAEC] mb-4">
              <Icon
                icon="solar:user-plus-bold"
                className="text-[#FFCA42] text-xl"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm">
              Join us and start your journey
            </p>
          </div>

          <form onSubmit={handleRegistration} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <div className="relative group">
                <input
                  type="text"
                  name="fullName"
                  required
                  className={cn(
                    "w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl",
                    "focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all",
                    "placeholder:text-gray-400 text-gray-900",
                    "group-hover:border-gray-300"
                  )}
                  placeholder="John Doe"
                />
                <Icon
                  icon="solar:user-circle-linear"
                  className="absolute left-3.5 top-3.5 text-gray-400 text-lg transition-colors group-hover:text-gray-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  required
                  className={cn(
                    "w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl",
                    "focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all",
                    "placeholder:text-gray-400 text-gray-900",
                    "group-hover:border-gray-300"
                  )}
                  placeholder="name@example.com"
                />
                <Icon
                  icon="solar:letter-linear"
                  className="absolute left-3.5 top-3.5 text-gray-400 text-lg transition-colors group-hover:text-gray-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative group">
                <input
                  type="password"
                  name="password"
                  required
                  className={cn(
                    "w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl",
                    "focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all",
                    "placeholder:text-gray-400 text-gray-900",
                    "group-hover:border-gray-300"
                  )}
                  placeholder="••••••••"
                />
                <Icon
                  icon="solar:lock-password-linear"
                  className="absolute left-3.5 top-3.5 text-gray-400 text-lg transition-colors group-hover:text-gray-500"
                />
              </div>
            </div>

            {submitError ? (
              <p className="text-sm text-red-500">{submitError}</p>
            ) : null}

            <PrimaryBtn
              title={isSubmitting ? "Signing Up..." : "Sign Up"}
              style="w-full rounded-xl"
              icon="solar:arrow-right-bold"
            />
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-[#FFCA42] hover:text-[#eeb526] transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
