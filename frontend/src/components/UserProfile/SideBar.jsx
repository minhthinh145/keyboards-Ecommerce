export const SideBar = () => {
  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold mb-4">Thông tin cá nhân</h2>
        <p className="text-xl">Chào mừng bạn đến với trang cá nhân của mình!</p>
        {/* React logo xoay */}
        <div className="flex justify-center mt-4">
          <img
            src="/LogoReact.svg"
            className="h-48 w-48 animate-spin-slow mb-6 justify-center"
            alt="React logo"
          />
        </div>
      </div>
    </div>
  );
};
