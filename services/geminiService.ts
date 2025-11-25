
import { GoogleGenAI } from "@google/genai";
import { PROJECTS, PRODUCTS, EXPERIENCE, EDUCATION, BLOGS } from '../constants';

// Safely get API Key
const apiKey = process.env.API_KEY || process.env.VITE_API_KEY;

// Initialize Gemini only if API key is present
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey.length > 0 && apiKey !== 'undefined') {
  try {
    ai = new GoogleGenAI({ apiKey: apiKey });
  } catch (e) {
    console.warn("Gemini AI initialization skipped (Invalid Key). switching to Demo Mode.");
  }
}

// Simulated Smart Responses (Fallback when no API Key)
const getFallbackResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  // Greetings
  if (lowerMsg.match(/\b(hi|hello|hey|greetings)\b/)) {
    return "Hello! I'm Ali Hossn's virtual assistant. I can help you with Digital Marketing, Video Editing services, or his portfolio. What do you need?";
  }
  
  // Identity
  if (lowerMsg.includes('who are you') || lowerMsg.includes('your name')) {
    return "I am an AI assistant for Ali Hossn, an expert Digital Marketer and Video Editor based in Bangladesh.";
  }

  // Experience / Skills
  if (lowerMsg.includes('experience') || lowerMsg.includes('skill') || lowerMsg.includes('work') || lowerMsg.includes('job')) {
    return `Ali has extensive experience in:\n1. SEO & Digital Marketing (Meta/Google Ads)\n2. Video Editing (Premiere Pro/After Effects)\n3. Graphic Design & Branding.`;
  }

  // Services
  if (lowerMsg.includes('service') || lowerMsg.includes('offer') || lowerMsg.includes('do')) {
    return "Ali offers:\n- SEO Optimization (Ranking #1)\n- Professional Video Editing for YouTube/Reels\n- Full Digital Marketing Strategy\n- Graphic Design.";
  }

  // Contact
  if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone') || lowerMsg.includes('hire')) {
    return "You can reach Ali directly at: helllo.alihosen@gmail.com or +8801781146747. He is available for remote work.";
  }

  // Shop
  if (lowerMsg.includes('shop') || lowerMsg.includes('course') || lowerMsg.includes('buy')) {
    return "Ali sells premium Video Editing courses and Design assets in the 'Shop' section.";
  }

  // Default
  return "I can tell you about Ali's Services (SEO, Video, Marketing), Portfolio, or Contact info. What are you looking for?";
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  // 1. Check if AI is available
  if (!ai) {
    await new Promise(resolve => setTimeout(resolve, 800)); 
    return getFallbackResponse(message);
  }

  // 2. Active AI Mode
  try {
    const systemInstruction = `
      You are the AI Assistant for Ali Hossn.
      
      Identity:
      - Name: Ali Hossn
      - Role: Digital Marketer, SEO Expert, Video Editor, Motion Graphics Designer.
      - Location: Sherpur, Mymensingh, Bangladesh (Available Globally/Remote).
      - Contact: helllo.alihosen@gmail.com | +8801781146747
      
      Tone:
      - Professional, Confident, Helpful, Persuasive.
      
      Knowledge Base:
      - Expertise: SEO (On-page/Off-page), Social Media Ads, Video Production (Premiere/After Effects), Branding.
      - Projects: ${JSON.stringify(PROJECTS.map(p => ({ title: p.title, category: p.category })))}
      - Products/Courses: ${JSON.stringify(PRODUCTS.map(p => ({ title: p.title, price: p.price, type: p.type })))}
      
      Goal:
      - Answer client queries about services.
      - Promote the 'Shop' for courses.
      - Encourage hiring for SEO/Video projects.
      - Keep answers concise.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm analyzing some data right now. Could you ask that again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "My AI brain is taking a short break. Please email Ali directly at helllo.alihosen@gmail.com.";
  }
};