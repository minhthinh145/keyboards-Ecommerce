import { useEffect, useState } from "react";
import { getProducts } from "../api/products.js";

export const useProducts = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data || []); // nếu không có dữ liệu thì set thành mảng rỗng
      } catch (err) {
        setError(err); // nếu có lỗi thì set lại state error
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return { products, loading, error };
};

export default useProducts;
