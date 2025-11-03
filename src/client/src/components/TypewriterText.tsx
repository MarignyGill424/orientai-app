import React, { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // vitesse par caractère
  pause?: number; // pause entre les phrases
}

export default function TypewriterText({ text, speed = 30, pause = 500 }: TypewriterTextProps) {
  const [phrases, setPhrases] = useState<string[]>([]);
  const [visiblePhrases, setVisiblePhrases] = useState<string[]>([]);

  useEffect(() => {
    const split = text.split(/(?<=[.!?])\s+/); // découpe par phrase
    setPhrases(split);
  }, [text]);

  useEffect(() => {
    let index = 0;
    const revealNext = () => {
      if (index < phrases.length) {
        setVisiblePhrases((prev) => [...prev, phrases[index]]);
        index++;
        setTimeout(revealNext, pause);
      }
    };
    revealNext();
  }, [phrases, pause]);

  return (
    <div style={{ lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
      {visiblePhrases.map((phrase, i) => (
        <p key={i}>{phrase}</p>
      ))}
    </div>
  );
}
