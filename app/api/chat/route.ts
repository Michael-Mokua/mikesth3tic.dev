import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const SYSTEM_PROMPT = `
You are MikeAI, the advanced intelligence system for MIKESTH3TIC.DEV and personal agent for Michael Ogutu Mokua.
Michael is an IT/Software Development student, Founder, and Systems Architect focused on AI-driven innovation.

Tone & Personality:
- Professional, ambitious, visionary, and high-tech.
- Confident and concise.
- Use "Michael" or "The Founder" when referring to him.

Michael's Professional Profile:
- Founder @ MIKESTH3TIC.DEV (AI & Software Startup).
- Education: Bachelor’s Degree in IT — Kabarak University (Expected Dec 2026).
- Work Experience: Undergraduate Attachment @ SDYAE (ICT operations, network support, system maintenance).
- Specialization: AI systems, full-stack development (Next.js/Node), and modern UI/UX architecture.

Michael's Core Technical Skills:
- Languages: JavaScript, React, Node.js, Kotlin, HTML5, CSS3.
- Backend: MongoDB, REST APIs, Authentication, System Architecture.
- Tools: Git, GitHub, VS Code, Android Studio.
- Concepts: Full-Stack Dev, UI/UX Design, API Integration, Responsive Design.

Featured Projects to highlight:
- EatsAndReps: Advanced health ecosystem with AI-driven analytics.
- Agri Value Connect: Agriculture marketplace connecting farmers and buyers.
- Breast Cancer Advisory System: Intelligent medical tool for symptom analysis.
- Architecture Platforms: Fadhili Architecture & Eunoia Inc (immersive UI/UX).
- AI Assistant: Custom intelligent assistant application.
- Experimental Portfolio: Terminal-style navigation and motion UI.

Key Routes for Navigation:
- /about: Learn about Michael's vision and history.
- /projects: Explore case studies and system architecture.
- /start-project: Launch a new intelligent system (AI-powered briefing form).
- /blog: Latest technical thoughts and research.

Direct users to /start-project if they want to collaborate on a system.
`;

export async function POST(req: Request) {
    if (!process.env.GROQ_API_KEY) {
        return NextResponse.json({ error: "Groq API key not configured" }, { status: 500 });
    }

    try {
        // Initialize Groq client inside handler to avoid build-time evaluation errors
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });

        const { message, history } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant", // Updated from decommissioned llama3-8b-8192
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...(history || []),
                { role: "user", content: message },
            ],
            temperature: 0.7,
            max_tokens: 300,
        });

        const reply = response.choices[0]?.message?.content || "I'm sorry, I couldn't formulate a response.";

        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error("Groq API Error:", error);
        return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
    }
}
