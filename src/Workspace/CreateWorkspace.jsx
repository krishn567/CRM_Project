import React, { useState } from "react";
// import AcceptInvitation from "../Components/AcceptInvitation";
import { Navigate, useNavigate, useParams } from "react-router-dom";
const CreateWokspace = () => {
   
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const {id}=useParams()

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [formValues, setFormValues] = useState({
    name: "",
    website: "",
    logo:''
    // email:'',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.name || !formValues.website) {
      return alert(" name and website and logo are required!");
    }
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      // console.log("API URL:", API_URL);
      // console.log("Form Values:", formValues);
      const response = await fetch(`${API_URL}/workspace/create`, {
        method: "POST",
         headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: `${formValues.name}`,
          logo: `${formValues.logo}`,
          website:`${formValues.website}`
        }),
      });
      const result = await response.json()

      console.log("this is my "+result.data.id)
      localStorage.setItem("workspaceid", result.data.id)
      const workspaceid = localStorage.getItem("workspaceid")
      if(response.ok){         
        navigate(`/home/${workspaceid}`)
       }
       else{
        alert('workspace failed to create')
       }
    }  catch (error) {
      console.error("Error during login:", error);
      alert("Failed to login. Please try again.");
    }
  };
  const logout = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;  
      const response = await fetch(`${API_URL}/auth/session/sign-out`, {
        method: "DELETE",  
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },         
        credentials: "include",              
      });
  
      if (response.ok) {    
        navigate("/");  
      } else {
        alert("Logout failed. Try again!");  
      }
    } 
    
    catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  


  return (
    <>
      <div className="flex justify-center items-center h-full w-[100%] overflow-hidden mx-auto">
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

              <div className="flex flex-col justify-center items-center gap-7">


              <div className="text-center">
                <button
                  type="button"
                  onClick={openModal} //
                  className="w-[35vw] rounded-md text-white bg-orange-600 text-sm font-medium shadow hover:bg-orange-500 px-4 py-4"
                  >
                  Create Workspace
                </button>
              </div>
              <button

              type="button"
              onClick={logout}
              class="py-4 px-4 text-sm font-medium  focus:outline-non  rounded-lg border  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100  dark:border-orange-600 dark:hover:text-white dark:hover:bg-orange-500 w-[35vw] "
              >
              LogOut
            </button>

            </div>
                      </div>
          </div>

          {/* <AcceptInvitation/> */}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-start bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg w-[90vw] md:w-[40vw]">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-300">
                {/* <h3 className="text-xl font-semibold"></h3> */}
                <h1 className="font-bold">Create New Worksspace</h1>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg p-1"
                >
                  ✖
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* <div>
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
                   </div> */}

                  <h2>Workspace Detail</h2>

                  <label for="name" class="block mb-2 text-sm font-medium  ">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-orange-600-600 block w-full p-2.5  dark:border-gray-500  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Workspace name"
                    value={formValues.name}
                    onChange={handleChange}
                    // onChange={}
                  />

                  {/*                      
                     <label
                       htmlFor="email"
                       className="block mb-2 text-sm font-medium text-gray-900"
                     >
                       Your email
                     </label>
                     <input
                       type="email"
                       id="email"
                       name="email"
                       className="w-full p-2.5 border rounded-lg"
                       placeholder="name@company.com"
                      //  required
                       value={formValues.email}
                       onChange={handleChange}
                     /> */}
                  {/* <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Website
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formValues.website} // Correct key: "website"
                    onChange={handleChange}
                    placeholder="www.company.com"
                    className="w-full p-2.5 border rounded-lg"
                  /> */}

                   
             <label className="block mb-2 text-sm font-medium">Logo</label>
                <input
                  type="file"
                  className="w-full p-2.5 border rounded-lg"
                  onChange={handleChange} // File change handler
                />
                  <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Website
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formValues.website} // Correct key: "website"
                    onChange={handleChange}
                    placeholder="www.company.com"
                    className="w-full p-2.5 border rounded-lg"
                  />
                  <div className="flex justify-end gap-10">
                    <button
                      type="button"
                      class="py-2.5 px-5 me-2 mb-2 text-sm font-medium  focus:outline-non  rounded-lg border  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100  dark:border-orange-600 dark:hover:text-white dark:hover:bg-orange-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-[40%] bg-orange-600 text-white py-2.5 rounded-lg hover:bg-orange-500"
                    >
                      Create new Workspace
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      
      

 
            <p className="text-black text-center mt-5">
              invitation from email@Wavely.com
              
            </p>
    </>
  );
};

export default CreateWokspace;
