"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import ReviewCard from "./ReviewCard";

export default function ReviewScroll() {
  return (
    <div className="w-full overflow-hidden">
      <div className="max-w-full mx-auto">
        <Swiper
          spaceBetween={20}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
          className="w-full"
          breakpoints={{
            0: {
              slidesPerView: 1, 
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide>
            <ReviewCard
              star={5}
              message={
                "I was so worried about AI detection tools, but MyScholarHack  helped me write essays that were 100% me. I won $8,000 in scholarships my first  semester using it!"
              }
              username={"Sarah M"}
              address={"Freshman, UCLA"}
              profileImage={"/ReviewUser.png"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard
              star={5}
              message={
                "I was so worried about AI detection tools, but MyScholarHack  helped me write essays that were 100% me. I won $8,000 in scholarships my first  semester using it!"
              }
              username={"Sarah M"}
              address={"Freshman, UCLA"}
              profileImage={"/ReviewUser.png"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard
              star={5}
              message={
                "I was so worried about AI detection tools, but MyScholarHack  helped me write essays that were 100% me. I won $8,000 in scholarships my first  semester using it!"
              }
              username={"Sarah M"}
              address={"Freshman, UCLA"}
              profileImage={"/ReviewUser.png"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard
              star={5}
              message={
                "I was so worried about AI detection tools, but MyScholarHack  helped me write essays that were 100% me. I won $8,000 in scholarships my first  semester using it!"
              }
              username={"Sarah M"}
              address={"Freshman, UCLA"}
              profileImage={"/ReviewUser.png"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard
              star={5}
              message={
                "I was so worried about AI detection tools, but MyScholarHack  helped me write essays that were 100% me. I won $8,000 in scholarships my first  semester using it!"
              }
              username={"Sarah M"}
              address={"Freshman, UCLA"}
              profileImage={"/ReviewUser.png"}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
