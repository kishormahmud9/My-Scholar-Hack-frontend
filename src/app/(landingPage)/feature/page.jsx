import Container from "@/components/landing/Container";
import FeatureCard from "@/components/landing/FeatureCard";

export default function Feature() {
  const features = [
    {
      title: "Voice Matching Technology",
      description:
        "What it is: Upload a writing sample (an essay, blog post, or even an email you're proud of), and our AI analyzes your unique writing style: word choice, sentence structure, and tone structure and tone.",
      whyItMatters:
        'When you generate a scholarship easily it sounds like YOU wrote it—because it\'s built on your authentic voice. No more robotic, generic AI content that screams "I used ChatGPT!"',
      howItWorks: [
        "Upload any piece of your writing (500+ words recommended)",
        "Our AI maps your vocabulary and sentence structure",
        "Every essay we help you write mirrors your natural style",
        "Scholarship reviewers—and AI detectors—see authentic work",
      ],
      imagePosition: "right",
    },
    {
      title: "Smart Profile System",
      description:
        "What it is: Build a comprehensive profile by uploading your resume, transcripts, recommendation letters, and personal statements. Tell us about your extracurriculars, volunteer work, and achievements.",
      whyItMatters:
        "Instead of filling out the same information 20 times for 20 different scholarships, you do it once. We pull the relevant details for each essay, automatically.",
      whatYouCanUpload: [
        "Resume or CV",
        "Award certificates",
        "High school/college transcripts",
        "Financial statements",
        "Letters of recommendation",
        "Previous scholarship essays",
      ],
      imagePosition: "left",
    },
    {
      title: "Story Discovery Engine",
      description:
        "What it is: Our AI interviews you about each scholarship prompt, asking clarifying questions to help you identify which of your experiences best fits the requirement.",
      whyItMatters:
        "You might not realize that your summer job taught you leadership, or that volunteering at the food bank is the perfect example for a community service prompt. We help you see the gold in your own experiences.",
      howItWorks: [
        "Input the scholarship prompt",
        "Answer 5-10 targeted questions about your background",
        "Our AI identifies 3-4 relevant experiences from your profile",
        "You choose which angle resonates most with you",
        "We generate an essay based on YOUR chosen story",
      ],
      imagePosition: "right",
    },
    {
      title: "Authentic Content Guarantee",
      description:
        "What it is: Regurgitated, copied, reused experiences, achievements, or details. Everything in your essay comes from your real life as documented in your profile.",
      whyItMatters:
        'When you generate a scholarship essay, it sounds like YOU wrote it—because it\'s built on your authentic voice. No more robotic, generic AI content that screams "I used ChatGPT!"',
      howItWorks: [
        "Scholarship committees can spot fake stories",
        "AI detectors flag fabricated content",
        "Your integrity matters",
        "Your real story is compelling enough—you don't need to lie",
      ],
      imagePosition: "left",
    },
    {
      title: "Application Tracking Dashboard",
      description:
        "What it is: A centralized hub where you can see all your scholarships, applications, deadlines, requirements, and status updates.",
      whyItMatters:
        'When you generate a scholarship essay, it sounds like YOU wrote it—because it\'s built on your authentic voice. No more robotic, generic AI content that screams "I used ChatGPT!"',
      trackEverything: [
        "Scholarship name and amount",
        "Deadline (with automatic reminders)",
        "Required materials (easily transcript, letters)",
        "Application status (not started, in progress, submitted, won, denied)",
        "Essays written for each scholarship",
      ],
      smartFeatures: [
        "Color-coded view of all deadlines",
        "Email reminders 1 week and 1 day before due",
        "Quick-add scholarships by URL",
        "Filter by status, deadline, or amount",
      ],
      imagePosition: "right",
    },
    {
      title: "Unlimited Iterations",
      description:
        "What it is: Once you generate an essay, refine it as many times as you want. Each iteration improves the essay while keeping your authentic voice.",
      refineBy: [
        "Adjusting tone (more formal, more personal, more enthusiastic)",
        "Changing hook/intro/thesis (without altering the core story)",
        "Shortening or lengthening",
        "Adding specific details you remembered",
        "Fixing anything that doesn't sound like you",
      ],
      imagePosition: "left",
    },
    {
      title: "Multiple Essay Management",
      description:
        "What it is: Reuse and adapt your best essays for similar scholarships. Our similarity engine suggests which existing essays could work with minor adjustments.",
      whyItMatters:
        "Save Time: Write one great essay about leadership. Use it (with tweaks!) for 5 different leadership scholarships rather than starting from scratch each time. Smart Matching: After you write each essay, we suggest similar scholarships where that essay could work with minor adjustments.",
      imagePosition: "right",
    },
  ];

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
