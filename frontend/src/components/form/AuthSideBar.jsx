import ReactLogo from "../../../public/LogoReact.svg";

export const Sidebar = ({ title, description }) => {
  return (
    <div className="p-8 bg-indigo-800 text-white flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-xl">{description}</p>
      {/* React logo xoay */}
      <div className="flex justify-center mt-4">
        <img
          src={ReactLogo}
          className="h-48 w-48 animate-spin-slow mb-6 justify-center"
          alt="React logo"
        />
      </div>
    </div>
  );
};
