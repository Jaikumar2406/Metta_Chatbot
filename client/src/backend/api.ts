// src/api.ts
export interface GenerateResponse {
    answer: string;
  }
  
  export async function generateText(input: string): Promise<GenerateResponse> {
    const res = await fetch("https://metta-chatbot-2.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch response from server");
    }
  
    return res.json();
  }
  