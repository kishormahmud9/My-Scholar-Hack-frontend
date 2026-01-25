
import StatusBtn from "./statusBtn";
import { cn } from "@/lib/utils";

export default function SectionHead({ title, description, Status, statusStyle }) {
  return (
    <div className="w-full max-w-[712px] text-center ">
      <div className="w-full flex justify-center">
        <StatusBtn
          style={statusStyle}
          title={Status}
        />
      </div>
      <h1 className="text-3xl md:text-5xl font-semibold text-center px-4 md:px-12 leading-[120%] my-2">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-[#666666] px-4 md:px-12">
        {description}
      </p>

    </div>
  );
}
