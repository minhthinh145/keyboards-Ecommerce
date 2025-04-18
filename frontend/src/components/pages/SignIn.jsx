import ReactLogo from '../../../public/LogoReact.svg'; 
import React from 'react';
export const Signin = () => {

    return (
        <div className="min-h-screen  flex items-center justify-center bg-indigo-50 px-16 py-16">
             <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full bg-white rounded-3xl shadow-lg overflow-hidden">
                    {/* Left Side: Image and Text */}
                <div className="p-8 bg-indigo-800 text-white flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">Chào mừng đến với TShop</h2>
                    <p className="text-sm">Đăng nhập để tiếp tục mua sắm</p>
                    {/* React logo xoay */}
                    <div className='flex justify-center mt-4'>
                    <img
                        src={ReactLogo}
                        className="h-48 w-48 animate-spin-slow mb-6 justify-center"
                        alt="React logo"
                    />
                    </div>
                </div>
                {/* Right Side: Form */}
                <div className="p-8 items-center flex flex-col">
                    <h2 className="text-2xl font-bold mb-6">Đăng nhập</h2>
                    <p></p>
                </div>
            </div>
        </div>
    );
}