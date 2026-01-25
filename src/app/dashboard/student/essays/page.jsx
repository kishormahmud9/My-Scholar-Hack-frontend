"use client";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import LoadingModal from "@/components/dashboard/Student/LoadingModal";
import EssayResultModal from "@/components/dashboard/Student/EssayResultModal";
import FileUploadList from "@/components/dashboard/Student/FileUploadList";
import RecordingIndicator from "@/components/dashboard/Student/RecordingIndicator";
import AudioPlayer from "@/components/dashboard/Student/AudioPlayer";
import { useRouter } from "next/navigation";

export default function Essays() {
    const [essayPrompt, setEssayPrompt] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioURL, setAudioURL] = useState(null);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [showEssayModal, setShowEssayModal] = useState(false);
    const [generatedEssay, setGeneratedEssay] = useState("");
    const navigation = useRouter()

    const fileInputRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const recordingIntervalRef = useRef(null);
    const streamRef = useRef(null);
    const progressIntervalRef = useRef(null);

    useEffect(() => {
        return () => {
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
            }
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file => {
            const isImage = file.type.startsWith('image/');
            const isPDF = file.type === 'application/pdf';
            return isImage || isPDF;
        });

        setUploadedFiles(prev => [...prev, ...validFiles]);
    };

    const removeFile = (index) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);

                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
            setIsPaused(false);

            recordingIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please grant permission.');
        }
    };

    const togglePauseRecording = () => {
        if (!mediaRecorderRef.current) return;

        if (isPaused) {
            mediaRecorderRef.current.resume();
            recordingIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
            setIsPaused(false);
        } else {
            mediaRecorderRef.current.pause();
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
            }
            setIsPaused(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        if (recordingIntervalRef.current) {
            clearInterval(recordingIntervalRef.current);
        }
        setIsRecording(false);
        setIsPaused(false);
    };

    const deleteRecording = () => {
        if (audioURL) {
            URL.revokeObjectURL(audioURL);
        }
        setAudioURL(null);
        setRecordingTime(0);
    };

    const handleGenerateEssay = async () => {
        // Show loading modal and start progress animation
        setShowLoadingModal(true);
        setLoadingProgress(0);

        // Simulate essay generation with progress
        progressIntervalRef.current = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressIntervalRef.current);
                    return 100;
                }
                // Increase progress by random increments
                return Math.min(prev + Math.random() * 15, 100);
            });
        }, 300);

        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            clearInterval(progressIntervalRef.current);
            setLoadingProgress(100);

            // Wait a bit to show 100% before opening result modal
            setTimeout(() => {
                // Generate demo essay content
                const demoEssay = `# The Importance of Environmental Conservation

In today's rapidly changing world, environmental conservation has become more crucial than ever. Climate change, deforestation, and pollution pose significant threats to our planet's future.

## Key Points

1. **Climate Action**: Reducing carbon emissions is essential for a sustainable future.
2. **Biodiversity**: Protecting ecosystems ensures the survival of countless species.
3. **Sustainable Practices**: Implementing eco-friendly solutions in daily life makes a difference.

## Conclusion

We must act now to preserve our environment for future generations. Every small action contributes to a larger impact on our planet's health and sustainability.`;

                setGeneratedEssay(demoEssay);
                setShowLoadingModal(false);
                setShowEssayModal(true);
            }, 500);
        }, 5000); // 5 seconds total generation time
    };

    const closeLoadingModal = () => {
        setShowLoadingModal(false);
        setLoadingProgress(0);
    };

    const closeEssayModal = () => {
        setShowEssayModal(false);
    };

    const handleSaveEssay = () => {
        // Update Application Tracker if active
        const activeId = localStorage.getItem("current_active_scholarship");
        if (activeId) {
            const currentData = JSON.parse(localStorage.getItem("application_tracker_data") || "[]");
            const appIndex = currentData.findIndex(item => item.id === activeId);

            if (appIndex >= 0) {
                // Extract title from content (first line usually) or use default
                const titleLine = generatedEssay.split('\n')[0].replace(/^#\s*/, '').trim();
                const essayTitle = titleLine || "Generated Essay";

                currentData[appIndex] = {
                    ...currentData[appIndex],
                    status: "Done",
                    essayTitle: essayTitle,
                    essayContent: generatedEssay
                };
                localStorage.setItem("application_tracker_data", JSON.stringify(currentData));
                // Optional: clear active scholarship or keep it
                localStorage.removeItem("current_active_scholarship");
            }
        }

        navigation.push('/dashboard/student/view_essay')
        closeEssayModal();
    };

    const handleEditEssay = () => {
        navigation.push('/dashboard/student/essays/edit_essay')
    };

    const handleRemoveEssay = () => {
        // Implement remove functionality
        if (confirm("Are you sure you want to remove this essay?")) {
            setGeneratedEssay("");
            closeEssayModal();
            alert("Essay removed successfully!");
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="w-full max-w-[600px]">
                <div className="text-center mb-6">
                    <h1 className="text-[44px] font-bold text-[#2D3748] mb-2">
                        Create a Essay
                    </h1>
                    <p className="text-[17px] text-[#718096]">
                        Here's your progress this week.
                    </p>
                </div>

                <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-8 mb-6 min-h-[200px] relative">
                    <textarea
                        value={essayPrompt}
                        onChange={(e) => setEssayPrompt(e.target.value)}
                        placeholder="Write anything..."
                        className="w-full h-[100px] resize-none focus:outline-none text-[#4A5568] placeholder-[#A0AEC0] text-[15px] bg-transparent"
                    />

                    <div className="absolute bottom-4 right-8 flex items-center gap-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,.pdf"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="text-[#A0AEC0] hover:text-[#718096] transition-colors"
                            title="Upload files"
                        >
                            <Icon icon="mdi:attachment" width={22} height={22} />
                        </button>

                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            className="bg-[#F6C844] hover:bg-[#EDB91C] w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                            title={isRecording ? "Stop recording" : "Start recording"}
                        >
                            <Icon
                                icon={isRecording ? "mdi:stop" : "mdi:microphone"}
                                width={22}
                                height={22}
                                className="text-[#2D3748]"
                            />
                        </button>
                    </div>
                </div>

                <FileUploadList files={uploadedFiles} onRemove={removeFile} />

                <RecordingIndicator
                    isRecording={isRecording}
                    isPaused={isPaused}
                    recordingTime={recordingTime}
                    onTogglePause={togglePauseRecording}
                />

                <AudioPlayer
                    audioURL={audioURL}
                    recordingTime={recordingTime}
                    onDelete={deleteRecording}
                />

                <button
                    onClick={handleGenerateEssay}
                    className="w-full bg-[#F6C844] hover:bg-[#EDB91C] text-[#2D3748] font-semibold py-4 rounded-full transition-colors text-[16px]"
                >
                    Generate Essay
                </button>
            </div>

            <LoadingModal
                isOpen={showLoadingModal}
                progress={loadingProgress}
                onClose={closeLoadingModal}
            />

            <EssayResultModal
                isOpen={showEssayModal}
                essay={generatedEssay}
                onClose={closeEssayModal}
                onSave={handleSaveEssay}
                onEdit={handleEditEssay}
                onRemove={handleRemoveEssay}
            />
        </div>
    );
}
