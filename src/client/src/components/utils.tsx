function renderSection(title: string, data: Record<string, any>) {
  if (!data || typeof data !== "object") return null;

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <ul className="list-disc pl-6">
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key.replaceAll("_", " ")} :</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
