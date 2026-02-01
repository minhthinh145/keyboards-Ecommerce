import axios from 'axios';

export const addToCart = async (accessToken, productId, quantity) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const BASE_URL = `${VITE_API_URL}/api/Cart/add`;

  const cartDTO = {
    productId: productId,
    quantity: quantity,
  };
  try {
    const response = await axios.post(BASE_URL, cartDTO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Có lỗi khi thêm sản phẩm vào giỏ hàng:',
      error.response?.data
    );
    throw error.response?.data || 'Failed to add product to cart';
  }
};
