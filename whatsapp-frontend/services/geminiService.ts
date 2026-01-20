import { GoogleGenAI } from "@google/genai";

// Initialize the API client
// Note: In a real production app, ensure your API key is secure.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBotResponse = async (history: { role: 'user' | 'model', text: string }[], userMessage: string): Promise<string> => {
  try {
    // Basic check for API key
    if (!process.env.API_KEY) {
        return "I'm sorry, my brain (API Key) is missing. Please check your configuration.";
    }

    const model = 'gemini-3-flash-preview';
    
    // Construct prompt with context
    // We are simulating a chat history by concatenating previous turns or using chat mode
    // For simplicity in this functional component demo, we'll use a direct generateContent call
    // but formatted as a chat interface.
    
    // Convert simplified history to string context for the "system" feel or just pass as chat
    // Using chat interface for better context handling
    const chat = ai.chats.create({
        model: model,
        config: {
            systemInstruction: "You are a helpful AI assistant integrated into a WhatsApp-like web application. Keep your answers concise, friendly, and helpful. Do not use markdown for bolding excessively, keep it plain text style mostly unless code is requested.",
        }
    });

    // We rely on the single turn here for simplicity unless we persist the chat object in React state,
    // which is complex for a simple demo. 
    // We will just send the latest message.
    
    const response = await chat.sendMessage({
        message: userMessage
    });

    return response.text || "I didn't catch that.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the network right now.";
  }
};