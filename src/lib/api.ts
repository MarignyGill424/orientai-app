// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function callGemini(prompt: string) {
  const res = await fetch(`${API_BASE}/api/gemini`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  return data.output;
}
