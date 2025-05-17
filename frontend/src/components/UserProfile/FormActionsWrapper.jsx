import React, { useState } from "react";
import { FormActions } from "./FormActions";
import { PopupReminder } from "..//PopupReminder.jsx";

export const FormActionsWrapper = ({
  editingFields,
  isSubmitting,
  handleSubmit,
  handleCancel,
}) => {
  const [showReminder, setShowReminder] = useState(false);
  const [reminderType, setReminderType] = useState("success");
  const [reminderMessage, setReminderMessage] = useState("");

  const handleFormSubmit = async (e) => {
    const result = await handleSubmit(e);

    setReminderType(result.success ? "success" : "error");
    setReminderMessage(result.message);
    setShowReminder(true);
  };

  const hasEditing = Object.values(editingFields).some((v) => v);

  return (
    <>
      {hasEditing && (
        <FormActions
          isSubmitting={isSubmitting}
          onCancel={handleCancel}
          onSubmit={handleFormSubmit}
        />
      )}

      {showReminder && (
        <PopupReminder
          type={reminderType}
          message={reminderMessage}
          onSave={() => setShowReminder(false)}
        />
      )}
    </>
  );
};
