// src/client/api/orientation.ts
export async function fetchOrientationSuggestions(formData) {
  try {
    const response = await fetch("/api/orientation", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la requête à l'API")
    }

    return await response.json()
  } catch (error) {
    console.error("❌ Erreur côté client :", error)
    return null
  }
}
