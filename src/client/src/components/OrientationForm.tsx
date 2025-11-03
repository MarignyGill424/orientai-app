import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orientationFormSchema, OrientationFormData } from "@shared/schema";
import { useState } from "react";

export default function OrientationForm() {
  console.log("✅ Formulaire chargé");
  console.log("🧨 OrientationForm ACTIF");

  const form = useForm<OrientationFormData>({
    resolver: zodResolver(orientationFormSchema),
  });

  const [message, setMessage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const onSubmit = async (data: OrientationFormData) => {
    console.log("📤 Données soumises :", data);
    setMessage(null);
    setResult(null);

    try {
      const response = await fetch("/orientation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 503) {
        const error = await response.json();
        setMessage(error.error || "Le modèle est temporairement indisponible.");
        return;
      }

      if (!response.ok) {
        const error = await response.json();
        setMessage(error.error || "Une erreur est survenue.");
        return;
      }

      const result = await response.json();
      setResult(result);
      console.log("✅ Résultat reçu :", result);
    } catch (err) {
      console.error("❌ Erreur réseau :", err);
      setMessage("Erreur réseau. Merci de réessayer plus tard.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
      <h1 style={{ color: 'red' }}>OrientationForm monté</h1>

      {/* Affichage des messages */}
      {message && <p className="text-red-600 font-semibold">{message}</p>}
      {result && (
        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-lg font-bold">🎓 Ton profil d’orientation</h2>
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {/* ... Tous tes champs inchangés ici ... */}
      {/* Tu peux garder exactement la même structure que dans ton version précédente */}

      <button type="submit">Envoyer</button>
    </form>
  );
}
