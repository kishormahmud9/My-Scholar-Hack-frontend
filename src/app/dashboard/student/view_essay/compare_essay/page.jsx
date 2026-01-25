"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

// Mock data
const ESSAY_DATA = [
    {
        id: "01",
        title: "The Impact of Artificial Intelligence on Modern Society",
        subject: "Computer Science",
        date: "2023-10-15",
        content: "Artificial Intelligence (AI) is transforming every aspect of our lives. From healthcare to finance, AI algorithms are making decisions that affect millions. However, this rapid advancement brings ethical challenges that must be addressed..."
    },
    {
        id: "02",
        title: "Sustainable Urban Planning in the 21st Century",
        subject: "Urban Studies",
        date: "2023-11-02",
        content: "As urbanization accelerates, the need for sustainable planning becomes critical. Cities are the engines of economic growth, but they are also major contributors to environmental degradation. Smart city initiatives offering a path forward..."
    },
    {
        id: "03",
        title: "Analysis of Shakespeare's Macbeth",
        subject: "English Literature",
        date: "2023-11-20",
        content: "Macbeth is a tragedy that explores the damaging effects of political ambition on those who seek power for its own sake. The character's descent into madness serves as a cautionary tale..."
    },
    {
        id: "04",
        title: "The Role of Microorganisms in Ecosystems",
        subject: "Biology",
        date: "2023-12-05",
        content: "Microorganisms play a vital role in nutrient cycling and decomposition. Without these microscopic entities, life as we know it would cease to exist. They are the unseen heroes of our planet's stability..."
    },
    {
        id: "05",
        title: "Economic Implications of Global Warming",
        subject: "Economics",
        date: "2023-12-10",
        content: "Global warming introduces significant risks to the global economy. Rising sea levels threaten coastal infrastructure, while changing weather patterns affect agriculture yields. The economic cost of inaction..."
    },
    {
        id: "06",
        title: "Modern Art Movements: 1900-1950",
        subject: "Art History",
        date: "2023-12-15",
        content: "The early 20th century saw an explosion of new artistic styles. From Cubism's geometric abstraction to Surrealism's dreamlike imagery, artists challenged traditional notions of representation..."
    },
    {
        id: "07",
        title: "Introduction to Quantum Mechanics",
        subject: "Physics",
        date: "2023-12-18",
        content: "Quantum mechanics describes the behavior of matter and light on the atomic scale. It reveals a universe that is fundamentally probabilistic, challenging our deterministic view of reality..."
    },
    {
        id: "08",
        title: "Machine Learning Algorithms",
        subject: "Computer Science",
        date: "2023-10-20",
        content: "Machine learning, a subset of AI, focuses on building systems that learn from data. By identifying patterns and making predictions, ML algorithms are revolutionizing industries from retail to healthcare..."
    }
];

// Helper to generate consistent mock scores based on essay ID
const generateAnalysis = (essay) => {
    if (!essay) return null;
    // Simple deterministic pseudo-random based on char codes
    const seed = essay.id.charCodeAt(0) + essay.title.length;
    const rand = (n) => ((seed + n) * 9301 + 49297) % 233280 / 233280;

    const contentScore = 7 + Math.floor(rand(1) * 3); // 7-9
    const relevanceScore = 6 + Math.floor(rand(2) * 4); // 6-9
    const structureScore = 7 + Math.floor(rand(3) * 3); // 7-9
    const grammarScore = 8 + Math.floor(rand(4) * 2); // 8-9

    const totalScore = Math.round(((contentScore + relevanceScore + structureScore + grammarScore) / 4) * 10);

    return {
        totalScore,
        breakdown: [
            { label: "Content Quality", score: contentScore, max: 10 },
            { label: "Relevance", score: relevanceScore, max: 10 },
            { label: "Structure", score: structureScore, max: 10 },
            { label: "Grammar & Style", score: grammarScore, max: 10 },
        ]
    };
};

function ScoreCard({ analysis, isWinner }) {
    if (!analysis) return null;

    return (
        <div className={`p-4 rounded-xl mb-4 ${isWinner ? 'bg-[#FFF9E5] border border-[#FFCA42]' : 'bg-[#F8F9FA] border border-[#E2E4E9]'}`}>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-sm text-[#6D6E73] font-medium uppercase tracking-wide">Overall Score</p>
                    <div className="flex items-baseline gap-1">
                        <span className={`text-3xl font-bold ${isWinner ? 'text-[#0C0C0D]' : 'text-[#6D6E73]'}`}>{analysis.totalScore}</span>
                        <span className="text-sm text-[#9CA3AF]">/100</span>
                    </div>
                </div>
                {isWinner && (
                    <div className="bg-[#FFCA42] text-[#0C0C0D] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Icon icon="lucide:trophy" width="14" height="14" />
                        Winning
                    </div>
                )}
            </div>

            <div className="space-y-2">
                {analysis.breakdown.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-[#4A4B57]">{item.label}</span>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-[#E2E4E9] rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${isWinner ? 'bg-[#FFCA42]' : 'bg-[#9CA3AF]'}`}
                                    style={{ width: `${(item.score / item.max) * 100}%` }}
                                ></div>
                            </div>
                            <span className="font-medium text-[#0C0C0D] w-6 text-right">{item.score}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CompareContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [originalEssay, setOriginalEssay] = useState(null);
    const [targetEssay, setTargetEssay] = useState(null);
    const [originalAnalysis, setOriginalAnalysis] = useState(null);
    const [targetAnalysis, setTargetAnalysis] = useState(null);

    useEffect(() => {
        const originalId = searchParams.get("original");
        const targetId = searchParams.get("target");

        if (originalId && targetId) {
            const original = ESSAY_DATA.find((e) => e.id === originalId);
            const target = ESSAY_DATA.find((e) => e.id === targetId);

            setOriginalEssay(original);
            setTargetEssay(target);

            // Generate scores
            if (original) setOriginalAnalysis(generateAnalysis(original));
            if (target) setTargetAnalysis(generateAnalysis(target));
        }
    }, [searchParams]);

    if (!originalEssay || !targetEssay) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFCA42] mb-4"></div>
                <p className="text-gray-500">Loading essays...</p>
            </div>
        );
    }

    const handleSelect = (essay) => {
        // Update Application Tracker if active
        const activeId = localStorage.getItem("current_active_scholarship");
        if (activeId) {
            const currentData = JSON.parse(localStorage.getItem("application_tracker_data") || "[]");
            const appIndex = currentData.findIndex(item => item.id === activeId);

            if (appIndex >= 0) {
                currentData[appIndex] = {
                    ...currentData[appIndex],
                    status: "Done",
                    essayTitle: essay.title,
                    essayContent: essay.content
                };
                localStorage.setItem("application_tracker_data", JSON.stringify(currentData));
                localStorage.removeItem("current_active_scholarship");
            }
        }

        // Navigate to Application Tracker instead of View Essay to show success
        router.push('/dashboard/student/application_tracker');
    };

    const isOriginalWinner = originalAnalysis?.totalScore >= targetAnalysis?.totalScore;

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0C0C0D]">Essay Comparison</h1>
                    <p className="text-[#6D6E73] mt-1">Comparing essays on <span className="font-semibold">{originalEssay.subject}</span></p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#6D6E73] hover:text-[#0C0C0D] hover:bg-[#F8F9FA] rounded-lg transition-colors"
                >
                    <Icon icon="lucide:arrow-left" width="18" height="18" />
                    Back to List
                </button>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
                {/* Original Essay */}
                <div className={`bg-white border-2 rounded-xl flex flex-col h-full overflow-hidden transition-all ${isOriginalWinner ? 'border-[#E2E4E9] shadow-sm' : 'border-[#E2E4E9] opacity-90'}`}>
                    <div className="bg-[#F8F9FA] p-4 border-b border-[#E2E4E9] sticky top-0 z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-[#EBF0FF] text-[#5069E5] text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">Original</span>
                            <span className="text-xs text-[#6D6E73]">{originalEssay.date}</span>
                        </div>
                        <h2 className="text-lg font-bold text-[#0C0C0D] line-clamp-1 mb-4">{originalEssay.title}</h2>

                        <ScoreCard analysis={originalAnalysis} isWinner={isOriginalWinner} />
                    </div>

                    <div className="p-6 overflow-y-auto flex-1 bg-white">
                        <div className="prose prose-sm max-w-none text-[#4A4B57]">
                            <div className="whitespace-pre-wrap">{originalEssay.content}</div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-[#E2E4E9] bg-[#F8F9FA]">
                        <button
                            onClick={() => handleSelect(originalEssay)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#E2E4E9] text-[#0C0C0D] font-medium rounded-lg hover:bg-[#F0F0F2] hover:border-[#CED2E5] transition-all"
                        >
                            Select this Essay
                        </button>
                    </div>
                </div>

                {/* Target Essay */}
                <div className={`bg-white border-2 rounded-xl flex flex-col h-full overflow-hidden transition-all ${!isOriginalWinner ? 'border-[#FFCA42] shadow-xl shadow-yellow-500/10 scale-[1.01]' : 'border-[#E2E4E9]'}`}>
                    <div className={`${!isOriginalWinner ? 'bg-[#FFF9E5]' : 'bg-[#F8F9FA]'} p-4 border-b border-[#E2E4E9] sticky top-0 z-10`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-[#FFCA42] text-[#0C0C0D] text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">Comparison</span>
                            <span className="text-xs text-[#6D6E73]">{targetEssay.date}</span>
                        </div>
                        <h2 className="text-lg font-bold text-[#0C0C0D] line-clamp-1 mb-4">{targetEssay.title}</h2>

                        <ScoreCard analysis={targetAnalysis} isWinner={!isOriginalWinner} />
                    </div>

                    <div className="p-6 overflow-y-auto flex-1 bg-white">
                        <div className="prose prose-sm max-w-none text-[#4A4B57]">
                            <div className="whitespace-pre-wrap">{targetEssay.content}</div>
                        </div>
                    </div>

                    <div className={`p-4 border-t border-[#E2E4E9] ${!isOriginalWinner ? 'bg-[#FFF9E5]' : 'bg-[#F8F9FA]'}`}>
                        <button
                            onClick={() => handleSelect(targetEssay)}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg transition-all ${!isOriginalWinner
                                ? 'bg-[#FFCA42] text-[#0C0C0D] hover:bg-[#EDB91C] shadow-sm'
                                : 'bg-white border border-[#E2E4E9] text-[#0C0C0D] hover:bg-[#F0F0F2]'}`}
                        >
                            Select this Essay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CompareEssayPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-[#FCFCFD]">
            <Suspense fallback={<div>Loading...</div>}>
                <CompareContent />
            </Suspense>
        </div>
    );
}
