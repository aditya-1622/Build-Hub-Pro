import { useEffect, useState } from "react";

const COLORS = ["#6c5ce7", "#a29bfe", "#00b8d4", "#4caf50", "#ff9800", "#e53935"];

function Confetti({ trigger, onDone }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!trigger) return;

    const newPieces = Array.from({ length: 40 }).map((_, i) => ({
      id: `${trigger}-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 1.8 + Math.random() * 1.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotate: Math.random() * 360,
      size: 6 + Math.random() * 6,
    }));
    setPieces(newPieces);
 const timer = setTimeout(() => {
      setPieces([]);
      onDone?.();
    }, 2800);

    return () => clearTimeout(timer);
  }, [trigger, onDone]);

  if (pieces.length === 0) return null;

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            width: p.size,
            height: p.size * 0.4,  animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;
