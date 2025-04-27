import { FiUser, FiShield, FiSettings, FiBell } from "react-icons/fi";

export const SideBar = ({ user, setActivePage, activePage }) => {
  return (
    <div>
      <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg flex flex-col text-white">
        {/* React logo xoay */}
        <div className="relative w-32 h-32 mb-4 mx-auto overflow-hidden rounded-full border-4 border-white">
          <img
            src="https://reactjs.org/logo-og.png"
            alt="React Logo"
            className="absolute inset-0 w-full h-full object-cover animate-spin-slow"
          />
        </div>

        <strong className="font-bold text-xl text-center">
          {user?.userName || "User"}
        </strong>
        {/* Selected Pages */}
        <div className="mt-8">
          <nav className="flex flex-col space-y-2">
            <a
              href="#profile"
              onClick={(e) => {
                e.preventDefault();
                setActivePage("profile");
              }}
              className={`flex items-center py-2 px-4 transition-colors duration-200 ${
                activePage === "profile"
                  ? "bg-indigo-700 text-white rounded-full"
                  : "hover:bg-indigo-500"
              }`}
            >
              <FiUser className="inline-block mr-3 text-lg " />
              Thông tin cá nhân
            </a>
            <a
              href="#security"
              onClick={(e) => {
                e.preventDefault();
                setActivePage("security");
              }}
              className={`flex items-center py-2 px-4 transition-colors duration-200 ${
                activePage === "security"
                  ? "bg-indigo-700 text-white rounded-full"
                  : "hover:bg-indigo-500"
              }`}
            >
              <FiShield className="inline-block mr-3 text-lg" />
              Bảo mật
            </a>
            <a
              href="#settings"
              onClick={(e) => {
                e.preventDefault();
                setActivePage("settings");
              }}
              className={`flex items-center py-2 px-4 transition-colors duration-200 ${
                activePage === "settings"
                  ? "bg-indigo-700 text-white rounded-full"
                  : "hover:bg-indigo-500"
              }`}
            >
              <FiSettings className="inline-block mr-3 text-lg" />
              Tùy chọn
            </a>
            <a
              href="#notifications"
              onClick={(e) => {
                e.preventDefault();
                setActivePage("notifications");
              }}
              className={`flex items-center py-2 px-4 transition-colors duration-200 ${
                activePage === "notifications"
                  ? "bg-indigo-700 text-white rounded-full"
                  : "hover:bg-indigo-500"
              }`}
            >
              <FiBell className="inline-block mr-3 text-lg" />
              Thông báo
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};
