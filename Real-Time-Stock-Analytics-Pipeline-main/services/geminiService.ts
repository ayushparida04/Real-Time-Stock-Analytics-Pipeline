import { GoogleGenAI } from "@google/genai";
import { StockDataPoint } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMarketAnalysis = async (data: StockDataPoint[], symbol: string): Promise<string> => {
  try {
    const recentData = data.slice(-10); // Analyze last 10 points
    const prompt = `
      Act as a senior financial analyst. Analyze the following recent stock market data points (simulated) for ${symbol}.
      
      Data:
      ${JSON.stringify(recentData)}
      
      Provide a concise 2-3 sentence summary of the current trend, specifically mentioning volatility and the RSI (Relative Strength Index) indicators. 
      Do not use markdown formatting. Keep it professional and direct.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI Analysis service is temporarily unavailable.";
  }
};

export const getArchitectureExplanation = async (component: string): Promise<string> => {
  try {
    const prompt = `
      Explain the role of "${component}" in a modern Azure Data Engineering pipeline using Medallion Architecture (Bronze/Silver/Gold) and Databricks.
      Keep the explanation under 50 words, suitable for a technical tooltip.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Explanation unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Info service unavailable.";
  }
};