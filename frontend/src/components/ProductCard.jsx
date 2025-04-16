export const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4 border border-gray-200 transform hover:-translate-y-1">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="text-green-600 font-semibold text-base">
        {product.price.toLocaleString("vi-VN")}₫
      </p>
    </div>
  );
  