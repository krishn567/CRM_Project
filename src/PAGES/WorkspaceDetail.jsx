import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import InputField from '../Components/InputField'
import Button from '../Components/Button'
import WorkspaceUsers from '../Components/WorkspaceUsers'

const WorkspaceDetail = () => {
  const [workspacedata, setWorkspacedata] = useState({
   name: "",
    website: "",
    logo_url: "",
    created_at: null,
  });
   
   
  const workspaceId = localStorage.getItem("workspace_id");
  
//   const workspaceId = localStorage.getItem("finalworkspace");


   useEffect(() => {
      console.log("Workspace-----:", workspaceId)
          const fetchAllWorkspaces = async () => {
              // const userId = localStorage.getItem("userId");
              // console.log("UserID is:", userId);
              try {
                console.log("UserID is:", workspaceId);
                  const API_URL = import.meta.env.VITE_API_URL;
                  // /api/workspace/{workspace}
                  const response = await fetch(`${API_URL}/workspace/${workspaceId}`, {
                      headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                      },
                      credentials: "include",
                  });
                  const result = await response.json();
                  console.log("API Response:", result);
                  
                  // setWorkspacedata(result.data);
                  setWorkspacedata((pre)=>({...pre,...result.data}))
                  console.log(workspacedata)
                   
              } catch (error) {
                  console.error("Error fetching workspaces:", error);
              }
          };
  
          fetchAllWorkspaces();
      }, [workspaceId]);
      const handleChange=(e)=>{
         const { name, value } = e.target;
         setWorkspacedata({...workspacedata,[name]:value})

      }
       const handleSubmit = async (e) => {
           e.preventDefault();
         //   if (!formValues.email || !formValues.password) {
         //     return alert("Both email and password are required!");
         //   }
           try {
             const API_URL = import.meta.env.VITE_API_URL;
             const response = await fetch(`${API_URL}/workspace/${workspaceId}`, {
               method: "POST",
               headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
               },
               credentials: 'include',
                
               body: JSON.stringify({
                  name : `${workspacedata.name}`,
 
                         }),
             });
       
             if (response.ok) {                                
                   const result=await response.json()
                   console.log("result:",  result)  
                             
               //    const demo = fetchworckspace(result.data.user_id)
               //   //  console.log("demo:", demo)
               //   const userId = result.data.user_id
               //   console.log(userId);
                 
             } else {
               const errorData = await response.json();
               alert(errorData.message || "Something went wrong.");
             }
             
           } catch (error) {
             console.error("Error during login:", error);
             alert("Failed to login. Please try again.");
           }
         };
          
    
  return (
     <>
      <Header/>
      <hr className=""/>
      <aside id="default-sidebar" class=" fixed top-0 left-0 z-40 w-[22vw] mt-20 h-screen transition-transform -translate-x-full sm:translate-x-0 border-e-2 border-black " aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-100 ">
    <div className='flex gap-1 justify-center items-center w-[50%]'>
           
           {/* <h1 className='font-bold  text-black'>Flexbox Technologies</h1> */}
    </div>
      <ul class="space-y-2 font-medium flex flex-col mt-5 justify-start items-center w-[50%]">
         
         {/*   */}
         <li>
            
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
               {/* <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg> */}
               <span class="ms-3 text-start  hover:bg-gray-200 text-lg p-2 rounded-lg">Home</span>
            </a>
         </li>
         {/*   */}
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group">
               {/* <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg> */}
               <span class="flex-1 ms-5 whitespace-nowrap  hover:bg-gray-200 text-lg p-2 rounded-lg">Explore</span>
               {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group">
               {/* <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg> */}
               <span class="flex-1 ms-12  text-start  hover:bg-gray-200 text-lg p-2 rounded-lg">Notification</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
               {/* <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
               </svg> */}
               <span class="flex-1 ms-0 whitespace-nowrap  hover:bg-gray-200 text-lg p-2 rounded-lg">Users</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group">
               {/* <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg> */}
               <span class="flex-1 ms-2 whitespace-nowrap  hover:bg-gray-200 text-lg p-2 rounded-lg">Project</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group">
               {/* <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg> */}
               <span class="flex-1 ms-0 whitespace-nowrap  hover:bg-gray-200 text-lg p-2 rounded-lg">Profile</span>
            </a>
         </li>  
                                               
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group">           
               <span class="flex-3 ms-7 whitespace-nowrap  hover:bg-gray-200 text-lg p-2 rounded-lg"
               
               >Workspace</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">                                
            </a>
         </li>
      </ul>
   </div>
</aside>

      <aside id="default-sidebar" class=" fixed top-0 right-0 z-40 w-[22vw] h-screen mt-20 transition-transform -translate-x-full sm:translate-x-0 border-s-2 border-black " aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-100 ">
      <ul class="space-y-2 font-medium flex flex-col justify-center items-center">
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                          onClick={() => scrollToSection(profileRef)}
            >
               {/* <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg> */}
               
               <span class="ms-3 text-orange-500 font-bold  hover:bg-gray-200 text-lg p-2 rounded-lg">Details</span>
            </a>
         </li>
         {/*   */}
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group" 
                          onClick={() => scrollToSection(accountRef)}

            >
               {/* <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg> */}
               <span class="flex-1 ms-6 whitespace-nowrap  hover:bg-gray-200 text-lg p-2 rounded-lg">Member</span>
               {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
            </a>
         </li>
                          
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >                                
            </a>
         </li>
      </ul>
   </div>
</aside>
<div className="p-4 flex justify-center items-center ">
                <form className="space-y-4"
                //  onSubmit={handleSubmit}
                 >                  
                   <div className="flex justify-center gap-1 items-center my-4">
    <div className="flex w-full justify-center items-center gap-[1rem]">
      <i className="fa-solid fa-file-invoice text-xl"></i>
      <h2 className="text-xl">Workspace Details</h2>
    </div>
  </div>
                  <div className='flex gap-7'>

                  <div className='flex flex-col gap-1'>
                  <label for="name" class="block mb-2 text-sm font-medium  ">
                    Name
                  </label>
                  <InputField
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-orange-600-600 block w-[18vw] p-2.5  dark:border-gray-500  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Workspace name"
                    value={workspacedata.name}
                    onChange={handleChange}
                    // onChange={}
                    />
                    </div>
                    <div className='flex flex-col gap-1'>                  
                  <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    >
                    Website
                  </label>
                  <InputField
                    type="text"
                    id="website"
                    name="website"
                    value={workspacedata.website} 
                    onChange={handleChange}
                    placeholder="www.company.com"
                    className="w-[18vw] p-2.5 border rounded-lg"
                    />
                    </div>
                    </div>


                   <div className='flex gap-7'>

                 <div className='flex flex-col'>
             <label className="block mb-2 text-sm font-medium">Logo</label>
                <InputField
                  type="file"
                  className="w-[18vw] p-2.5 border rounded-lg"
                  onChange={(e) =>
                     setWorkspacedata({ ...workspacedata, logo_url: e.target.files[0] })
                   }
                  // value={workspacedata.logo_url}
                  />
                    </div>  
                    <div className='flex flex-col'>            
                  <label
                    htmlFor="join_date"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    >
                    Join Date
                  </label>
                  <InputField
                      type="date"
                      id="join_date"
                      name="created_at"
                    value={workspacedata.created_at} 
                    onChange={handleChange}
                    placeholder=""
                    className="w-[18vw] p-2.5 border rounded-lg"
                    />
                    </div>
                    </div>
                  <div className="flex justify-end gap-10">
                     <button
                      type="button"
                      onClick={handleSubmit}
                      class=" px-10 me-2 mb-2 text-sm font-medium  focus:outline-non    focus:z-10 focus:ring-4 focus:ring-gray-100  bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-500"
                    >  Post
                    </button> 
                    {/* <button
                      type="submit"
                      className="w-[40%] bg-orange-600 text-white py-2.5 rounded-lg hover:bg-orange-500"
                    >
                      Create new Workspace
                    </button> */}
                  </div>
                  <div className="flex flex-col gap-[7px] w-[50%]">                                 
          </div>
                </form>
              </div>

              <WorkspaceUsers/>
 
     </>
  )
}
 


export default WorkspaceDetail
 

 



