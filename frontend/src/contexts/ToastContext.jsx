import { createContext, useContext, useState } from "react";
import { ToastBox } from "../components/ToastBox.jsx";
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info", duration = 3000) => {
    setToast({ message, type, duration });
    setTimeout(() => setToast(null), duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <ToastBox
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
        />
      )}
    </ToastContext.Provider>
  );
};

// Custom hook
export const useToast = () => useContext(ToastContext);
