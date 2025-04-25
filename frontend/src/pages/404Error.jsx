import { AlertTriangle, Info, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

export const ErrorPages = () => {
  const iconMap = {
    error: <AlertCircle className="text-red-600 w-5 h-5" />,
    warning: <AlertTriangle className="text-yellow-600 w-5 h-5" />,
    info: <Info className="text-blue-600 w-5 h-5" />,
    success: <CheckCircle className="text-green-600 w-5 h-5" />,
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <AlertCircle className="text-red-600 w-16 h-16 mx-auto" />
        <p className="font-semibold text-xl mt-2">Đã có lỗi xảy ra</p>
      </div>
    </div>
  );
};
