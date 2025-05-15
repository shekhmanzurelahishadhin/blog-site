import React from 'react';

const Preloader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90 backdrop-blur-sm">
            <div className="flex items-end space-x-1 h-12">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="w-2 bg-cyan-400 rounded-t-full animate-wave"
                        style={{
                            height: `${(i + 1) * 10}px`,
                            animationDelay: `${i * 0.1}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Preloader;
