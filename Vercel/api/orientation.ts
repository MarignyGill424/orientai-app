export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // Appel à Gemini ou traitement du profil
    const result = await generateOrientation(data);

    res.status(200).json(result);
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
