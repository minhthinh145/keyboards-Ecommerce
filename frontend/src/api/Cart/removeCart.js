import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;
export const removeFromCart = async (accessToken, productId) => {
  try {
    const response = await axios.delete(
      `${VITE_API_URL}/api/Cart/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      'Có lỗi khi xóa sản phẩm khỏi giỏ hàng:',
      error.response?.data
    );
    throw error.response?.data || error.message || 'Không thể xóa sản phẩm khỏi giỏ hàng';
  }
};
