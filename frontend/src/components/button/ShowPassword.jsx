import { HiEye } from "react-icons/hi2";
export const ShowPassword = ({ id }) => {
  return (
    <span
      className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
      onClick={() => {
        const passwordInput = document.getElementById(id);
        if (passwordInput.type === "password") {
          passwordInput.type = "text";
        } else {
          passwordInput.type = "password";
        }
      }}
    >
      <HiEye className="text-xl" id="togglePasswordIcon" />
    </span>
  );
};
