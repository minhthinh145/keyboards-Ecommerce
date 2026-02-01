export const UserInfor = ({ user }) => {
  return (
    <div className="mt-4 space-y-3">
      {/* Địa chỉ giao hàng - Dùng div thay vì input */}
      <div className="w-full p-3 border border-gray-300 rounded bg-gray-100 text-gray-600 min-h-[48px] flex items-center">
        <span className="text-sm text-black">
          {user?.address || 'Chưa có địa chỉ'}
        </span>
      </div>

      {/* Google Maps */}
      <div className="relative">
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            user?.address || ''
          )}&output=embed`}
          width="100%"
          height="250"
          className="rounded-lg shadow-md"
          allowFullScreen={false}
          loading="lazy"
          style={{ pointerEvents: 'none' }}
        />

        {/* Overlay để block interaction */}
        <div className="absolute inset-0 bg-transparent cursor-not-allowed"></div>
      </div>

      {/* Số điện thoại - Dùng div thay vì input */}
      <div className="w-full p-3 border border-gray-300 rounded bg-gray-100 text-gray-600 min-h-[48px]">
        <div className="text-xs text-gray-500 font-medium mb-1">
          Số điện thoại
        </div>
        <div className="text-sm text-black">
          {user?.phone || user?.phoneNumber || 'Chưa có số điện thoại'}
        </div>
      </div>
    </div>
  );
};
