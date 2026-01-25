"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SecoundryBtn from "./SecoundryBtn";
import PrimaryBtn from "./PrimaryBtn";
import { Icon } from "@iconify/react";

export default function Navbar() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const Nablink = [
    {
      Tiltle: "About",
      pathName: "/about",
    },
    {
      Tiltle: "Feature",
      pathName: "/feature",
    },
    {
      Tiltle: "Pricing",
      pathName: "/pricing",
    },
    {
      Tiltle: "How to Work",
      pathName: "/how-to-work",
    },
    {
      Tiltle: "FAQ",
      pathName: "/faq",
    },
  ];

  return (
    <nav className="flex items-center justify-between pt-8 relative">
      <div className="text-white flex items-center gap-4">
        <Link href="/">
          <Image src={"/logo.png"} height={48} width={48} alt="MyScholarHack" />
        </Link>
        <Link href="/">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">MyScholarHack</h1>
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex text-white text-base font-medium items-center gap-10">
        {Nablink.map((link, idx) => (
          <li
            className={cn(pathName === link.pathName && "text-[#FFCA42]")}
            key={idx}
          >
            <Link href={link.pathName}>{link.Tiltle}</Link>
          </li>
        ))}
      </ul>

      <div className="hidden lg:flex justify-center gap-4">
        <Link href={"/signin"}>
          <SecoundryBtn
            style={"rounded-full hover:text-black"}
            title={"Sign in"}
          />
        </Link>
        <Link href={"/register"}>
          <PrimaryBtn style={"rounded-full"} title={"Register"} />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          <Icon
            icon={isOpen ? "mingcute:close-fill" : "mingcute:menu-fill"}
            width="32"
            height="32"
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {/* Mobile Menu Overlay & Panel */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        {/* Backdrop / Overlay */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Sliding Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 w-[270px] h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Panel Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-2">
                {/* Reusing Logo logic or just Text if preferred, sticking to simple text/logo combo */}
                <Image src={"/logo.png"} height={32} width={32} alt="MyScholarHack" />
                <span className="text-xl font-bold text-gray-900">MyScholar</span>
              </div>
            </Link>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-900">
              <Icon icon="mingcute:close-line" width="24" height="24" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-6">
            <ul className="flex flex-col gap-2">
              {Nablink.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.pathName}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                      pathName === link.pathName
                        ? "bg-[#FFFAEC] text-gray-900 border-l-4 border-[#FFCA42]"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    {link.Tiltle}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto border-t border-gray-100 pt-6 flex flex-col gap-3">
              <Link href={"/signin"} onClick={() => setIsOpen(false)}>
                <SecoundryBtn
                  style={"w-full justify-center rounded-lg text-black border border-gray-200"}
                  title={"Sign in"}
                />
              </Link>
              <Link href={"/register"} onClick={() => setIsOpen(false)}>
                <PrimaryBtn style={"w-full justify-center rounded-lg"} title={"Register"} />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </nav>
  );
}
