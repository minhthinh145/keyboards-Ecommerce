// components/ToastBox.jsx
import { AlertTriangle, Info, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

const iconMap = {
  error: <AlertCircle className="text-red-600 w-5 h-5" />,
  warning: <AlertTriangle className="text-yellow-600 w-5 h-5" />,
  info: <Info className="text-blue-600 w-5 h-5" />,
  success: <CheckCircle className="text-green-600 w-5 h-5" />,
};

const colorMap = {
  error: "bg-red-50 border-red-300 text-red-700",
  warning: "bg-yellow-50 border-yellow-300 text-yellow-700",
  info: "bg-blue-50 border-blue-300 text-blue-700",
  success: "bg-green-50 border-green-300 text-green-700",
};

export const ToastBox = ({ message, type = "info", duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-3 border rounded-xl shadow-lg flex items-center space-x-3 animate-slide-in-down transition-all duration-300 ${colorMap[type]}`}
    >
      {iconMap[type]}
      <span className="font-medium">{message}</span>
    </div>
  );
};
