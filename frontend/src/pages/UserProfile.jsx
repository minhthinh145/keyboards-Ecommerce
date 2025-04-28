import { useState } from "react";
import { useUserProfile } from "../hooks/userProfile.js";
import { SideBar } from "../components/UserProfile/SideBar.jsx";
import { Loading } from "./Loading.jsx";
import { UserInformation } from "../components/UserProfile/UserInformation.jsx";

export const UserProfile = () => {
  const { user, loading, error } = useUserProfile();
  const [activePage, setActivePage] = useState("profile");

  if (loading || !user) return <Loading loading={loading} data={user} />;

  const renderMainContent = () => {
    switch (activePage) {
      case "profile":
        return <UserInformation user={user} />;
      case "security":
        return <div>Security Content</div>;
      case "settings":
        return <div>Settings Content</div>;
      case "notifications":
        return <div>Notifications Content</div>;
      default:
        return <div>Profile Content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300  min-h-[80vh]">
        <div className="flex flex-col lg:flex-row">
          {/* SideBar */}
          <div className="w-full lg:w-1/4 bg-indigo-600 text-white p-6 rounded-xl">
            <SideBar
              user={user}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </div>
          {/* Main Content */}
          <div className="w-full lg:w-3/4 p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-4">
              Cài đặt tài khoản
            </h1>
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
