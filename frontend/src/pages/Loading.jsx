import { BounceLoader } from "react-spinners";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Loading = ({ loading, data }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!data || (Array.isArray(data) && data.length === 0))) {
      // Nếu không còn loading và không có dữ liệu, redirect ngay lập tức sang /404
      navigate("/404");
    }
    // Nếu đang loading hoặc có dữ liệu, không làm gì
  }, [loading, data, navigate]);

  if (!loading) return null; // Không hiển thị Loading nếu không còn loading

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
      <BounceLoader color="blue" size={100} />
      <p className="font-semibold text-xl pt-4 loading-dots">
        ⌨️Chờ 1 chút nha bạn
      </p>
    </div>
  );
};
