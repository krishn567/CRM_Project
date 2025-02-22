import React, { useState } from "react";

const Demo = () => {
  // State to toggle modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-center items-center h-full w-[100vw] overflow-hidden">
        {/* Create Workspace Section */}
        <div className="bg-white w-[45vw] rounded-lg shadow-xl shadow-orange-600">
          <div className="w-[40vw] border-[0.2rem] border-orange-600 flex justify-center mx-auto my-6 h-auto rounded-lg">
            <div className="flex flex-col gap-5 justify-center py-3 w-[40vw]">
              <div className="flex justify-center items-center">
                <img
                  src="https://images.unsplash.com/photo-1629904869392-ae2a682d4d01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2dyYW1tZXIlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
                  className="px-4"
                  alt="not found"
                />
              </div>
              <p className="text-black text-center w-[35vw] mx-auto">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
                doloremque delectus laborum voluptates omnis hic, qui officia
                deleniti natus nostrum ullam sit, repellat quia, necessitatibus
                facere. Totam.
              </p>

              {/* Create Workspace Button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={openModal} // Open modal on click
                  className="w-[35vw] rounded-md text-white bg-orange-600 text-sm font-medium shadow hover:bg-orange-500 px-4 py-4"
                >
                  Create Workspace
                </button>
              </div>
            </div>
          </div>
          <h2 className="text-black text-center  ">Accept an invitation</h2>
           {/* <div className=' border-2 border-gray-800 flex  my-6 h-auto'>
               <div className='w-[30vw] flex items-center gap-10 px-5'>
                  <div className='w-[10vw] '>
                     <img src={image1}   className='text-start border-2 border-gray-800 rounded-	'    alt="" />

                  </div>
                   <h2 className='text-white'>Wavely</h2>
               </div>

              </div> */}

<div className="mt-5 ">
            <div className="border-[0.2rem] border-orange-600 flex mx-auto w-[40vw] h-auto rounded-lg">
              {/* <div className=" "> */}
                  
                   
                <div className="w-[20vw]   ">
                  {/* <img src={image1} className='w-[100%]' alt="" /> */}
                </div>
                <div className="flex w-[100vw] justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-black">Wavely</h2>
                    <div className="flex">
                    <p>&#128517;</p>
                    <p>	&#128515;</p>
                    <p>&#128513;</p>
                    <h4 className="text-black">13 member</h4>
                    </div>
                  </div>
                  <div className="px-5">
                    <button
                      type="submit"
                      className="w-[5vw] rounded-md text-white bg-orange-600 text-sm font-medium  bg-primary text-primary-foreground shadow hover:bg-orange-500 px-1 py-1 h-[5vh]"
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
                
                


            <p className="text-black text-center mt-5">invitation from email@Wavely.com</p>
            </div>

        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg w-[90vw] md:w-[40vw]">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-300">
                <h3 className="text-xl font-semibold">Sign in to our platform</h3>
                <button
                  type="button"
                  onClick={closeModal} // Close modal on click
                  className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg p-1"
                >
                  ✖
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-600"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-600"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-2.5 rounded-lg hover:bg-orange-500"
                  >
                    Login to your account
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Demo;
