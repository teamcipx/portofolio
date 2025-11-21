import { GoogleGenAI } from "@google/genai";
import { PROJECTS, PRODUCTS } from '../constants';

// Safely get API Key
const apiKey = process.env.API_KEY;

// Initialize Gemini only if API key is present to prevent immediate crashes
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey: apiKey });
  } catch (e) {
    console.error("Failed to initialize Gemini AI:", e);
  }
}

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!ai) {
    console.warn("Gemini AI not initialized (Missing API_KEY)");
    return "I'm currently in offline mode (API Key missing). Please try again later or contact Siam directly via the form.";
  }

  try {
    // Construct the system instruction
    const systemInstruction = `
      You are an AI assistant for Siam Hasan, a professional Graphic Designer.
      Your tone is professional, creative, and friendly.
      
      Here is context about Siam's work:
      Projects: ${JSON.stringify(PROJECTS.map(p => ({ title: p.title, category: p.category, description: p.description })))}
      Shop Products: ${JSON.stringify(PRODUCTS.map(p => ({ title: p.title, price: p.price, type: p.type })))}
      
      If asked about services: He offers Branding, Web Design, Illustrations, and UI/UX.
      If asked about contact: Users can reach him via the contact form on this site.
      If asked about buying: Users can purchase courses and assets in the 'Shop' section.
      
      Answer the user's question concisely based on this information.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm currently designing something else and couldn't process that. Try again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I encountered a glitch in the matrix. Please try again later.";
  }
};