import React from "react";
const Preloader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="relative flex flex-col items-center">
         
        <div className="w-16 h-16 border-4 border-orange-500 border-dashed rounded-full animate-spin animate-pulse"></div>

         
        <div className="flex mt-4 space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce animate-blink delay-100"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce animate-blink delay-200"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce animate-blink delay-300"></div>
        </div>

         
        <span className="mt-4 text-lg font-semibold text-orange-600 animate-blink">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Preloader;


 

  
   
  
   
  
 
