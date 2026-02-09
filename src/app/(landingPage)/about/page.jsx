import Image from "next/image";
import Container from "@/components/landing/Container";
import SectionHead from "@/components/landing/SectionHead";
export default function AboutPage() {
  return (
    <div className=" lg:mt-[305px]">
      <Container>
        <div className="py-20">
          <div>
            <h3 className="text-3xl font-semibold mb-2.5">About Us</h3>
            <p className="text-xl font-normal text-[#404040]">
              Applying for scholarships is one of the most overwhelming — and
              misunderstood — parts of the college process. Families are often
              left navigating vague prompts, tight deadlines, and high stakes
              with little guidance, while students struggle to translate who
              they are into clear, compelling writing — all while trying to stay
              authentic. We created this AI Scholarship Agent to change that
              experience. Our work sits at the intersection of college planning,
              student development, and responsible technology. We believe
              students deserve tools that support their thinking, not replace it
              — tools that help them clarify their ideas, organize their
              experiences, and communicate in their own voice with confidence.
              This platform was built for students who want to do their own work
              — and for parents and educators who want ethical, transparent
              support that respects student voice and institutional values. No
              shortcuts. No guarantees. Just smart structure, clarity, and
              guidance.
            </p>
          </div>
          <div className="my-9">
            <h3 className="text-3xl font-semibold mb-2.5">Our Misson</h3>
            <p className="text-xl font-normal text-[#404040]">
              Our mission is to help students express their real stories clearly
              and confidently — while keeping the scholarship process ethical,
              student-led, and aligned with how colleges and institutions expect
              work to be done.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 justify-between gap-10 lg:gap-14">
            <div>
              <h3 className="text-3xl font-semibold mb-2.5">We believe:</h3>
              <p className="text-xl font-normal text-[#404040]">
                <li>Students should remain the authors of their own words</li>
                <li>AI should act as a coach and guide, not a replacement</li>
                <li>
                  Scholarship writing should develop self-awareness, reflection,
                  and communication skills
                </li>
                <li>
                  Families deserve tools that reduce stress, not increase
                  pressure
                </li>
                <li>
                  Educators and counselors should feel confident recommending
                  the resources students use
                </li>
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold mb-2.5">
                That’s why this platform is designed to:
              </h3>
              <p className="text-xl font-normal text-[#404040]">
                <li>Preserve each student’s unique voice</li>
                <li>Encourage original thinking and reflection</li>
                <li>Support planning, drafting, and revision responsibly</li>
                <li>Help families manage opportunities without overwhelm</li>
              </p>
            </div>
          </div>

          <p className="text-xl font-normal text-[#404040] mt-5">
            Our goal isn’t just better essays — it’s a healthier, more
            thoughtful scholarship process that helps students grow while
            staying true to who they are.
          </p>
        </div>

        <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-[72px] flex flex-col items-center justify-center gap-y-10 lg:gap-y-[60px]">
          <SectionHead
            Status={"Teams"}
            statusStyle={"text-[#0D8E55] border-[#0D8E55] "}
            title={"Meet the Team"}
            description={
              "Built by students and engineers who know the scholarship grind we design tools that actually help."
            }
          />

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 ">
            <div className="border border-[#C4C4C4] rounded-2xl flex flex-col justify-center items-center p-4">
              <div className="w-full max-w-[568px] h-auto aspect-square h md:h-[478px]">
                <Image
                  className="w-full h-full object-cover"
                  src={"/ceoProfile.png"}
                  width={500}
                  height={500}
                  alt="C.E.O of MyScholerHack"
                />
              </div>
              <div>
                <h3 className="text-3xl font-semibold mt-5 mb-2.5">
                  Henry, Arthur
                </h3>
                <p className="text-xl font-medium my-3 text-[#404040]">
                  Co-Founder & CEO, MyScholarHack
                </p>
                <p className="text-base text-[#404040]">
                  Built MyScholarHack after winning multiple merit scholarships;
                  leads product vision and student outreach.
                </p>
              </div>
            </div>

            <div className="border border-[#C4C4C4] rounded-2xl flex flex-col justify-center items-center p-4">
              <div className="w-full max-w-[568px] h-auto aspect-square md:h-[478px]">
                <Image
                  className="w-full h-full object-cover"
                  src={"/ctoProtile.png"}
                  width={500}
                  height={500}
                  alt="C T O of MyScholerHack"
                />
              </div>
              <div>
                <h3 className="text-3xl font-semibold mt-5 mb-2.5">
                  Flores, Juanita
                </h3>
                <p className="text-xl font-medium my-3 text-[#404040]">
                  Co-Founder & CTO, MyScholarHack
                </p>
                <p className="text-base text-[#404040]">
                  Built MyScholarHack after winning multiple merit scholarships;
                  leads product vision and student outreach.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
