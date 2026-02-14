import Container from "@/components/landing/Container";
import FeatureCard from "@/components/landing/FeatureCard";

export default function Feature() {
  const features = [
  {
    title: "Smart Profile System",
    microHeadline: "Set It Up Once. Strengthen Every Essay After.",
    description: "Build your student’s profile once — activities, leadership, service, achievements, and past writing — all in one place.",
    whyItMatters: "The stronger the profile, the stronger every essay. One thoughtful setup saves hours later.",
    imagePosition: "right"
  },
  {
    title: "Story Discovery Engine",
    microHeadline: "Stop Guessing Which Story to Use.",
    description: "For each scholarship prompt, MyScholarHack identifies which real experiences best match what’s being asked.",
    whyItMatters: "Students don’t struggle because they lack stories — they struggle because they don’t know which story fits. This removes second-guessing and builds confidence fast.",
    imagePosition: "left"
  },
  {
    title: "Application Tracking Dashboard",
    microHeadline: "Never Miss Another Deadline.",
    description: "A central hub for every scholarship, deadline, requirement, and status update.",
    whyItMatters: "Opportunities aren’t lost from lack of talent — they’re lost from overwhelm. Clear visibility keeps everything on track.",
    imagePosition: "right"
  },
  {
    title: "Multiple Essay Management",
    microHeadline: "Turn Essays Into Assets.",
    description: "Reuse and adapt your strongest essays for similar scholarships — without rewriting from scratch.",
    whyItMatters: "The real drain isn’t writing — it’s starting over. Work smarter. Apply more. Avoid burnout.",
    imagePosition: "left"
  },
  {
    title: "Unlimited Refinement",
    microHeadline: "Improve Without Starting Over.",
    description: "Revise and strengthen drafts as many times as needed — without deleting everything and beginning again.",
    whyItMatters: "The best essays are refined, not rushed. Students build momentum instead of frustration.",
    imagePosition: "right"
  },
  {
    title: "Built Around Proven Essay Structure",
    microHeadline: "Strong Framework. Clear Flow. Real Story.",
    description: "Designed around proven storytelling and essay structure principles — clear introductions, compelling examples, focused conclusions.",
    whyItMatters: "Students don’t just get paragraphs. They start with structure — then make it fully their own.",
    imagePosition: "left"
  },
  {
    title: "Private, Closed AI System",
    microHeadline: "Your Student’s Work Stays Theirs.",
    description: "Essays are generated inside a secure, closed system within your account.",
    whyItMatters: "Nothing is shared, reused, or added to public AI databases. Their story belongs to them.",
    imagePosition: "right"
  }
]
;

  return (
    <Container>
      <div className="py-10">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </Container>
  );
}
