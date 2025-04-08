// resources/js/components/ui/Preloader.jsx
import React from 'react';

const Preloader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-t-cyan-500 border-white rounded-full animate-spin"></div>
                <p className="text-white text-sm">Loading...</p>
            </div>
        </div>
    );
};

export default Preloader;
