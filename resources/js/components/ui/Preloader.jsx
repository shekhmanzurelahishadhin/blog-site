import React from 'react';

const Preloader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-150"></div>
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
            </div>
        </div>
    );
};

export default Preloader;
