import { LeftSide } from '../components/Payment/LeftSide';
import { RightSide } from '../components/Payment/RightSide';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '@/redux/slice/orderSlice';

export const PaymentPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const {
    currentOrder: order,
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrder(orderId));
    }
  }, [dispatch, orderId]);
  if (orderLoading || userLoading) {
    return <Loading loading={true} data={null} />;
  }

  if (orderError) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Lỗi</h2>
        <p className="text-gray-600">{orderError}</p>
        <button
          onClick={() => navigate('/cart')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Quay lại giỏ hàng
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Vui lòng đăng nhập
        </h2>
        <button
          onClick={() => navigate('/signin')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Đăng nhập
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Không tìm thấy đơn hàng
        </h2>
        <p className="text-gray-600 mb-4">
          {orderId
            ? `Order ID: ${orderId} không tồn tại`
            : 'Không có thông tin đơn hàng'}
        </p>
        <button
          onClick={() => navigate('/cart')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Quay lại giỏ hàng
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 min-h-screen">
      <div className="flex-1 items-center justify-center flex bg-gray-200">
        <LeftSide user={user} order={order} />
      </div>
      <div className="flex-1 items-center justify-center flex">
        <RightSide order={order} />
      </div>
    </div>
  );
};
