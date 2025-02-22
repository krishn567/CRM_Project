// import React, { useEffect, useState } from 'react'
// import Logo from '../Components/Logo'
 
 
//  const Header = () => {
//     const [workspacedata, setWorkspacedata] = useState([]);
//     const [isOpen, setIsOpen] = useState(false);
//     const [SelectUser,setUser]=useState()

//     useEffect(() => {
//         const fetchAllWorkspaces = async () => {
//             const userId = localStorage.getItem("userId"); 
//             console.log("UserID is:",userId)              
//             try {
//                 const API_URL = import.meta.env.VITE_API_URL;
//                 const response = await fetch(`${API_URL}/users/${userId}/workspaces`, {
//                     headers: {
//                         Accept: "application/json",
//                         "Content-Type": "application/json",
//                     },
//                     credentials: "include",
//                 });
//                 const result = await response.json();

//                 console.log("API Response:", result);

//                 setWorkspacedata(result.data);
//             } catch (error) {
//                 console.log("Error fetching workspaces:", error);
//             }
//         };

//         fetchAllWorkspaces();
//     }, []);

//     let workspaceName = workspacedata.map((element)=>(         
//               <option className="list-none" key={element.id}>
//                   {element.workspace_name}
//               </option>
//           ))
         

//     return (
//         <>
//             <div className="flex w-[90vw] justify-between gap-11 items-center sticky top-0 z-50">
//                 <div className="flex justify-center items-center w-[38vw] h-20 gap-11">
//                     <Logo className="" />
//                     <h1 className="text-xl font-semibold -tracking-tighter">
//                         FLEXBOX TECHNOLOGIES
//                     </h1>
//                 </div>
//                 <div className="workspaces relative w-[10vw] ">
//                     <div
//                         onClick={() => setIsOpen(!isOpen)}
//                         className=" "
//                     >
//                         {/* <p>workspace</p> */}
//                 {/* <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></select>workspace
//                     </select> */}
//                     {/* <i class="fa-solid fa-angle-down"></i> */}
                    
//                                 <form class="max-w-sm mx-auto">
//                                 {/* <label for="countries" class="block mb-2 text-sm font-medium  dark:text-black">Select an option</label> */}
//                                 <select id="" class=" border-2  text-black text-sm rounded-lg  block w-full px-3 py-3  dark:border-orange-500  dark:placeholder-gray-400  "
//                                 onChange={(e)=> setUser(e)}
//                                 >
//                                 <option >
                                   
//                                 </option>
//                                 {workspaceName} 
//                                 {/* <option value="US">United States</option> */}
                                 
//                                 </select>
                                 
//                                 </form>

//                     {/* {isOpen && (
//                         // <div className="absolute right-0 flex flex-col gap-2 w-full z-10 rounded-md border-2 border-slate-400 bg-white px-2 py-4">
                                                                                                                            
//                         // </div>
//                     )} */}
//                     </div>

//                 </div>
//             </div>
//         </>
//     );
// };
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  
// import { WorkspaceContext } from "./WorkspaceContext";
import Logo from "./Logo"; 

const Header = () => {
    const [workspacedata, setWorkspacedata] = useState([]);
    const [SelectUser, setUser] = useState();
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchAllWorkspaces = async () => {
            const userId = localStorage.getItem("userId");
            console.log("UserID is:", userId);
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await fetch(`${API_URL}/users/${userId}/workspaces`, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const result = await response.json();
                console.log("API Response:", result);
                setWorkspacedata(result.data);
            } catch (error) {
                console.log("Error fetching workspaces:", error);
            }
        };
        fetchAllWorkspaces();
    }, []);

     
    const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        if (selectedId) {
            setUser(selectedId); // 🔹 
            navigate(`/home/:workspace_id${selectedId}`);  
        }
    };

    return (
        <div className="flex w-[90vw] justify-between gap-11 items-center sticky top-0 z-50">
            <div className="flex justify-center items-center w-[38vw] h-20 gap-11">
                <Logo />
                <h1 className="text-xl font-semibold -tracking-tighter">
                    FLEXBOX TECHNOLOGIES
                </h1>
            </div>
            <div className="workspaces relative w-[10vw]">
                <form className="max-w-sm mx-auto">
                    <select
                        className="border-2 text-black text-sm rounded-lg block w-full px-3 py-3 dark:border-orange-500 dark:placeholder-gray-400"
                        onChange={handleSelectChange} 
                    >
                        {/* <option value="">Select Workspace</option> */}
                        {workspacedata.map((element) => (
                            <option key={element.workspace_id} value={element.workspace_id}>
                                {element.workspace_name}
                            </option>
                        ))}
                    </select>
                </form>
            </div>
        </div>
    );
};
 
 

 

export default Header;


 


 
 
  