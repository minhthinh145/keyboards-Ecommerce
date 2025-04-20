import { FaGoogle, FaFacebook, FaEnvelope } from "react-icons/fa";

export const FingerprintLogin = () => {
  return (
    <div>
      <div className="relative flex items-center justify-center mt-4 mb-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 px-4 text-gray-500">
          Hoặc đăng nhập với
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-2">
        <button
          type="button"
          className="flex justify-center py-4 px-4 border border-gray-300 rounded-full hover:bg-gray-50 hover-scale"
        >
          <i className="text-lg">
            <FaGoogle />
          </i>
        </button>

        <button
          type="button"
          className="flex justify-center py-4 px-4 border border-gray-300 rounded-full hover:bg-gray-50 hover-scale"
        >
          <i className="text-lg">
            <FaFacebook />
          </i>
        </button>

        <button
          type="button"
          className="flex justify-center py-4 px-4 border border-gray-300 rounded-full hover:bg-gray-50 hover-scale"
        >
          <i className="text-lg">
            <FaEnvelope />
          </i>
        </button>
      </div>
    </div>
  );
};
