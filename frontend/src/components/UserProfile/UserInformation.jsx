export const UserInformation = ({ user }) => {
  return (
    <div className="pt-4 flex flex-col gap-6">
      <h3 className="font-semibold text-lg text-gray-800">Thông tin cá nhân</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tên người dùng */}
        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">
            Tên người dùng
          </label>
          <input
            type="text"
            className="w-5/6 border border-gray-300 rounded-full px-4 py-2 pt-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 bg-gray-50"
            value={user?.userName || ""}
            readOnly
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Email</label>
          <input
            type="email"
            className="w-5/6 border border-gray-300 rounded-full px-4 py-2 pt-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 bg-gray-50"
            value={user?.email || ""}
            readOnly
          />
        </div>

        {/* Số điện thoại */}
        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">
            Số điện thoại
          </label>
          <input
            type="tel"
            className="w-5/6 border border-gray-300 rounded-full px-4 py-2 pt-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 bg-gray-50"
            value={user?.phone || ""}
            readOnly
          />
        </div>

        {/* Ngày sinh */}
        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Ngày sinh</label>
          <input
            type="text"
            className="w-5/6 border border-gray-300 rounded-full px-4 py-2 pt-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 bg-gray-50"
            value={
              user?.birthDate
                ? new Date(user.birthDate).toLocaleDateString("vi-VN")
                : ""
            }
            readOnly
          />
        </div>
      </div>
    </div>
  );
};
