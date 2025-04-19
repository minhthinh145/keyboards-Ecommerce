import ReactLogo from '../../../public/LogoReact.svg'; 
import React from 'react';
import { HiLockClosed } from "react-icons/hi";
import { HiMail } from "react-icons/hi";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaGoogle, FaFacebook, FaEnvelope } from "react-icons/fa";

export const Signin = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-16 py-16">
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
                <div className="p-12 flex flex-col">
                    <div className='flex flex-col items-center mb-8'>
                        <HiLockClosed className="h-12 w-12 text-indigo-800 mb-4 bg-indigo-200 rounded-full p-2" />
                        <h2 className="text-2xl font-bold mb-2">Đăng nhập</h2>
                        <p>Nhập email và mật khẩu của bạn để đăng nhập</p>
                    </div>
                    <form className='space-y-6'>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium mb-2'>
                                Email
                            </label>
                            <div className='relative'>
                                <span className='absolute inset-y-0 left-3 flex items-center text-gray-400'>
                                    <span className='text-sm'><HiMail /></span>
                                </span>
                                <input 
                                    type='email'
                                    id='email'
                                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:translate-y-[-2px]'
                                    placeholder='Nhập email của bạn'
                                />
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between items-center mb-2'>
                                <label htmlFor='password' className='block text-sm font-medium mb-2'>
                                    Mật khẩu
                                </label>
                                <a className='text-sm font-semibold text-indigo-500 hover:text-indigo-800 transition-colors'>Quên mật khẩu?</a>
                            </div>
                            <div className='relative'>
                                <span className='absolute inset-y-0 left-3 flex items-center text-gray-400'>
                                    <span className='text-sm'><HiLockClosed /></span>
                                </span>
                                <input 
                                    type='password'
                                    id='password'
                                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:translate-y-[-2px]'
                                    placeholder='Nhập mật khẩu của bạn'
                                />
                                <span 
                                    className='absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer'
                                    onClick={() => {
                                        const passwordInput = document.getElementById('password');
                                        if (passwordInput.type === 'password') {
                                            passwordInput.type = 'text';
                                        } else {
                                            passwordInput.type = 'password';
                                        }
                                    }}
                                >
                                    <HiEye className='text-xl' id='togglePasswordIcon' />
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center justify-end hover-scale'>
                            <input 
                                type='checkbox'
                                id='rememberMe'
                                className='h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-offset-2  transition-colors'
                            />
                            <label htmlFor='rememberMe' className='ml-2 block text-sm'>Ghi nhớ đăng nhập</label>
                        </div>
                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='w-full bg-indigo-600 text-white py-3 rounded-full
                             font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 
                             focus:ring-offset-2 focus:ring-indigo-500 transition-colors hover-scale'
                        >
                            Đăng nhập
                        </button>

                        {/* fingerprint login option */}
                        <div className='relative flex items-center justify-center mt-4 mb-4'>
                            <div className='flex-grow border-t border-gray-300'></div>
                            <span className='flex-shrink mx-4 px-4 text-gray-500'>Hoặc đăng nhập với</span>
                            <div className='flex-grow border-t border-gray-300'></div>
                        </div>

                        <div className='grid grid-cols-3 gap-3 mt-2'>
                            <button
                             type='button'
                             className='flex justify-center py-4 px-4 border border-gray-300 rounded-full hover:bg-gray-50 hover-scale'
                            >
                                <i className='text-lg'><FaGoogle /></i>
                            </button>

                            <button
                             type='button'
                             className='flex justify-center py-4 px-4 border border-gray-300 rounded-full hover:bg-gray-50 hover-scale'
                            >
                                <i className='text-lg'><FaFacebook /></i>
                            </button>

                            <button
                             type='button'
                             className='flex justify-center py-4 px-4 border border-gray-300 rounded-full hover:bg-gray-50 hover-scale'
                            >
                                <i className='text-lg'><FaEnvelope /></i>
                            </button>
                        </div>
                        
                        <div className='text-center mt-6 flex items-center justify-center'>
                            <p className='text-sm text-gray-600'>
                                Bạn chưa có tài khoản?
                            </p>
                            <a
                            href = '#'
                            className='ml-1 text-indigo-600 text-sm hover:text-indigo-800 font-semibold hover-scale'
                            >
                                Đăng ký ngay
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}