export const UserInfor = ({ user }) => {
  return (
    <div className="mt-4 space-y-3">
      <input
        type="text"
        value={user?.address || 'Chưa có địa chỉ'}
        readOnly
        className="w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-700 cursor-not-allowed"
        placeholder="Địa chỉ giao hàng"
      />
      <iframe
        src={`https://maps.google.com/maps?q=${encodeURIComponent(
          user?.address || ''
        )}&output=embed`}
        width="100%"
        height="300"
        className="rounded-lg shadow-md"
        allowFullScreen
      />
      <input
        type="tel"
        value={user?.phone || user?.phoneNumber || 'Chưa có số điện thoại'}
        readOnly
        className="w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-700 cursor-not-allowed"
        placeholder="Số điện thoại"
      />
    </div>
  );
};
