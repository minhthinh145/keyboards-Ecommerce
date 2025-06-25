import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormState } from '../hooks/useFormState.js';
import { useFormValidation } from '../hooks/useFormValidation.js';
import { useFormSubmit } from '../hooks/useFormSubmit.js';
import { SideBar } from '../components/UserProfile/SideBar.jsx';
import { Loading } from './Loading.jsx';
import { UserInformation } from '../components/UserProfile/UserInformation.jsx';
import { FormActionsWrapper } from '../components/UserProfile/FormActionsWrapper.jsx';
import { ChangePasswordSite } from '../components/UserProfile/ChangePasswordSite.jsx';

export const UserProfile = () => {
  // Lấy user và loading từ Redux store
  const { user, loading, error } = useSelector((state) => state.auth);
  const [activePage, setActivePage] = useState('profile');

  // Gọi các hook nhỏ
  const {
    formData,
    setFormData,
    originalData,
    setOriginalData,
    editingFields,
    setEditingFields,
    errors,
    setErrors,
    handleInputChange,
    toggleEditField,
  } = useFormState(user);
  const { validateField, validateAll, updateErrors } = useFormValidation(
    formData,
    editingFields,
    setErrors
  );
  const { handleSubmit, handleCancel, isSubmitting } = useFormSubmit(
    formData,
    editingFields,
    validateAll,
    setOriginalData,
    setEditingFields,
    setErrors,
    originalData,
    setFormData
  );
  if (loading || !user) return <Loading loading={loading} data={user} />;

  const renderMainContent = () => {
    switch (activePage) {
      case 'profile':
        return (
          <form
            onSubmit={async (e) => {
              const result = await handleSubmit(e);
              alert(result.message);
            }}
          >
            <UserInformation
              user={user}
              formData={formData}
              editingFields={editingFields}
              errors={errors}
              toggleEditField={(field) => {
                toggleEditField(field);
                if (!editingFields[field]) updateErrors(field);
              }}
              handleInputChange={(e) => {
                handleInputChange(e);
                updateErrors(e.target.id);
              }}
            />
          </form>
        );
      case 'security':
        return <ChangePasswordSite>Security Content</ChangePasswordSite>;
      case 'settings':
        return <div>Settings Content</div>;
      case 'notifications':
        return <div>Notifications Content</div>;
      default:
        return <div>Profile Content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 bg-indigo-600 text-white p-6 rounded-xl">
            <SideBar
              user={user}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </div>
          <div className="w-full lg:w-3/4 p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-4">
              Cài đặt tài khoản
            </h1>
            <div>
              {renderMainContent()}
              <FormActionsWrapper
                editingFields={editingFields}
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
