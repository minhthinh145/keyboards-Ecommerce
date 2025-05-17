import { Edit2, Check } from "lucide-react";
import React, { useState } from "react";

export const EditingField = ({
  label,
  field,
  value,
  isEditing,
  error,
  type,
  readOnlyFormat,
  toggleEditField,
  handleInputChange,
  triggerReminder,
}) => {
  const safeValue = value ?? "";

  // Format value for read-only mode
  const displayValue = isEditing
    ? safeValue
    : typeof readOnlyFormat === "function" && safeValue
    ? readOnlyFormat(safeValue)
    : safeValue;

  return (
    <div className="space-y-2">
      <label className="block text-gray-600 font-medium">{label}</label>
      <div className="flex items-center">
        <input
          type={isEditing && type === "date" ? "date" : "text"}
          id={field}
          name={field}
          className={`w-5/6 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-full px-4 py-2 pt-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
            isEditing ? "bg-white" : "bg-gray-50"
          }`}
          value={displayValue}
          onChange={handleInputChange}
          readOnly={!isEditing}
        />
        <button
          type="button"
          onClick={() => {
            if (triggerReminder) triggerReminder();
            toggleEditField(field);
          }}
          className="ml-2 text-indigo-600 hover:text-indigo-800"
        >
          {isEditing ? (
            <Check className="w-6 h-6" />
          ) : (
            <Edit2 className="w-6 h-6" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
