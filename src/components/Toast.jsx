import { useEffect } from "react";

function Toast({ message, type = "success", onClear }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => onClear(), 2500);
    return () => clearTimeout(timer);
  }, [message, onClear]);

  if (!message) return null;

  const icons = {
    success: "✅",
    warning: "🗑️",
    error: "❌",
  };

  return (
    <div className={`toast toast-${type}`} key={message}>
      <span className="toast-icon">{icons[type] || icons.success}</span>
      <span>{message}</span>
    </div>
  );
}

export default Toast;