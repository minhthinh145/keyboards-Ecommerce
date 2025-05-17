import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${VITE_API_URL}/api/orders/getOrder`;

export const getOrder = async (accessToken, orderId) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        id: orderId,
      },
    });

    return response.data.result?.Data || null;
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng:', error);
    throw error;
  }
};
