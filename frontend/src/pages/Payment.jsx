import { LeftSide } from '../components/Payment/LeftSide';
import { RightSide } from '../components/Payment/RightSide';
import { useGetOrder } from '../hooks/Orders/useGetOrder';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../hooks/userProfile';
import { Loading } from './Loading';
export const PaymentPage = () => {
  const { handleGetOrder, loading, error } = useGetOrder();
  const { user, loading: userloading, error: erroruser } = useUserProfile();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const latestOrderId = localStorage.getItem('latestOrderId');
      if (latestOrderId) {
        try {
          const result = await handleGetOrder(latestOrderId);
          setOrder(result);
        } catch (err) {
          console.error('Error fetching order:', err);
        }
      }
    };

    fetchOrder();
  }, []);
  console.log('user', user);
  if (loading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p>Lỗi: {error.message}</p>;
  if (userloading || !user)
    return <Loading loading={userloading} data={user} />;

  return (
    <div className="flex flex-col md:flex-row gap-4 min-h-screen ">
      <div className="flex-1 items-center justify-center flex bg-gray-200">
        <LeftSide user={user} />
      </div>
      <div className="flex-1 items-center justify-center flex">
        <RightSide />
      </div>
    </div>
  );
};
