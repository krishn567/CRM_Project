import React, { useEffect, useRef, useState } from 'react'
import Button from '../Components/Button'
import Logo from '../Components/Logo';
import FlexboxTechno from '../Components/FlexboxTechno';
import Education from './Education';
import Experience from './Experience ';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
 

const Home = () => {
  const navigate=useNavigate()
  const profileRef = useRef(null);
  const accountRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);

  // Scroll karne ka function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    join_date:"",
    email: "",
    avatar: "",
});
const [ContactData, setContactData] = useState({
  name: "",
  number: "",
  ifsc_code:"",
  address: "",   
});
 
const [newid, setid] = useState(null);  

 
const handleChange = (e) => {
  const { name, value } = e.target;
  setContactData({ ...ContactData, [name]: value });
  setUserData({ ...userData, [name]: value });
  
};
const handlenavigate=()=>{
  navigate(`/workspacedetail/${storedWorkspaceId}`)

}
// const handleChange = (e) => {
//   setContactData({ ...ContactData, [e.target.name]: e.target.value });
// };

  const userId = localStorage.getItem("userId");  
  console.log(userId)
  const storedWorkspaceId = localStorage.getItem("workspace_Id");
  console.log("Retrieved Workspace ID:", storedWorkspaceId);

  useEffect(() => {      
      const API_URL = import.meta.env.VITE_API_URL;
      // /api/users/{user}
      const fetchData = async () => {
          try {
              const response = await fetch(`${API_URL}/users/${userId}`, {
                  method: "GET",
                  headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                  },
                  credentials: "include",  
              });
  
              if (response.ok) {
                  const data = await response.json(); 
                  // console.log(data)
                  setUserData({
                    first_name:data.data.first_name|| "",
                    last_name:data.data.last_name|| "",
                    // join_date:data.data.join_date|| "",
                    email:data.data.email|| "",
                    avatar:data.data.avatar||"",
                  })
                  
                  // setFilteredUsers(data.data)
                  // console.log(filteredUsers);                                
                                      
              } else {
                  console.error("API Error:", response.status, response.statusText);
              }
          } catch (error) {
              console.error("Fetch Error:", error);
          }
  
      };
  
      fetchData();
  }, []);
  // console.log(userData)

  const demoid = localStorage.getItem("demoid")
  console.log(demoid);
  
  useEffect(() => {      
    const API_URL = import.meta.env.VITE_API_URL;
    // /api/users/{user}
    const fetchDataTwo = async () => {
        try {
            const response = await fetch(`${API_URL}/account-detail/${demoid}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",  
            });

            if (response.ok) {
                const data = await response.json(); 
                console.log(data)
                setContactData(prevState => ({
                  ...prevState,
                  name: data.data.name || "",
                  number: data.data.number || "",
                  ifsc_code: data.data.ifsc_code || "",
                  address: data.data.address || "",
                }));
                // setContactData({
                //   name:data.data.name|| "",
                //   number:data.data.number|| "",
                //   ifsc_code:data.data.ifsc_code|| "",
                //   address:data.data.address|| "",
                   
                // })
                // setFilteredUsers(data.data)
                // console.log(filteredUsers);                                
                                    
            } else {
                console.error("API Error:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }

    };

    fetchDataTwo();
}, [newid]);
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!userData.first_name || !userData.last_name || !userData.email ) {
        return alert("Both firstname and lastname and email are required!");
      }
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/users/${userId}`, {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
           
          body: JSON.stringify({
                      first_name: `${userData.first_name}`, 
                      last_name: `${userData.last_name}`,
                      join_date: `${userData.join_date}`,
                      avatar: `${userData.avatar}`,
                    }),
        });
       
        if (response.ok) {
          const result=await response.json()
          console.log(" result:",  result )          
    
          alert(" Submit Successfull");                 
            //  const demo = fetchworckspace(result.data.user_id)
            // //  console.log("demo:", demo)
            // const userId = result.data.user_id
            // console.log(userId);
            
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Something went wrong.");
        }
        
      } catch (error) {
        console.error("Error during submit form:", error);
        alert("Failed to Submit. Please try again.");
      }
    };
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    const handleSubmitTwo = async (e) => {
        e.preventDefault();
        if (!ContactData.name || !ContactData.number|| !ContactData.address ||!ContactData.ifsc_code ) {
          return alert("Both name and number and address and ifsc-code  are required!");
        }

        // if (!/^\d{12,}$/.test(ContactData.number)) {
        //   return alert(" number must be at least 12 digits and only numbers!");
        // }
        if (!ContactData.number.match(/^\d{12,}$/)) {
          return alert(" number must be at least 12 digits and only numbers!");
        }
    
         
        if (!ContactData.ifsc_code.match(/^[A-Z]{4}\d{6}$/)) {
          return alert("IFSC Code must start with 4 capital letters followed by 6 digits!");
        }
    
         
        // if (!/^[A-Z]{4}\d{8}$/.test(ContactData.ifsc_code)) {
        //   return alert("IFSC Code must start with 4 capital letters followed by 8 digits!");
        // }
                
        alert("Form submitted successfully!");
        
                
        try {
          const API_URL = import.meta.env.VITE_API_URL;
          const response = await fetch(`${API_URL}/account-detail/create`, {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
             
            body: JSON.stringify({
                        name: `${ContactData.name}`,
                        number: `${ContactData.number}`,
                        ifsc_code: `${ContactData.ifsc_code}`,
                        address: `${ContactData.address}`,
                      }),
          });
    
          if (response.ok) {
            alert("Submit Successfull");                 
                const result=await response.json()
                console.log("result:",  result.data.id)
                setid(result.data.id)
                // console.log(newid)
                setIsUpdateVisible(true)
              //  const demo = fetchworckspace(result.data.user_id)
              // //  console.log("demo:", demo)
              // const userId = result.data.user_id
              // console.log(userId);
              
          } else {
            const errorData = await response.json();
            alert(errorData.message || "Something went wrong.");
          }
          
        } catch (error) {
          console.error("Error during login:", error);
          alert("Failed to login. Please try again.");
        }
      };
      // useEffect(() => {
      //   if (newid !== null) {
      //     console.log("Updated ID:", newid);  
      //   }
      // }, [newid]); 
      const handleUpdate = async (e) => {
        e.preventDefault();  
        
        try {
          const API_URL = import.meta.env.VITE_API_URL;
          
          const response = await fetch(`${API_URL}/account-detail/${newid}`, {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              name: `${ContactData.name}`,
              number: `${ContactData.number}`,
              ifsc_code: `${ContactData.ifsc_code}`,
              address: `${ContactData.address}`,
            }),
        });
           
      
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
      
          const data = await response.json();
          alert("Data updated successfully!");
          console.log("Updated data:", data.data.id);
          localStorage.setItem("demoid",data.data.id)
        } catch (error) {
          console.error("Update failed:", error);
          alert("Update failed! Please try again.");
        }
      };
      
 
       
      
  return (
    <>
    
      

     <Header/>
 
   
  <hr className=""/>

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
               
               <span class="ms-3 text-orange-500 font-bold  hover:bg-gray-200 text-lg p-2 rounded-lg">Profile</span>
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
               <span class="flex-1 ms-6 whitespace-nowrap  hover:bg-gray-200 text-lg p-2 rounded-lg">Account</span>
               {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                          onClick={() => scrollToSection(educationRef)}

            >
               {/* <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg> */}
               <span class="flex-1 ms-9 whitespace-nowrap  hover:bg-gray-200 text-lg p-2 rounded-lg">Education</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                          onClick={() => scrollToSection(experienceRef)}

            >
               {/* <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
               </svg> */}
               <span class="flex-1 ms-11 whitespace-nowrap  hover:bg-gray-200 text-lg p-2 rounded-lg">Experience</span>
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
 

<aside id="default-sidebar" class=" fixed top-0 left-0 z-40 w-[22vw] mt-20 h-screen transition-transform -translate-x-full sm:translate-x-0 border-e-2 border-black " aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-100 ">
    <div className='flex gap-1 justify-center items-center w-[50%]'>
           
           {/* <h1 className='font-bold  text-black'>Flexbox Technologies</h1> */}
    </div>
      <ul class="space-y-2 font-medium flex flex-col mt-5 justify-start items-center w-[50%]">
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
         <li onClick={handlenavigate}>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group">
               {/* <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg> */}
               <span class="flex-3 ms-7 whitespace-nowrap  hover:bg-gray-200 text-lg p-2 rounded-lg"
               
               >Workspace</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
               {/* <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg> */}
                
            </a>
         </li>
      </ul>
   </div>
</aside>
 
 
<div className="p-[20px]">
       {/* <h3> Update Profile</h3> */}
      </div>
      <div className="flex gap-2 w-[90%] justify-center">
        {/* <div className="img w-[20%] flex items-center gap-3">
        <img
                src={
                  "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsG72wAo9EWJR4yQWyJJaDb6rYcBtJvTvH3UoAS4JFNDaxGhmKNaMwgElLURlRFeVkLCjkfnXmWtINWZIrPGYq0-&format=source"
                }
                className="w-[20%] rounded-full h-auto mx-3"
                alt="Not Found"
              />
          <h3 className="w-[100%]">Upload new</h3>
        </div> */}
        <div className="w-[20%]">
        </div>
      </div>
      

      <div className=" mt-[1rem] flex  items-center gap-[1rem] justify-center w-[100%]">
        {/* <div className='w-[50%] flex justify-center  items-center '> */}

      {/* <hr className="bg-black h-[3px] w-[100%]"/> */}
       <div className='flex gap-3 items-center'>
        <i class="fa-regular fa-user text-xl"></i>
        <h2 className='text-xl  w-[100%] text-center'>Basic Profile</h2>
       </div>
        {/* <hr className="bg-black h-[3px] w-[100%] "/> */}
        </div>


      <div className='flex justify-center flex-col items-center w-[93vw] '>
        <section ref={profileRef} className="p-6 h-auto">

      <form class="max-w-lg  py-8 flex flex-col gap-[25px]  w-[75vw] mx-auto  " onSubmit={handleSubmit}>
        <div className="flex gap-[34px] justify-between">
          <div className="flex flex-col gap-[7px]">
            <label htmlFor="First Name" className="block  text-sm font-medium text-black ">First Name</label>
            <input type="text" id="First Name" class=" border border-gray-300  text-sm rounded-lg focus:ring-blue-500  block
             w-[18vw] p-2.5  dark:placeholder-black-400  dark:focus:border-blue-500" placeholder="Jekin "
             value={userData.first_name}
             onChange={handleChange}
             required />
          </div>

          <div class="flex flex-col gap-[7px]">
            <label htmlFor="Last Name" className="block  text-sm font-medium text-black">Last Name</label>
            <input type="text" id="First Name" class=" border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[18vw] p-2.5  dark:placeholder-gray-400  dark:focus:border-blue-500" placeholder="Gohel " 
            value={userData.last_name}
            onChange={handleChange}
            required />
          </div>

        </div>
        {/* <div class="flex flex-col gap-[7px]">
          <label htmlFor="Brief Bio" className="block  text-sm font-medium text-black ">Brief Bio</label>
          <textarea type="text" id="Brief Bio" class=" border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 rows-2" placeholder="Full Stack Developer Laravel,ReactJS and AngularJS" required />
          </div> */}


        <div className="flex gap-[3.2rem] justify-between">
          <div className="flex flex-col gap-[7px] w-[50%]">
            <label htmlFor="email" className="block  text-sm font-medium  "> Email</label>
            <input type="email" id="email" class=" border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[18vw] p-2.5  dark:placeholder-gray-400  dark:focus:border-blue-500" placeholder="Gohel@gmail.com "
            value={userData.email}
            onChange={handleChange}
            required />
            {/* <select id="Location" className=
            "bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-[100%] p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
            
            <option>Rajkot</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
            </select> */}


          </div>

          <div className="flex flex-col gap-[7px]  w-[50%]">

            <label htmlFor="avtar" className="block  text-sm font-medium text-gray-900  ">Avatar</label>
            <input
                  type="file"
                  className="w-[18vw] border rounded-lg p-2.5"
                  value={userData.avatar}
                  onChange={handleChange}
                  
                  />
            {/* <input type="" id="avtar" class=" border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20vw] p-2.5  dark:placeholder-gray-400  dark:focus:border-blue-500" placeholder=" " required /> */}
            
            {/* <select id="personal_pronouns" className="
             bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-[100%] p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
             <option>He</option>
             <option>Her</option>
             
             
             </select> */}


          </div>
        </div>

                  {/* <label for="joinDate">Join Date:</label>

<input type="date" id="joinDate" name="joinDate"/> */}
           <div className="flex flex-col gap-[7px] w-[50%]">
            <label htmlFor="joindate" className="block  text-sm font-medium  "> Join Date:</label>
            {/* <input type="date" id="joindate" class=" border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20vw] p-2.5  dark:placeholder-gray-400  dark:focus:border-blue-500" 
            name='joindate'
            value={userData.join_date}
            required /> */}
              {/* <input
              type="date"
              id="joindate"
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20vw] p-2.5"
              name="join_date"
              value={userData.join_date}
              onChange={handleChange}
              
              required
              /> */}
                <input
                        type="date"
                        id="join_date"
                        name="join_date"
                        value={userData.join_date}
                        onChange={handleChange}
                        />
                      
          </div>



        <div class="flex items-start gap-[10px]">
          <div class="flex  items-center h-5">
            <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded  focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            
            required />
          </div>
          <label for="remember" class=" text-sm font-medium text-gray-900 ">remote</label>
        </div>


        {/* <div className="flex gap-[40px] justify-between"> */}
          {/* <div className="flex flex-col gap-[7px]">
            <label htmlFor="Website_link" className="block  text-sm font-medium text-gray-900 dark:text-white">Wesite</label>
            <input type="text" id="website_link" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div class="flex flex-col gap-[7px]">
            <label htmlFor="calender_link" className="block  text-sm font-medium text-gray-900 dark:text-white">Calender Link</label>
            
            <input type="text" id="calender_link" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            <span className="text-current font-light fs-[20px]">Add your Cal.Com or Calendly URL</span>
            </div> */}
        {/* </div> */}
        {/* <button type="submit" className="w-full rounded-md text-white bg-orange-600 text-sm font-medium  bg-primary text-primary-foreground shadow hover:bg-orange-500 px-4 py-2" >Sign Up</button> */}
        <div className='w-[40vw] flex justify-end'>
          <div>
        <Button name="Submit" type="submit" color="red" 
        className="w-[100%]"
        handleclick={handleSubmit}
        ></Button>
        </div>
        </div>
        {/* <ButtonComponent/>  */}
      </form>
      
        </section>


       

       
      
      {/* <div className=" mt-[1rem] flex  items-center gap-[1rem] justify-center w-[100%]">
        {/* <div className='w-[50%] flex justify-center  items-center '> */}

      {/* <hr className="bg-black h-[3px] w-[100%]"/> */}
       
        <div className=" mt-[1rem] flex  items-center gap-[1rem] justify-center w-[100%]">
        {/* <div className='w-[50%] flex justify-center  items-center '> */}

      {/* <hr className="bg-black h-[3px] w-[100%]"/> */}
       <div className='flex  items-center gap-5'>
       <i class="fa-regular fa-file-invoice text-xl"></i>
        <h2 className='text-xl  w-[100%] text-center'>Account Details</h2>
         
       </div>
        {/* <hr className="bg-black h-[3px] w-[100%] "/> */}
        </div>
         
      {/* </div> */}
      {/* <form class="max-w-lg  p-[2rem] flex flex-col gap-[2rem] " onSubmit={handleSubmitTwo}> */}
      <section ref={accountRef} className="p-6 h-auto">

      <form class="max-w-lg  py-8 flex flex-col gap-[3rem]  w-[75vw] mx-auto" onSubmit={handleSubmitTwo}>
        <div className="flex justify-between gap-[44px]">
          <div className="flex flex-col gap-[7px]">
            <label htmlFor="Name" className="block  text-sm font-medium text-gray-900 ">Name</label>
            <input type="text" id="Name" class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[18vw] p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            placeholder=""
            name='name'
            value={ContactData.name}
            required />
          </div>

          <div className="flex flex-col gap-[7px]">
            {/* <label htmlFor="number" className="block  text-sm font-medium text-black ">Number</label>
            <input type="number" id="number" name='number' className=" border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500                         
            focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 
            dark:focus:border-blue-500"
            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            onChange={handleChange}
            
            value={ContactData.number}
            
            placeholder="" required /> */}
       <label htmlFor="number" className="block text-sm font-medium text-black">Number</label>
      <input
        type="number"
        id="number"
        name="number"
        className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[18vw] p-2.5"
        onChange={handleChange}
        value={ContactData.number || ""} 
        placeholder="Enter number"
        required
        />
          </div>
        </div>
            <div className='flex flex-col gap-[20px] '>
        {/* <span className='font-bold'>Change Account email</span> */}
        <div className='flex gap-[44px] justify-between '>
        {/* <div className="flex flex-col gap-[7px]">
          <label htmlFor="secondary_email" className="block  text-sm font-medium text-gray-900 ">Secondary email</label>
          <input type="email" id="secondary_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[17vw] p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div> */}
           <div class="flex flex-col gap-[7px]">
          <label htmlFor="Address" className="block  text-sm font-medium text-black ">Address</label>
          <textarea type="text" id="Address" name='address' class=" border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[18vw] p-2  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 rows-2" placeholder="" 
          onChange={handleChange}
          value={ContactData.address}
          required />
        </div>
        <div className="flex flex-col gap-[7px]">
          <label htmlFor="IFSC" className="block  text-sm font-medium text-gray-900 ">IFSC Code</label>
          <input type="text" id="IFSC" name='ifsc_code' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[18vw] p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=' ICIC0000227'
          onChange={handleChange}
          value={ContactData.ifsc_code}
          required />
        </div>
            </div>
             {/* <div class="flex flex-col gap-[7px]">
          <label htmlFor="Address" className="block  text-sm font-medium text-black ">Address</label>
          <textarea type="text" id="Address" class=" border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 rows-2" placeholder="" required />
          </div> */}
        </div>            
        <div className=" w-[40vw] flex justify-end ">
          <div className='flex  gap-9'>
          {!isUpdateVisible && (
            <Button
            type="button"
            name='Create'
            // className="bg-red-500 text-white px-4 py-2 rounded-lg"
            className="w-[100%] "       
            handleClick={handleSubmitTwo}      
            >             
            </Button>
          )}

           
           
        {/* <Button name="Create" type="submit" color="red"
            className="w-[100%]"       
            ></Button>
            <Button name="Update" type="submit" color="red"
            className="w-[100%]"       
            ></Button> */}
            </div>  
        </div>

      </form>
      </section>
      {/* <div className="p-[10px] mt-[1rem] flex  items-center gap-[1rem] justify-center">
        
       
      <div className='w-[8%]'>
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRziNW7a5bxhIJirGYVZ2QdkdW_e2qHIuFdgQ&s"  alt="Not Found" />
      </div>
        <h2 className='text-2xl'>Education Details</h2>
        
         
      </div> */}

      <div className='flex justify-end items-end w-[55%]'>
        <div>
          
      {/* <Button
            type="button"
            name='Add Details'
            // className="bg-green-500 text-white px-4 py-2 rounded-lg"
            className="w-[100%]"
             handleClick
                   
            >                               
            </Button> */}
            </div>
            </div>
{/* <div class="relative overflow-x-auto shadow-md sm:rounded-lg  py-6">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                     SCHOOL
                </th>
                <th scope="col" class="px-6 py-3">
                     DEGREE
                </th>
                <th scope="col" class="px-6 py-3">
                     STUDY
                </th>
                <th scope="col" class="px-6 py-3">
                     GRADE
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody> */}
{/* <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    SCHOOL
                </th>
                <td class="px-6 py-4">
                     DEGREE
                </td>
                <td class="px-6 py-4">
                     STUDY
                </td>
                <td class="px-6 py-4">
                     GRADE
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr> */}
            {/* <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     Apple
                </th>
                <td class="px-6 py-4">
                     Laptop
                </td>
                <td class="px-6 py-4">
                      Yes
                </td>
                <td class="px-6 py-4">
                     demo
                </td>
                <td class="px-6 py-4 flex gap-7">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                </td>
            </tr> */}
             
        {/* </tbody>
    </table>
</div> */}
          {/* <div className=' '> */}
          <section ref={educationRef} className=" p-6 h-auto">
             <Education/> 
             </section>
             <section ref={experienceRef} className=" p-6 h-auto">
             <Experience/> 
             </section>
          {/* </div> */}
            </div>

           
            
            


       
               

    

 
    </>
  )
}

export default Home
