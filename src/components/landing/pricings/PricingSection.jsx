"use client";
import { useState } from "react";
import SwitchBtn from "./switchBtn";
import SectionHead from "../SectionHead";
import Container from "../Container";
import PrimaryBtn from "../PrimaryBtn";
import { Icon } from "@iconify/react";

export default function PricingSection() {
  const [plans, setPlans] = useState(false);

  const pricingPlans = [
    {
      name: "Free Trial",
      Montlyprice: 0,
      Yearlyprice: 0,
      period: "per month",
      description: "Start Your Free Trial and Experience MyScholarHack Today",
      features: [
        "1 complete essay",
        "3 AI-powered revisions",
        "Basic profile setup",
        "Budgeting Tools",
      ],
      buttonText: "Start Free Trial",
    },

    {
      name: "Essay Hack",
      Montlyprice: 9.99,
      Yearlyprice: 89,
      period: "per month",
      description: "Perfect for students applying to a few scholarships",
      features: [
        "5 essays per month",
        "Unlimited AI refinements",
        "AI voice matching",
        "Application tracker",
        "Deadline reminders",
        "Export to DOCX & PDF",
      ],
      buttonText: "Start with Essay Hack",
    },

    {
      name: "Essay Hack+",
      Montlyprice: 19.99,
      Yearlyprice: 179,
      period: "per month",
      description: "Best for serious scholarship applicants",
      features: [
        "10 essays per month",
        "Unlimited revisions",
        "Advanced reminders",
        "Essay performance insights",
        "Scholarship suggestions",
        "Priority email support",
      ],
      buttonText: "Get Essay Hack+",
      highlight: true, // cause this card has a yellow border
    },

    {
      name: "Essay Hack Pro",
      Montlyprice: 29.99,
      Yearlyprice: 269,
      period: "per month",
      description: "Designed for students applying year-round",
      features: [
        "Unlimited essays",
        "Priority AI generation",
        "Advanced analytics",
        "Multiple profile versions",
        "24-hour priority support",
        "Early access to new features",
      ],
      buttonText: "Go Pro Today",
    },
  ];

  return (
    <section
      className={`w-full ${!plans
          ? "bg-[url('/backgroundImage.png')] bg-cover bg-center text-white"
          : "bg-white text-black"
        }`}
    >
      <Container>
        <div className="pt-20 lg:pt-[120px] pb-10 lg:pb-[72px] flex flex-col items-center justify-center gap-y-10 lg:gap-y-[60px]">
          <SectionHead
            Status="Pricing"
            statusStyle="text-[#FFB834] border-[#FFB834]"
            title="Select a plan that will empower your business growth"
            description="Each package includes personalized consultation and revisions to guarantee your satisfaction."
          />

          <div className="py-10">
            <SwitchBtn plans={plans} setPlans={setPlans} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`border ${plan.highlight ? "border-[#FFCA42]" : `${plans ? "border-[#31313114]" : "border-[#FFFFFF14]"}`
                  } px-4 py-6 rounded-2xl bg-[#FFFFFF05] backdrop-blur-sm`}
              >
                <div className="flex flex-col h-full">
                  <h2 className="text-3xl font-semibold">{plan.name}</h2>
                  <p className="text-base pt-5 pb-10 opacity-80">
                    {plan.description}
                  </p>
                  <div className="flex items-end">
                    <h4 className="text-4xl font-semibold">${!plans ? plan.Montlyprice : plan.Yearlyprice}</h4>
                    <p className="text-base opacity-70">/{!plans ? "per Month" : "per Year"}</p>
                  </div>
                  <div className={`flex-1 space-y-5 px-4 py-5 ${plans ? "bg-[#5858580a] border border-[#52525214]" : "bg-[#FFFFFF0A] border border-[#FFFFFF14]"} rounded-lg my-4`}>
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex gap-4">
                        <Icon
                          className="text-green-500"
                          icon="mdi:tick-circle"
                          height={20}
                          width={20}
                        />
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                  <PrimaryBtn
                    style="w-full rounded-full"
                    title={plan.buttonText}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
