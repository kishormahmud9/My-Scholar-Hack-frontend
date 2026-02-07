"use client";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import LoadingModal from "@/components/dashboard/Student/LoadingModal";
import EssayResultModal from "@/components/dashboard/Student/EssayResultModal";
import ConfirmationModal from "@/components/dashboard/Student/ConfirmationModal";
import FileUploadList from "@/components/dashboard/Student/FileUploadList";
import RecordingIndicator from "@/components/dashboard/Student/RecordingIndicator";
import AudioPlayer from "@/components/dashboard/Student/AudioPlayer";
import { useRouter } from "next/navigation";
import { apiPost, apiGet } from "@/lib/api";

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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [generatedEssay, setGeneratedEssay] = useState("");
    const [generatedSubject, setGeneratedSubject] = useState("");
    const [generatedEssayId, setGeneratedEssayId] = useState(null);
    const [activeScholarship, setActiveScholarship] = useState(null);
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

    // Check for active scholarship from Apply Now
    useEffect(() => {
        const storedScholarship = localStorage.getItem("selected_scholarship_for_application");
        if (storedScholarship) {
             const scholarship = JSON.parse(storedScholarship);
             setActiveScholarship(scholarship);
             
             // Optionally pre-fill prompt if empty
             setEssayPrompt(prev => prev || `Write an essay for the "${scholarship.title}" provided by ${scholarship.provider}. Description: ${scholarship.description || "N/A"}`);
        }

        // Check for returning from Edit Essay page
        const isEdited = localStorage.getItem("essay_edited");
        if (isEdited) {
            const editedEssayData = localStorage.getItem("essay_to_edit");
            if (editedEssayData) {
                const { essay, subject, id } = JSON.parse(editedEssayData);
                setGeneratedEssay(essay);
                setGeneratedSubject(subject);
                if (id) setGeneratedEssayId(id);
                // Re-open the modal with updated data
                setShowEssayModal(true); 
            }
            // Clear flag
            localStorage.removeItem("essay_edited");
        }
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
        if (!essayPrompt.trim() && uploadedFiles.length === 0) {
            alert("Please provide a prompt or upload files.");
            return;
        }

        // Show loading modal and start progress animation
        setShowLoadingModal(true);
        setLoadingProgress(0);

        // Progress simulation (0-90%)
        progressIntervalRef.current = setInterval(() => {
            setLoadingProgress(prev => {
                const next = prev + Math.random() * 5;
                return next > 90 ? 90 : next;
            });
        }, 500);

        try {
            // 1. Fetch User Profile Data
            let userProfileData = null;
            try {
                const profileRes = await apiGet("/profile/me");
                if (profileRes.success) {
                    userProfileData = profileRes.data;
                }
            } catch (err) {
                console.warn("Failed to fetch profile data for essay context:", err);
                // We proceed even if profile fetch fails, or should we stop? 
                // Usually better to proceed with partial data, but user said "niye nio" (take it).
            }

            const formData = new FormData();
            formData.append("prompt", essayPrompt);
            
            // Append Profile Data if available
            if (userProfileData) {
                formData.append("userProfile", JSON.stringify(userProfileData));
            }
            
            // 2. Files -> 'document'
            uploadedFiles.forEach((file) => {
                formData.append("document", file);
            });

            // 2. Audio -> 'audio'
            if (audioURL) {
                try {
                    const audioBlob = await fetch(audioURL).then(r => r.blob());
                    // Create a File object from the Blob
                    const audioFile = new File([audioBlob], "voice_instruction.wav", { type: "audio/wav" });
                    formData.append("audio", audioFile);
                } catch (e) {
                    console.error("Failed to append audio:", e);
                }
            }

            // 3. Title & Subject -> 'title', 'subject'
            // Use active scholarship context data if available, otherwise defaults
            const title = activeScholarship?.title || "Generated Essay";
            const subject = activeScholarship?.subject || "General";
            
            formData.append("title", title);
            formData.append("subject", subject);

            // API Call
            const response = await apiPost("/generate-essay/generate", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Complete progress
            clearInterval(progressIntervalRef.current);
            setLoadingProgress(100);

            // Wait a bit to show 100%
            setTimeout(() => {
                // Ensure we handle response structure correctly
                // Priority: contentFinal (new format), then essay (legacy/fallback)
                // Check both root level (if flattened) and data level (if nested)
                let essayContent = "No content generated.";
                const responseData = response?.data || response;

                if (typeof response === 'string') {
                    essayContent = response;
                } else if (responseData?.contentFinal) {
                    essayContent = responseData.contentFinal;
                } else if (responseData?.essay) {
                    essayContent = responseData.essay;
                } else if (response?.essay) {
                    essayContent = response.essay;
                } else if (response?.contentFinal) {
                    essayContent = response.contentFinal;
                } else if (responseData && typeof responseData === 'string') {
                    essayContent = responseData;
                } else if (response?.message) {
                    // Sometimes message contains the text if it's a simple return
                    essayContent = response.message; 
                }

                // Capture ID - prioritize the one associated with the content
                const essayId = responseData?.id || response?.id;
                
                // Capture Subject
                const essaySubject = responseData?.subject || response?.subject || activeScholarship?.subject || "General";

                // Handle case where content is "Existing essay:<br/>..."
                if (essayContent && typeof essayContent === 'string' && essayContent.startsWith("Existing essay:<br/>")) {
                    essayContent = essayContent.replace("Existing essay:<br/>", "");
                }

                // Reset form inputs as requested
                setEssayPrompt("");
                setUploadedFiles([]);
                if (audioURL) {
                    URL.revokeObjectURL(audioURL);
                }
                setAudioURL(null);
                setRecordingTime(0);

                setGeneratedEssay(essayContent);
                setGeneratedSubject(essaySubject);
                if (essayId) setGeneratedEssayId(essayId);

                setShowLoadingModal(false);
                setShowEssayModal(true);
            }, 500);

        } catch (error) {
            console.error("Essay generation failed:", error);
            clearInterval(progressIntervalRef.current);
            setShowLoadingModal(false);
            const errorMsg = error?.response?.data?.message || error?.message || "Failed to generate essay.";
            alert(`Error: ${errorMsg}`);
        }
    };

    const closeLoadingModal = () => {
        setShowLoadingModal(false);
        setLoadingProgress(0);
    };

    const closeEssayModal = () => {
        setShowEssayModal(false);
    };

    const handleSaveEssay = async () => {
        // Check if we have an active scholarship linkage
        if (activeScholarship?.id && generatedEssayId) {
            try {
                await apiPost("/application/save", {
                    scholarshipId: activeScholarship.id,
                    essayId: generatedEssayId
                });
                // Optionally clear active context after successful save
                localStorage.removeItem("selected_scholarship_for_application");
                localStorage.removeItem("current_active_scholarship"); 
            } catch (error) {
                console.error("Failed to save application linkage:", error);
                alert("Essay saved locally, but failed to link to application.");
            }
        }

        // Update Application Tracker locally (Legacy/Fallback or for instant UI update)
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
            }
        }

        navigation.push('/dashboard/student/view_essay')
        closeEssayModal();
    };

    const handleEditEssay = () => {
        // Save generate essay to local storage for editing
        localStorage.setItem("essay_to_edit", JSON.stringify({
            essay: generatedEssay,
            subject: generatedSubject,
            id: generatedEssayId
        }));
        navigation.push('/dashboard/student/essays/edit_essay')
    };

    const handleRemoveEssay = () => {
        // Open confirmation modal
        setShowDeleteModal(true);
    };

    const confirmRemoveEssay = () => {
        setGeneratedEssay("");
        closeEssayModal();
        setShowDeleteModal(false);
        // Using toast instead of alert would be better, but sticking to alert for simplicity per user pattern or upgrade later
        // alert("Essay removed successfully!"); 
        // Actually, let's just close silently or use a toast if available. The user used alert before.
        // We'll skip the alert to make it smoother since the modal is confirming the action.
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
                    {/* Active Scholarship Context */}
                    {activeScholarship && (
                        <div className="mb-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
                             <div className="flex justify-between items-start mb-1">
                                <h3 className="font-semibold text-gray-800 text-sm">Applying for: {activeScholarship.title}</h3>
                                <button 
                                   onClick={() => {
                                      setActiveScholarship(null);
                                      localStorage.removeItem("selected_scholarship_for_application");
                                      setEssayPrompt("");
                                   }}
                                   className="text-gray-400 hover:text-red-500"
                                >
                                   <Icon icon="mdi:close" width={16} height={16} />
                                </button>
                             </div>
                             {activeScholarship.subject && <p className="text-xs text-gray-500 mb-1">Subject: {activeScholarship.subject}</p>}
                             {activeScholarship.description && (
                                <p className="text-xs text-gray-600 line-clamp-2 italic">
                                   "{activeScholarship.description}"
                                </p>
                             )}
                        </div>
                    )}

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
                subject={generatedSubject}
                onClose={closeEssayModal}
                onSave={handleSaveEssay}
                onEdit={handleEditEssay}
                onRemove={handleRemoveEssay}
            />

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmRemoveEssay}
                title="Remove Essay?"
                message="Are you sure you want to remove this generated essay? This action cannot be undone."
                confirmText="Remove"
                confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
                icon="mdi:delete-forever"
            />
        </div>
    );
}
