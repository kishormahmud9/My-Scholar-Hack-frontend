import Image from "next/image";
import Container from "@/components/landing/Container";
import SectionHead from "@/components/landing/SectionHead";
export default function AboutPage() {
  return (
    <div className=" lg:mt-[305px]">
      <Container>
        <div className="py-20">
          <div>
            <h3 className="text-3xl font-semibold mb-2.5">Our Story</h3>
            <p className="text-xl font-normal text-[#404040]">
              College is expensive. Scholarships are the answer. But writing
              dozens of unique, compelling essays? That's the problem. We
              created MyScholarHack because we lived this struggle ourselves.
              Staring at blank screens at 2 AM, trying to sound "impressive"
              while meeting impossible deadlines. Copying and pasting the same
              essay to different scholarships and hoping no one noticed.
              Watching friends give up on essay scholarships entirely because
              they "didn't have time." When AI essay tools emerged, we were
              hopeful—until we tried them. They generated generic garbage that
              sounded nothing like us. Worse, they made up achievements we
              didn't have. Scholarship committees can tell if essays are AI
              written, and so could detection software. We knew there had to be
              a better way
            </p>
          </div>
          <div className="my-9">
            <h3 className="text-3xl font-semibold mb-2.5">Our Misson</h3>
            <p className="text-xl font-normal text-[#404040]">
              To help 100,000 students win scholarships by 2027. We're building
              the tool we wish we'd had—one that respects your authenticity,
              amplifies your voice, and makes applying for scholarships
              something you can actually accomplish without sacrificing your
              integrity or your sleep
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">
            <div>
              <h3 className="text-3xl font-semibold mb-2.5">
                What Makes Us Different
              </h3>
              <p className="text-xl font-normal text-[#404040]">
                We believe in authenticity. Your real story is compelling
                enough. You don't need to fabricate experiences or sound like
                someone you're not. You just need help articulating what makes
                you special. We believe in your voice. AI should help you
                communicate better, not replace your voice with a robot's.
                That's why we built technology that learns how YOU write and
                helps you tell your story your way. We believe scholarships
                should be accessible. At $9.99-$29.99/month, MyScholarHack costs
                less than one textbook—and can help you win thousands of dollars
                in free money for school.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold mb-2.5">
                What Makes Us Different
              </h3>
              <p className="text-xl font-normal text-[#404040]">
                Authenticity First We never generate fake experiences. If it's
                not true to you, it doesn't go in your essay Privacy Matters
                Your documents, your data, your control. We encrypt everything
                and never sell your information Students Win We succeed when you
                win scholarships. That's it. That's the metric that matters.
                Continuous Improvement We're always listening to student
                feedback and making MyScholarHack better. Your suggestions shape
                our roadmap
              </p>
            </div>
          </div>
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
                  Built MyScholarHack after winning multiple merit scholarships; leads product vision and student outreach.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
