"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";
import toast from "react-hot-toast";

export default function Topbar({ onMenuClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/dashboard/admin");
  const settingsPath = isAdmin
    ? "/dashboard/admin/settings"
    : "/dashboard/student/settings";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    apiPost("/auth/logout");
    toast.success("Logged out successfully");
    router.push("/signin");
  };

  return (
    <nav className="w-full h-[90px] flex justify-between lg:justify-end items-center gap-3 sm:gap-6 px-4 sm:px-8 py-6 bg-white border-b border-gray-200">
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-gray-700 hover:text-gray-900 transition-colors"
      >
        <Icon icon="mdi:menu" width={28} height={28} />
      </button>

      <div className="flex items-center gap-3 sm:gap-6">
        <Icon
          icon={"mingcute:notification-line"}
          width={28}
          height={28}
          className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
        />

        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="pl-3 sm:pl-6 border-l-2 border-gray-300 flex gap-2 sm:gap-3 items-center cursor-pointer hover:bg-gray-50 p-2 transition-colors"
          >
            <Image
              src={"/user1.png"}
              width={48}
              height={48}
              alt="Dashboard user"
              className="rounded-full"
            />
            <div className="hidden sm:block">
              <h4 className="text-base font-semibold text-gray-900">
                Jay Hargudson
              </h4>
              <p className="text-sm font-medium text-gray-500">Student</p>
            </div>
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn">
              <Link
                href={settingsPath}
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Icon
                  icon="solar:settings-linear"
                  width={20}
                  height={20}
                  className="text-gray-600"
                />
                <span className="text-gray-700 font-medium">Settings</span>
              </Link>

              <div className="border-t border-gray-200 my-1"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors cursor-pointer text-left"
              >
                <Icon
                  icon="solar:logout-2-linear"
                  width={20}
                  height={20}
                  className="text-red-600"
                />
                <span className="text-red-600 font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
