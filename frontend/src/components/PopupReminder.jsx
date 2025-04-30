import React from "react";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export const PopupReminder = ({ message, type = "success", onSave }) => {
  // Chọn icon theo loại
  const renderIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500 w-12 h-12" />;
      case "error":
        return <XCircle className="text-red-500 w-12 h-12" />;
      case "warning":
        return <AlertTriangle className="text-yellow-500 w-12 h-12" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
        {/* Icon theo loại thông báo */}
        <div className="flex justify-center mb-4">{renderIcon()}</div>

        {/* Thông điệp */}
        <h2 className="text-lg font-semibold mb-4">{message}</h2>

        {/* Nút xác nhận */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
