import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateHackathonIdeas = async (track: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a retro-futuristic AI assistant for a hackathon called "RetroHack 2025".
      The user is interested in the track: "${track}".
      Provide 3 innovative, unique, and technically feasible hackathon project ideas for this track.
      
      Format the output as a simple list (no markdown bolding, just text).
      Keep the tone exciting, punchy, and slightly 8-bit/cyberpunk.
      Keep each idea under 25 words.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful AI creative assistant. Use a retro tech persona.",
      }
    });

    return response.text || "SYSTEM ERROR: CREATIVITY MODULE OFFLINE. TRY AGAIN.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "CONNECTION LOST. UNABLE TO RETRIEVE DATA FROM THE MAINFRAME.";
  }
};
