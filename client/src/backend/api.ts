// src/api.ts
export interface GenerateResponse {
    answer: string;
  }
  
  export async function generateText(input: string): Promise<GenerateResponse> {
    const res = await fetch("http://localhost:8080/generate", {
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
  
