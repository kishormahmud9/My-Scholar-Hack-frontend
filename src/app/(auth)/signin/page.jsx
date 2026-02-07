"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import PrimaryBtn from "@/components/landing/PrimaryBtn";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";
import { storeAuthData, getDashboardRoute } from "@/lib/auth";
import toast from "react-hot-toast";


export default function SignInPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [notVerified, setNotVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hendleSignin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    setIsSubmitting(true);
    setSubmitError("");
    setNotVerified(false);

    try {
      console.log("Attempting login...");
      const response = await apiPost("/auth/login", { email, password });
      console.log("Login API Response:", response);

      // Check if response has the expected structure
      if (response?.success) {
        // console.log("response", response, "response.data", response.data);
        const { accessToken, refreshToken, user } = response.data;
        console.log("User data:", user);

        // Store authentication data (tokens and user info)
        try {
            storeAuthData(accessToken, refreshToken, user);
            console.log("Auth data stored successfully");
        } catch (storageError) {
            console.error("Storage error:", storageError);
        }

        // Redirect to appropriate dashboard based on user role
        const dashboardRoute = getDashboardRoute();
        console.log("Redirecting to:", dashboardRoute);

        // Redirect logic based on plan status
        if (!user.isPlan && user.role === "STUDENT") {
           // No plan -> Redirect to Home
           console.log("No plan, redirecting to home");
           router.push("/");
        } else {
           // Has plan (or Admin) -> Redirect to Dashboard
           router.push(dashboardRoute);
        }
        
        toast.success("Login successful");
      } else {
        console.warn("Login failed: Success flag false", response);
        // Handle unexpected response structure
        setSubmitError("Invalid response from server. Please try again.");
      }
    } catch (err) {
      console.error("Login catch block:", err);
      // Check if error is related to unverified email
      const errorMessage =
        err?.data?.message ||
        err?.data?.error ||
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        err?.response?.message ||
        "Login failed. Please try again.";

      // Check if user is not verified (common error messages)
      const isNotVerified =
        errorMessage.toLowerCase().includes("not verified") ||
        errorMessage.toLowerCase().includes("email not verified") ||
        errorMessage.toLowerCase().includes("unverified") ||
        errorMessage.toLowerCase().includes("verify your email") ||
        err?.response?.status === 403 ||
        err?.data?.code === "EMAIL_NOT_VERIFIED";

      if (isNotVerified) {
        setNotVerified(true);
        // Store email in sessionStorage for verify-email page
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('pendingVerificationEmail', email);
        }
        setSubmitError("Your email is not verified. Please verify your email to continue.");
      } else {
        setSubmitError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFFAEC] mb-4">
              <Icon icon="solar:user-bold" className="text-[#FFCA42] text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign in to continue to your dashboard</p>
          </div>

          <form onSubmit={hendleSignin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
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
                <Icon icon="solar:letter-linear" className="absolute left-3.5 top-3.5 text-gray-400 text-lg transition-colors group-hover:text-gray-500" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className={cn(
                    "w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-xl",
                    "focus:ring-2 focus:ring-[#FFCA42]/20 focus:border-[#FFCA42] outline-none transition-all",
                    "placeholder:text-gray-400 text-gray-900",
                    "group-hover:border-gray-300"
                  )}
                  placeholder="••••••••"
                />
                <Icon icon="solar:lock-password-linear" className="absolute left-3.5 top-3.5 text-gray-400 text-lg transition-colors group-hover:text-gray-500" />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                >
                  <Icon 
                    icon={showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"} 
                    className="text-lg" 
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#FFCA42] focus:ring-[#FFCA42] transition-all" />
                <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm font-semibold text-[#FFCA42] hover:text-[#eeb526] transition-colors">
                Forgot Password?
              </Link>
            </div>

            {submitError ? (
              <div className="space-y-2">
                <p className="text-sm text-red-500">{submitError}</p>
                {notVerified && (
                  <Link
                    href="/verify-email"
                    className="text-sm font-semibold text-[#FFCA42] hover:text-[#eeb526] transition-colors inline-block"
                  >
                    Verify Email →
                  </Link>
                )}
              </div>
            ) : null}

            <PrimaryBtn
              title={isSubmitting ? "Signing In..." : "Sign In"}
              style="w-full rounded-xl"
              icon="solar:login-2-bold"
            />
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="font-semibold text-[#FFCA42] hover:text-[#eeb526] transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
