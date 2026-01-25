import Image from "next/image";
import { Icon } from "@iconify/react";

export default function ScholershipCard({ Details, onApply }) {
  const { title, deadline, provider, subject, amount } = Details;

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#FFCA42] transition-all duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative overflow-hidden h-48">
        <Image
          src={"/ScholershipThumbnail.png"}
          height={200}
          width={400}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
        />
        {/* Deadline Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
          <Icon icon="mdi:clock-outline" width={16} height={16} className="text-orange-500" />
          <span className="text-xs font-semibold text-orange-600">
            {deadline}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#FFCA42] transition-colors">
          {title}
        </h3>

        {/* Provider */}
        <div className="flex items-center gap-2 mb-4">
          <Icon icon="mdi:domain" width={16} height={16} className="text-gray-400" />
          <p className="text-sm text-gray-600">{provider}</p>
        </div>

        {/* Subject & Amount */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:book-outline" width={18} height={18} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700">{subject}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="mdi:currency-usd" width={18} height={18} className="text-green-500" />
              <span className="text-sm font-bold text-green-600">{amount}</span>
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => onApply && onApply(Details)}
            className="w-full bg-gradient-to-r from-[#FFCA42] to-[#FFB834] hover:from-[#FFB834] hover:to-[#FFCA42] text-gray-900 font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>Apply Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
