// MentorBubble.tsx
export const MentorBubble = ({ message }: { message: string }) => (
  <div className="mt-2 text-sm text-pink-600 dark:text-pink-400 italic">
    💬 {message}
  </div>
);
