"use client";
import HeaderBG from "./HeaderBG";
import Container from "./Container";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import Title from "./Title";
import PrimaryBtn from "./PrimaryBtn";
import SecoundryBtn from "./SecoundryBtn";
import Image from "next/image";

export default function Header() {
  const Pathname = usePathname();

  if (
    !Pathname.startsWith("/signin")&&
    !Pathname.startsWith("/forgot-password")&&
    !Pathname.startsWith("/otp")&&
    !Pathname.startsWith("/register")&&
    !Pathname.startsWith("/verify-email") &&
    !Pathname.startsWith("/dashboard")
  ) {
    return (
      <HeaderBG Height={"h-[1152px]"}>
        <Container>
          <Navbar />
          {Pathname === "/" && (
            <div className="relative">
              <div className="w-full flex items-center justify-center">
                <div className="pt-20 pb-14 flex flex-col w-full max-w-[1063px] justify-center text-center px-4 md:px-0">
                  <div className="flex justify-center">
                    <Title title={"Trusted by thousands of students"} />
                  </div>
                  <h1 className="font-semibold text-3xl md:text-5xl lg:text-[64px] text-white text-center py-4">
                    Write Scholarship Essays That Sound Like You—Because They
                    Are You
                  </h1>
                  <p className="w-full max-w-[683px] mx-auto text-center text-white/70 text-base md:text-xl">
                    MyScholarHack uses your real stories, achievements, and
                    writing voice to help you create authentic scholarship
                    essays that win. No made-up experiences. No generic AI
                    fluff. Just your unique story, told powerfully
                  </p>
                  <div className="pt-10 px-10 lg:px-0 flex flex-col md:flex-row gap-4 justify-center w-full">
                    <PrimaryBtn
                      title={"Start Free Trial"}
                      icon={"line-md:arrow-right"}
                      style={"rounded-full"}
                    />
                    <SecoundryBtn
                      title={"How to Work"}
                      icon={"line-md:arrow-right"}
                      style={"rounded-full"}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-[184px] md:h-[367px] lg:h-[547px] bg-[#FFCA42] rounded-t-2xl absolute">
                <Image
                  className="w-full h-full object-cover object-top px-2 pt-2 rounded-t-2xl"
                  src={"/Dashboard.png"}
                  width={1000}
                  height={550}
                  alt="My Scholar Hack Dashboard"
                />
              </div>
            </div>
          )}
          {Pathname === "/about" && (
            <>
              <div className="w-full flex items-center justify-center">
                <div className="pt-20 pb-14 flex flex-col items-center w-full max-w-[1063px] justify-center px-4 md:px-0">
                  <div className="flex justify-center">
                    <Title title={"About Us"} />
                  </div>
                  <h1 className="w-full max-w-[565px] font-semibold text-3xl md:text-5xl lg:text-[64px] text-white text-center py-4">
                    We're Students Too—We Get It
                  </h1>
                  <p className="w-full max-w-[565px] mx-auto text-center text-white/70 text-base md:text-xl">
                    We built this tool from the same late-night essay struggles
                    we lived through.
                  </p>

                  <div className="w-full max-w-[1240px] h-auto md:h-[569px] mt-9">
                    <Image
                      className="w-full h-full object-cover object-center rounded-2xl"
                      src={"/teambanner.png"}
                      width={1000}
                      height={330}
                      alt="My Scholar Hack Dashboard"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          {Pathname === "/feature" && (
            <>
              <div className="w-full flex items-center justify-center">
                <div className="pt-20 pb-14 flex flex-col items-center w-full max-w-[1063px] justify-center px-4 md:px-0">
                  <div className="flex justify-center">
                    <Title title={"Feature"} />
                  </div>
                  <h1 className="font-semibold text-3xl md:text-5xl lg:text-[64px] text-white text-center py-4">
                    The Only Scholarship Essay Tool Built on Your Authentic
                    Voice
                  </h1>
                  <p className="mx-auto text-center text-white/70 text-base md:text-xl">
                    Most AI essay tools treat you like everyone else. They
                    generate generic content that sounds robotic and gets
                    flagged by AI detectors. MyScholarHack is different —we
                    learn who YOU are, how YOU write, and what makes YOUR story
                    unique. Then we help you tell that story in a way that wins
                    scholarships
                  </p>
                </div>
              </div>
            </>
          )}
          {Pathname === "/pricing" && (
            <>
              <div className="w-full flex items-center justify-center">
                <div className="pt-20 pb-14 flex flex-col items-center w-full max-w-[1063px] justify-center px-4 md:px-0">
                  <div className="flex justify-center">
                    <Title title={"Pricing"} />
                  </div>
                  <h1 className="font-semibold text-3xl md:text-5xl lg:text-[64px] text-white text-center py-4">
                    Affordable Plans That Pay for Themselves
                  </h1>
                  <p className="mx-auto text-center text-white/70 text-base md:text-xl">
                    One scholarship win covers months of MyScholarHack. Invest
                    in your future
                  </p>
                </div>
              </div>
            </>
          )}
          {Pathname === "/how-to-work" && (
            <>
              <div className="w-full flex items-center justify-center">
                <div className="pt-20 pb-14 flex flex-col items-center w-full max-w-[1063px] justify-center px-4 md:px-0">
                  <div className="flex justify-center">
                    <Title title={"How to Work"} />
                  </div>
                  <h1 className="font-semibold text-3xl md:text-5xl lg:text-[64px] text-white text-center py-4">
                    From Blank Page to Winning Essay in 4 Simple Steps
                  </h1>
                  <p className="mx-auto text-center text-white/70 text-base md:text-xl">
                    MyScholarHack guides you through the entire scholarship
                    essay process. No more staring at blank screens or wondering
                    what to write. Here's exactly how it works
                  </p>
                </div>
              </div>
            </>
          )}
          {Pathname === "/faq" && (
            <>
              <div className="w-full flex items-center justify-center">
                <div className="pt-20 pb-14 flex flex-col items-center w-full max-w-[1063px] justify-center px-4 md:px-0">
                  <div className="flex justify-center">
                    <Title title={"How to Work"} />
                  </div>
                  <h1 className="font-semibold text-3xl md:text-5xl lg:text-[64px] text-white text-center py-4">
                    From Blank Page to Winning Essay in 4 Simple Steps
                  </h1>
                  <p className="mx-auto text-center text-white/70 text-base md:text-xl">
                    MyScholarHack guides you through the entire scholarship
                    essay process. No more staring at blank screens or wondering
                    what to write. Here's exactly how it works
                  </p>
                </div>
              </div>
            </>
          )}
        </Container>
      </HeaderBG>
    );
  }
}
