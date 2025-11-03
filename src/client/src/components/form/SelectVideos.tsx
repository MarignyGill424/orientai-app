import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SelectVideosProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const SelectVideos = ({ value, onChange, error }: SelectVideosProps) => {
  return (
    <div className="space-y-2">
      <Label>Genre de vidéos préférées</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="-- Choisir --" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Tutoriels">📚 Tutoriels</SelectItem>
          <SelectItem value="Reportages">📺 Reportages</SelectItem>
          <SelectItem value="Défis">🏆 Défis</SelectItem>
          <SelectItem value="Jeux vidéo">🎮 Jeux vidéo</SelectItem>
          <SelectItem value="Musique">🎵 Musique</SelectItem>
          <SelectItem value="Autre">✨ Autre</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
