
import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null;

    return (
        <div className='fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black/20'>
            <div className='relative p-4 w-full max-w-2xl'>
                <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                    {/* Header */}
                    <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600'>
                        <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
                            {title}
                        </h3>
                        <button
                            type='button'
                            className='text-gray-400 hover:text-gray-900 hover:bg-gray-200 dark:hover:text-white dark:hover:bg-gray-600 rounded-lg w-8 h-8 flex items-center justify-center'
                            onClick={onClose}
                        >
                            <svg
                                className='w-3 h-3'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 14 14'
                            >
                                <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M1 1l12 12M13 1L1 13'
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div className='p-4 md:p-5 space-y-4'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
