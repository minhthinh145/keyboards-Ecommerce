// src/api/products.js
export const getProductById = (id) => {
  return fetch(`http://localhost:5066/api/product/3fa85f64-5717-4562-b3fc-2c963f66afa6`) // test thử 1 object trong db
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .catch(error => {
        console.error("API Error:", error);
        throw error; // Đảm bảo lỗi được ném ra để xử lý tiếp trong component
      });
  };
  