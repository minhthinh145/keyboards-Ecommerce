
//import sone icons from react-icons
import React from 'react';
import { FiStar } from 'react-icons/fi';




export const ProductsDetails = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16">

            <div className="flex items-center justify-center  bg-gray-200 rounded-lg ml-4">
                <div className="flex justify-center items-center">
                <img 
                    src="https://images.unsplash.com/photo-1587829741301-dc798b83add3"
                    alt="Product"
                    className="object-cover w-full h-full rounded-lg shadow-md px-4 py-4"
                />
                </div>
            </div>

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
            </div>
        </div>
    );
}