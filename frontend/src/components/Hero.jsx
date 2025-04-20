export const Hero = () => {
  return (
    <div className="relative h-[600px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1587829741301-dc798b83add3"
        alt="Hero Image"
        className="w-full h-full opacity-90 object-cover"
      />
      <div className="absolute inset-0  bg-black/50 flex items-center justify-center ">
        <div className="text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Phan Huỳnh Minh Thịnh
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Project E-commerce đầu tay :v
          </p>
          <p>
            <span className="text-lg font-bold mt-2 bg-gradient-to-r  bg-clip-text">
              ReactJS , TailwindCSS , ASP.NET Core , MSSQL
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
