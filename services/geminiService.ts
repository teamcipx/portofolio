import { GoogleGenAI } from "@google/genai";
import { PROJECTS, PRODUCTS } from '../constants';

// Initialize Gemini
// Note: In a real production app, ensure this is behind a backend proxy if possible,
// but for this client-side demo we use the env var directly as per instructions.
const apiKey = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!ai) {
    return "I'm sorry, my brain (API Key) is missing! Please configure the API Key to chat with me.";
  }

  try {
    // Construct a system-like context in the prompt since we aren't using the systemInstruction config 
    // heavily for the simple call, or we can use the config object.
    // We will inject knowledge about Siam's portfolio.
    
    const context = `
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
      contents: [
        {
            role: 'user',
            parts: [{ text: context + "\n\nUser Question: " + message }]
        }
      ]
    });

    return response.text || "I'm currently designing something else and couldn't process that. Try again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I encountered a glitch in the matrix. Please try again later.";
  }
};