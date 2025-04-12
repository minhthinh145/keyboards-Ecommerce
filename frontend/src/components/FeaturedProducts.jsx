import { Link } from "react-router-dom";


export const FeaturedProducts = ({ products }) => {
    return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map( (product) => (

                <div 
                    key = {product.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
                >
                    <Link to="/product">
                    <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                    />
                    </Link>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
                            {product.name}
                        </h3>
                        <p className="text-blue-600 dark:text-blue font-bold mt-2">
                            ${product.price.toFixed(2)}
                        </p>
                        <div className="mt-4 flex justify-between items-center">
                            <button
                                onClick={() => setCartCount(cartCount + 1)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
                            > 
                                Add to Cart
                            </button>
                            <div className="text-yellow-400">{'⭐'.repeat(Math.floor(product.rating))}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}