"use client";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const Pathname = usePathname();

  const products = [
    { Title: "How It Works", path: "/" },
    { Title: "Features", path: "/" },
    { Title: "Pricing", path: "/" },
    { Title: "Start Free Trial", path: "/" },
  ];
  const company = [
    { Title: "About Us", path: "/" },
    { Title: "Our Mission", path: "/" },
    { Title: "FAQ", path: "/" },
  ];
  const contacts = [
    "01358-854545",
    "support@myscholarhack.com.",
    "2115 Ash Dr. San Jose,South Dakota 2584714",
  ];

  if (
    !Pathname.startsWith("/signin") &&
    !Pathname.startsWith("/forgot-password") &&
    !Pathname.startsWith("/otp") &&
    !Pathname.startsWith("/register") &&
    !Pathname.startsWith("/verify-email") &&
    !Pathname.startsWith("/dashboard")
  ) {
    return (
      <div className="bg-[#1A1A1A] pb-16 pt-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-y-0">
            <div>
              <div className="text-white flex items-center gap-4">
                <Image
                  src={"/logo.png"}
                  height={48}
                  width={48}
                  alt="MyScholarHack"
                />
                <h1 className="text-4xl font-semibold">MyScholarHack</h1>
              </div>
              <p className="text-[#ECECEC] mt-4 text-justify">
                MyScholarHack helps students create authentic scholarship essays
                using AI that matches their real voice, while keeping
                applications organized and stress-free.
              </p>
            </div>
            <div className="flex justify-start lg:justify-end mt-8 lg:mt-0">
              <div className="">
                <p className="text-[#FFFFFF] text-xl lg:text-2xl font-semibold">
                  Products
                </p>
                <ul className="text-white flex flex-col gap-3 mt-3.5">
                  {products.map((item, idx) => (
                    <li key={idx} className="">
                      <Link href={item.path}>{item.Title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-start lg:justify-end mt-8 lg:mt-0">
              <div className="">
                <p className="text-[#FFFFFF] text-xl lg:text-2xl font-semibold">
                  Company
                </p>
                <ul className="text-white flex flex-col gap-3 mt-3.5">
                  {company.map((item, idx) => (
                    <li key={idx} className="">
                      <Link href={item.path}>{item.Title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-start lg:justify-end mt-8 lg:mt-0">
              <div className="w-full lg:w-[211px]">
                <p className="text-[#FFFFFF] text-xl lg:text-2xl font-semibold">
                  Contact
                </p>
                <ul className="text-white flex flex-col gap-3 mt-3.5">
                  {contacts.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="text-white border-t-2 border-[#D9D9D9] flex flex-col-reverse md:flex-row items-center justify-between mt-10 lg:mt-[72px] pt-4 gap-y-4">
            <p className="text-center md:text-left">
              © 2025 MyScholarHack. All rights reserved.
            </p>
            <p>Privacy and Policy</p>
          </div>
        </Container>
      </div>
    );
  }
}
