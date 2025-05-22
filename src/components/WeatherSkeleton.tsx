import React from 'react';

const WeatherSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Current weather skeleton */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="h-8 bg-white bg-opacity-20 rounded w-48 mb-2"></div>
            <div className="h-4 bg-white bg-opacity-20 rounded w-32"></div>
          </div>
          
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-20"></div>
            <div className="h-12 bg-white bg-opacity-20 rounded w-16 ml-2"></div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg">
              <div className="mr-3 p-2 bg-white bg-opacity-20 rounded-full w-8 h-8"></div>
              <div className="flex-1">
                <div className="h-3 bg-white bg-opacity-20 rounded w-12 mb-2"></div>
                <div className="h-4 bg-white bg-opacity-20 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white bg-opacity-10 p-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-white bg-opacity-20 mr-2"></div>
                <div className="h-4 bg-white bg-opacity-20 rounded w-16"></div>
              </div>
              <div className="h-4 bg-white bg-opacity-20 rounded w-16"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center space-x-8">
          <div className="h-5 bg-white bg-opacity-20 rounded w-16"></div>
          <div className="h-5 bg-white bg-opacity-20 rounded w-16"></div>
        </div>
      </div>
      
      {/* Forecast skeleton */}
      <div className="mt-6">
        <div className="h-6 bg-white bg-opacity-20 rounded w-40 mb-4"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-center">
                <div className="h-5 bg-white bg-opacity-20 rounded w-12 mx-auto mb-3"></div>
                <div className="w-9 h-9 rounded-full bg-white bg-opacity-20 mx-auto mb-3"></div>
                <div className="h-3 bg-white bg-opacity-20 rounded w-20 mx-auto mb-3"></div>
                <div className="flex justify-between items-center mt-3">
                  <div className="h-4 bg-white bg-opacity-20 rounded w-10"></div>
                  <div className="h-4 bg-white bg-opacity-20 rounded w-10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherSkeleton;