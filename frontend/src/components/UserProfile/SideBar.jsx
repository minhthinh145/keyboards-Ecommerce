import { FiUser, FiShield, FiSettings, FiBell } from "react-icons/fi";

export const SideBar = ({ user, setActivePage, activePage }) => {
  return (
    <div className="sticky top-6 ">
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-white">
          <img
            src="https://reactjs.org/logo-og.png"
            alt="React Logo"
            className="w-full h-full object-cover animate-spin-slow"
          />
        </div>
        <h2 className="text-xl font-bold">{user?.userName || "User"}</h2>
        <p className="text-indigo-200">Thành viên từ 2023</p>
      </div>

      <nav className="space-y-2">
        <a
          href="#profile"
          onClick={(e) => {
            e.preventDefault();
            setActivePage("profile");
          }}
          className={`flex items-center py-2 px-4 rounded-lg transition-colors duration-200 ${
            activePage === "profile"
              ? "bg-indigo-700 text-white"
              : "hover:bg-indigo-500"
          }`}
        >
          <FiUser className="inline-block mr-3 text-lg" />
          Thông tin cá nhân
        </a>
        <a
          href="#security"
          onClick={(e) => {
            e.preventDefault();
            setActivePage("security");
          }}
          className={`flex items-center py-2 px-4 rounded-lg transition-colors duration-200 ${
            activePage === "security"
              ? "bg-indigo-700 text-white"
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
              ? "bg-indigo-700 text-white rounded-lg"
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
              ? "bg-indigo-700 text-white rounded-lg"
              : "hover:bg-indigo-500"
          }`}
        >
          <FiBell className="inline-block mr-3 text-lg" />
          Thông báo
        </a>
      </nav>
    </div>
  );
};
