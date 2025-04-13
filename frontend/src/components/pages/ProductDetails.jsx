
//import sone icons from react-icons
import React from 'react';
import { FiStar , FiCheckCircle , FiShoppingCart , FiHeart } from 'react-icons/fi';
import { useState } from 'react';

export const ProductsDetails = () => {
    const [selectedColor, setSelectedColor] = useState(null);
    const colorOptions = {
        Black: 'bg-black',
        White: 'bg-white',
        Pink: 'bg-pink-500',
        Blue: 'bg-blue-500',
      };
    
      const [quantity , setQuantity] = useState(1);

      const incrementQuantity = () => setQuantity(q => q + 1) ;
      const decrementQuantity = () => setQuantity(q => Math.max(1,q-1));



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 ml-8 mr-8">

            <div className="flex items-center justify-center  bg-gray-200 rounded-lg ">
                <div className="flex justify-center items-center">
                <img 
                    src="https://images.unsplash.com/photo-1587829741301-dc798b83add3"
                    alt="Product"
                    className="object-cover w-full h-full rounded-lg shadow-md px-4 py-4"
                />
                </div>
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col gap-4">
                <div>
                    <h3 className="font-bold text-3xl"> Bàn phím siêu ngu</h3>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <FiStar className="text-yellow-500" />
                        <FiStar className="text-yellow-500" />  
                        <FiStar className="text-yellow-500" />
                        <FiStar className="text-yellow-500" />  
                        <FiStar className="text-gray-500" />
                        <span className="text-gray-600 dark:text-white">4.2 (128 Reviews)</span>                    
                    </div>
                </div>

                <div className='mt-2'>
                    <div className='flex items-center gap-3'>
                        <span className="text-3xl font-bold text-indigo-800 dark:text-white">199.99$</span>
                        <span className="line-through text-lg text-gray-500">299.99$</span>
                        <span className="bg-indigo-100 text-indigo-800 rounded-lg  py-1 px-2 font-medium">Save 30%</span>                
                    </div>
                    <p className="text-green-600 mt-4">
                        <span className='flex items-center gap-2'>
                            <FiCheckCircle className="text-green-500" /> 
                            <span>In Stock</span>
                        </span>
                    </p>
                </div>
                
                <div className="border-t border-b border-gray-200 py-6 mb-6">
                    <p className='text-gray-700 dark:text-white mb-4'>
                        This high-performance keyboard is designed for both gaming enthusiasts and professionals. It features a sleek design, responsive keys, and customizable backlighting to enhance your typing or gaming experience. Built with durable materials, it ensures long-lasting performance and comfort during extended use.
                    </p>
                    <div className='flex flex-wrap gap-2 '>
                        <span className='rounded-full bg-gray-200  py-1 px-2 duration-300 text-gray-600 hover:bg-gray-300 hover:text-gray-800 cursor-pointer'>Blue switch</span>
                        <span className='rounded-full bg-gray-200  py-1 px-2 duration-300 text-gray-600 hover:bg-gray-300 hover:text-gray-800 cursor-pointer'>RGB Backligh</span>
                        <span className='rounded-full bg-gray-200  py-1 px-2 duration-300 text-gray-600 hover:bg-gray-300 hover:text-gray-800 cursor-pointer'>Hot-swappable</span>
                        <span className='rounded-full bg-gray-200  py-1 px-2 duration-300 text-gray-600 hover:bg-gray-300 hover:text-gray-800 cursor-pointer'>PBT Keycaps</span>
                    </div>
                </div>
                {/* Select Switch */}
                <div className='mb-6'>
                    <h3 className='font-semibold mb-3'>Select Keyboard Color</h3>
                    <div className='flex gap-3'>
                            {['Black', 'White', 'Pink', 'Blue'].map((color, idx) => (
                            <div
                            key = {idx}
                            onClick={() => setSelectedColor(color)}
                            className={`
                                w-12 h-12 rounded-full cursor-pointer 
                                ${colorOptions[color]} 
                                ${selectedColor === color ? 
                                  'border-4 border-indigo-500 transform scale-95' : 
                                  'border-2 border-gray-300'}
                                transition-all duration-300 
                                hover:scale-105 hover:shadow-lg
                                ${selectedColor === color ? 'scale-95' : 'scale-100'}
                              `}
                              style={{
                                boxShadow: selectedColor === color ? '0 0 10px rgba(0, 0, 0, 0.2)' : '',
                              }}
                            >
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add to Cart*/}
                <div className='mb-8'>
                    
                    {/* Ajdustment quantity */}
                    <div className='flex items-center space-x-4'>

                        <div className=' flex items-center border border-gray-300 rounded-full px-3 py-2 gap-8'>
                            <button 
                            onClick={decrementQuantity}
                            className=' text-purple-600 text-xl font-bold hover:text-purple-800 transition'>
                                -
                            </button>
                            <span className='text-black font-medium dark:text-white'> {quantity} </span>
                            <button 
                            onClick={incrementQuantity}
                            className='text-purple-600 text-xl font-bold hover:text-purple-800 transition'>
                                +
                            </button>
                        </div>
                        
                        {/* Add to Wishlist */}
                        <button className='flex items-center gap-2 bg-indigo-700 text-white px-2 py-2 rounded-full duration-200
                         hover:bg-indigo-800 hover:shadow-lg hover:scale-[1.02] transform'>
                            <FiShoppingCart className='text-2xl transition mr-2'/>
                            Add to Cart
                        </button>
                        
                        {/* Note this is favorite and share */}
                        <button className='flex items-center gap-2 bg-indigo-700 text-white px-2 py-2 rounded-full duration-200
                            hover:bg-indigo-800 hover:shadow-lg hover:scale-[1.02] transform'>
                                <FiHeart className='text-2xl transition mr-2'/>
                                Add to Wishlist
                        </button>


                    </div>

                </div>  
            </div>
        </div>
    );
}