// src/components/form/SelectObjet.tsx
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SelectObjetProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const SelectObjet = ({ value, onChange, error }: SelectObjetProps) => {
  return (
    <div className="space-y-2">
      <Label>Objet emporté sur une île déserte</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="-- Choisir --" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Carnet">📝 Carnet</SelectItem>
          <SelectItem value="Livre">📖 Livre</SelectItem>
          <SelectItem value="Outil">🔨 Outil</SelectItem>
          <SelectItem value="Autre">🤔 Autre</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
