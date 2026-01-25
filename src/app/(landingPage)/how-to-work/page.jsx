import Container from "@/components/landing/Container";
import WorkingSteps from "@/components/landing/WorkingSteps";

export default function Howtowork() {
  const steps = [
    {
      number: 1,
      title: "Build Your Profile (One-Time Setup)",
      description:
        "What You'll Do: Create your comprehensive profile by uploading key documents and filling out your background information.",
      columns: [
        {
          heading: "Upload These Documents:",
          items: [
            "Resume or CV",
            "High school/college transcripts",
            "Letters of recommendation",
            "A writing sample (essay, blog post, personal statement)",
            "Any awards or certificates",
          ],
        },
        {
          heading: "Tell Us About:",
          items: [
            "Your academic background/GPA, major, honors",
            "Extracurricular activities",
            "Volunteer work and community service",
            "Work experience",
            "Personal challenges you've overcome",
            "Hobbies and aspirations",
            "What makes you unique",
          ],
        },
      ],
      timeInvestment: "30-45 minutes (one time only)",
      whyItMatters:
        "Why This Matters: This comprehensive profile becomes the foundation for every essay you write. The more detail you provide, the more personalized and authentic your essays will be.",
    },
    {
      number: 2,
      title: "Add a Scholarship",
      description:
        "What You'll Do: Create your comprehensive profile by uploading key documents and filling out your background information.",
      columns: [
        {
          heading: "Input Required:",
          items: [
            "Scholarship name",
            "Deadline",
            "Award amount",
            "Scholarship provider/organization",
            "Essay prompt or question",
            "Word count requirement",
            "Any special requirements",
          ],
        },
        {
          heading: "Quick Add Options:",
          items: [
            "Paste the scholarship URL and we'll auto-fill most field",
            "Manually enter details",
            "Import from Scholarships.com, Fastweb, or College Board",
          ],
        },
      ],
      timeInvestment: "2-3 minutes per scholarship",
    },
    {
      number: 3,
      title: "Generate Your Essay",
      description:
        'What You\'ll Do: Click "Generate Essay" and let our AI guide you through creating an authentic, personalized draft.',
      columns: [
        {
          heading: "The Process:",
          items: [
            "Story Discovery (5-10 questions)",
            "Experience Selection",
            "First Draft Generation",
            "Detail Addition",
            "Voice Tweaking",
          ],
        },
      ],
      timeInvestment: "10-15 minutes (including question answering)",
      whyItMatters:
        "What You Get: A complete essay draft that sounds like you, tells your real story, and directly addresses the scholarship prompt.",
    },
    {
      number: 4,
      title: "Refine and Perfect",
      description:
        "What You'll Do: Review your essay draft and refine it until it perfectly captures your story and voice.",
      columns: [
        {
          heading: "Refinement Options:",
          items: [
            "Tone Adjustment",
            "Flow Shift",
            "Length Change",
            "Detail Addition",
            "Voice Tweaking",
          ],
        },
        {
          heading: "AI-Assisted Editing:",
          items: [
            "Grammar and spelling checks",
            "Flow improvements",
            "Clarity enhancements",
            "Redundancy removal",
          ],
        },
      ],
      additionalInfo: [
        {
          label: "Manual Editing",
          text: "Edit the essay directly in our built-in editor. AI-dropped, formatting tools included.",
        },
        {
          label: "Unlimited Revisions",
          text: "5-30 minutes per essay (unlimited iterations)",
        },
      ],
      whyItMatters:
        "What You Get: A complete essay draft that sounds like you, tells your real story, and directly addresses the scholarship prompt.",
      highlightBox: {
        heading: "When You're Done:",
        items: [
          "Save to your dashboard",
          "Export as Word doc, PDF, or plain text",
          "Copy directly into scholarship application",
          "Track that you've completed the application",
        ],
      },
    },
    {
      number: 5,
      title: "Submit and Track",
      description:
        "What You'll Do: Copy your finished essay into the scholarship application and mark it as submitted in your dashboard.",
      columns: [
        {
          heading: "Tracking Features:",
          items: [
            "See all scholarships at a glance",
            "Filter by status (not started, in progress, submitted, results pending)",
            "View upcoming deadlines in calendar view",
            "Get email reminders before deadlines",
            "Track which scholarships you've won",
          ],
        },
        {
          heading: "After Submission:",
          items: [
            "Won the scholarship (and how much)",
            "Was a finalist but didn't win",
            "Didn't receive the scholarship",
            "View your success rate",
          ],
        },
      ],
      whyItMatters:
        "Why Track Results: Over time, you'll see patterns in which types of essays and scholarships you're most successful with. Double down on what works!",
    },
  ];

  return (
    <Container>
      <div className="py-22">
        {steps.map((step) => (
          <WorkingSteps key={step.number} {...step} />
        ))}
      </div>
    </Container>
  );
}
