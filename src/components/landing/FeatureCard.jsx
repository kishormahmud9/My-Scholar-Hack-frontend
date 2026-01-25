"use client";

import { cn } from "@/lib/utils";

export default function FeatureCard({
  title,
  description,
  whyItMatters,
  howItWorks,
  whatYouCanUpload,
  trackEverything,
  smartFeatures,
  refineBy,
  imagePosition = "right",
  style
}) {
  return (
    <div className="max-w-6xl mx-auto">
      <div
        className={cn(
          "flex flex-col items-start gap-8 mb-16 rounded-3xl",
          imagePosition === "left" ? "lg:flex-row-reverse" : "lg:flex-row",
          style
        )}
      >

        <div className="w-full lg:w-[382px] h-[300px] lg:h-[484px] bg-linear-to-br from-gray-100 to-gray-200 rounded-lg shrink-0 relative overflow-hidden">

        </div>


        <div className="flex-1 w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>

          {description && (
            <p className="text-gray-700 leading-relaxed mb-4">{description}</p>
          )}

          {whyItMatters && (
            <>
              <p className="text-gray-700 leading-relaxed mb-4">
                {whyItMatters}
              </p>
              <h3 className="font-bold text-gray-900 mb-3">Why It Matters:</h3>
            </>
          )}

          {howItWorks && (
            <>
              <h3 className="font-bold text-gray-900 mb-3">How It Works:</h3>
              <ol className="space-y-2 mb-4">
                {howItWorks.map((step, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">{index + 1}.</span> {step}
                  </li>
                ))}
              </ol>
            </>
          )}

          {whatYouCanUpload && (
            <>
              <h3 className="font-bold text-gray-900 mb-3">
                What You Can Upload:
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                {whatYouCanUpload.map((item, index) => (
                  <div key={index} className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">{index + 1}.</span> {item}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 italic">
                The Result: Every essay is personalized with YOUR specific
                achievements, grades, and experiences. No generic placeholders!
              </p>
            </>
          )}

          {(trackEverything || smartFeatures) && (
            <div className="grid grid-cols-2 gap-8">
              {trackEverything && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">
                    Track Everything:
                  </h3>
                  <ol className="space-y-2">
                    {trackEverything.map((item, index) => (
                      <li key={index} className="text-gray-700 leading-relaxed">
                        <span className="font-semibold">{index + 1}.</span>{" "}
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {smartFeatures && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">
                    Smart Features:
                  </h3>
                  <ol className="space-y-2">
                    {smartFeatures.map((item, index) => (
                      <li key={index} className="text-gray-700 leading-relaxed">
                        <span className="font-semibold">{index + 1}.</span>{" "}
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          {refineBy && (
            <>
              <h3 className="font-bold text-gray-900 mb-3">Refine By:</h3>
              <ol className="space-y-2 mb-4">
                {refineBy.map((item, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    <span className="font-semibold">{index + 1}.</span> {item}
                  </li>
                ))}
              </ol>
              <p className="text-gray-700 leading-relaxed italic">
                Why It Matters: The best essays aren't written—they're
                rewritten. Refine your work until it's perfect, without worrying
                about running out of "credits" or paying per edit.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
