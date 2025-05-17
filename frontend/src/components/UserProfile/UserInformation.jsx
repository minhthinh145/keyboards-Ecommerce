import React from "react";
import { EditingField } from "./EditingField.jsx";
import { PopupReminder } from "../PopupReminder.jsx";
import { useState } from "react";
export const UserInformation = ({
  user,
  formData,
  editingFields,
  errors,
  toggleEditField,
  handleInputChange,
}) => {
  const formatBirthDate = (value) =>
    value ? new Date(value).toLocaleDateString("vi-VN") : "";
  const [hasShownReminder, setHasShownReminder] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleTriggerReminder = () => {
    if (!hasShownReminder) {
      setShowPopup(true);
      setHasShownReminder(true);
    }
  };

  return (
    <div className="pt-4 flex flex-col gap-6">
      <h3 className="font-semibold text-lg text-gray-800">Thông tin cá nhân</h3>
      {showPopup && (
        <PopupReminder
          message="Hãy lưu thông tin trước khi thoát"
          type="warning"
          onSave={() => setShowPopup(false)}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tên người dùng */}
        <EditingField
          label="Tên người dùng"
          field="userName"
          value={formData.userName}
          isEditing={editingFields.userName}
          error={errors.userName}
          type="text"
          readOnlyFormat={formData.userName}
          toggleEditField={toggleEditField}
          handleInputChange={handleInputChange}
          triggerReminder={handleTriggerReminder}
        />

        {/* Email */}
        <EditingField
          label="Email"
          field="email"
          value={formData.email}
          isEditing={editingFields.email}
          error={errors.email}
          type="email"
          readOnlyFormat={formData.email}
          toggleEditField={toggleEditField}
          handleInputChange={handleInputChange}
          triggerReminder={handleTriggerReminder}
        />
        {/* Số điện thoại */}
        <EditingField
          label="Số điện thoại"
          field="phone"
          value={formData.phone}
          isEditing={editingFields.phone}
          error={errors.phone}
          type="tel"
          readOnlyFormat={formData.phone}
          toggleEditField={toggleEditField}
          handleInputChange={handleInputChange}
          triggerReminder={handleTriggerReminder}
        />

        {/* Ngày sinh */}
        <EditingField
          label="Ngày sinh"
          field="birthDate"
          value={formData.birthDate}
          isEditing={editingFields.birthDate}
          error={errors.birthDate}
          type="date"
          readOnlyFormat={formatBirthDate}
          toggleEditField={toggleEditField}
          handleInputChange={handleInputChange}
          triggerReminder={handleTriggerReminder}
        />
      </div>
      {/* Location with googlemaps */}
      <div className="pt-4 grid grid-cols-1 gap-6">
        <EditingField
          label="Địa chỉ"
          field="address"
          value={formData.address}
          isEditing={editingFields.address}
          error={errors.address}
          type="text"
          readOnlyFormat={formData.address}
          toggleEditField={toggleEditField}
          handleInputChange={handleInputChange}
          triggerReminder={handleTriggerReminder}
        />

        {/* Googlemaps iframe */}
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            user?.address || ""
          )}&output=embed`}
          width="100%"
          height="300"
          className="rounded-lg shadow-md"
          allowFullScreen
        />
      </div>
    </div>
  );
};
