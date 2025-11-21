
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
    return "Hello! I'm Siam's virtual assistant. I can help you with details about his Portfolio, Experience, Blogs, or Services. What would you like to know?";
  }
  
  // Identity
  if (lowerMsg.includes('who are you') || lowerMsg.includes('your name')) {
    return "I am an AI assistant created to help you navigate Siam Hasan's portfolio. I have full access to his resume and project history.";
  }

  // Experience / Resume
  if (lowerMsg.includes('experience') || lowerMsg.includes('resume') || lowerMsg.includes('background') || lowerMsg.includes('job')) {
    return `Siam has over 5 years of experience. currently, he is a Senior Product Designer at TechFlow Solutions. Before that, he was a Top Rated Freelancer on Upwork (100+ projects).`;
  }

  // Education
  if (lowerMsg.includes('education') || lowerMsg.includes('study') || lowerMsg.includes('degree') || lowerMsg.includes('university')) {
    return `Siam holds a B.Sc in Computer Science from Daffodil International University (3.8 CGPA) and is also Google UX Design certified.`;
  }

  // Blogs / Writing
  if (lowerMsg.includes('blog') || lowerMsg.includes('write') || lowerMsg.includes('article') || lowerMsg.includes('post')) {
    return `Siam writes about Design and Tech. His latest article is "The Future of UI Design: AI Integration". Check the 'Insights' section on the home page!`;
  }

  // Services
  if (lowerMsg.includes('service') || lowerMsg.includes('offer') || lowerMsg.includes('do')) {
    return "Siam specializes in:\n1. Brand Identity Design\n2. UI/UX Design (Web & Mobile)\n3. Frontend Development (React/Tailwind)\n\nCheck the 'Home' page for more details!";
  }

  // Pricing
  if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('rate') || lowerMsg.includes('quote')) {
    return "Pricing depends on the project scope. \n- Logo Packages start at $500\n- Web Design starts at $1,200\n\nFor a specific quote, please use the Contact form!";
  }

  // Contact
  if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone') || lowerMsg.includes('hire')) {
    return "You can reach Siam directly at: hello@siamhasan.com. He is currently accepting new projects for Q4 2024.";
  }

  // Shop
  if (lowerMsg.includes('shop') || lowerMsg.includes('course') || lowerMsg.includes('asset') || lowerMsg.includes('buy')) {
    return "Siam sells high-quality design assets and courses in the 'Shop' section. Popular items include the 'Adobe Photoshop Mastery' course.";
  }

  // Default
  return "I can tell you about Siam's Experience, Education, Projects, or Blog posts. What are you interested in?";
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  // 1. Check if AI is available
  if (!ai) {
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800)); 
    return getFallbackResponse(message);
  }

  // 2. Active AI Mode
  try {
    const systemInstruction = `
      You are an advanced AI assistant for Siam Hasan, a professional Graphic Designer & Frontend Developer.
      Your tone is professional, creative, intelligent, and enthusiastic.
      
      About Siam:
      - Based in Dhaka, Bangladesh.
      - Expert in Branding, UI/UX, and Web Design.
      - Open to remote work.
      
      Context Data:
      Projects: ${JSON.stringify(PROJECTS.map(p => ({ title: p.title, category: p.category, description: p.description })))}
      Products: ${JSON.stringify(PRODUCTS.map(p => ({ title: p.title, price: p.price, type: p.type })))}
      Experience: ${JSON.stringify(EXPERIENCE)}
      Education: ${JSON.stringify(EDUCATION)}
      Latest Blogs: ${JSON.stringify(BLOGS.map(b => b.title))}
      
      Instructions:
      - Answer concisely (max 3-4 sentences).
      - If asked about background, combine Experience and Education data.
      - Promote his blog posts if the topic is relevant (e.g. if they ask about AI, mention his AI blog).
      - Encourage users to visit the 'Contact' page for hires.
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
    // Fallback if the actual API call fails (e.g. quota exceeded)
    return "I'm having trouble connecting to the creative brain right now. Please email hello@siamhasan.com directly.";
  }
};
