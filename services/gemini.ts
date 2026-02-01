
import { GoogleGenAI, Type } from "@google/genai";
import { Platform, BrandMemory } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateTravelContent = async (platform: Platform, memory: BrandMemory) => {
  const ai = getAI();
  const prompt = `
    Generate a ${platform} post for a travel brand.
    Brand Tone: ${memory.tone}
    Target Audience: ${memory.audience}
    Destination: ${memory.destination}
    Key Call-to-Action: ${memory.cta}
    
    Make it engaging, travel-inspired, and professional. 
    Include relevant emojis and a few key hashtags if appropriate.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.8,
      topP: 0.9,
    },
  });

  return response.text || "Failed to generate content. Please try again.";
};

export const generateTravelImage = async (prompt: string, aspectRatio: "1:1" | "16:9" | "9:16" = "1:1") => {
  const ai = getAI();
  const fullPrompt = `High-quality travel photography of: ${prompt}. Cinematic lighting, vibrant colors, 4k resolution.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: fullPrompt }],
    },
    config: {
      imageConfig: {
        aspectRatio,
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image was generated.");
};

export const analyzeTravelImage = async (base64Image: string) => {
  const ai = getAI();
  const prompt = "Analyze this travel photo. What destination or vibe does it suggest? Generate a catchy Instagram caption and 5 relevant hashtags based on what you see in the image.";

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] } },
        { text: prompt }
      ]
    }
  });

  return response.text || "Could not analyze image.";
};
