import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AppMagiqueInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const AppMagiqueInput = ({ value, onChange, error }: AppMagiqueInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="appMagique">Application magique rêvée</Label>
      <Input
        id="appMagique"
        placeholder="Décris ton app idéale..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
