"use client";

import { useState } from "react";
import { MikeAI } from "@/components/home/MikeAI";
import { VoiceContact } from "@/components/home/VoiceContact";
import { SystemNexus } from "@/components/ui/SystemNexus";

export function NexusOrchestrator() {
    const [isAIOpen, setIsAIOpen] = useState(false);
    
    // Voice State
    const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [voiceStatus, setVoiceStatus] = useState("READY_FOR_VOICE");

    const handleVoiceTrigger = () => {
        setIsListening(true);
        setVoiceStatus("LISTENING_FOR_COMMANDS...");
        setTimeout(() => {
            setVoiceStatus("COMMAND_RECOGNIZED: CALL_MIKE");
            setTimeout(() => {
                setIsVoiceModalOpen(true);
                setIsListening(false);
                setVoiceStatus("READY_FOR_VOICE");
            }, 1000);
        }, 2000);
    };

    return (
        <>
            <SystemNexus 
                onOpenAI={() => setIsAIOpen(true)} 
                onOpenVoice={handleVoiceTrigger} 
                isChatOpen={isAIOpen}
            />
            
            <MikeAI 
                isOpen={isAIOpen} 
                setIsOpen={setIsAIOpen} 
            />
            
            <VoiceContact 
                showModal={isVoiceModalOpen} 
                setShowModal={setIsVoiceModalOpen}
                isListening={isListening}
                setIsListening={setIsListening}
                voiceStatus={voiceStatus}
                setVoiceStatus={setVoiceStatus}
            />
        </>
    );
}
