
import React, { useEffect, useState } from "react";
import Header from "./Header";
import WorkspaceDetail from "../PAGES/WorkspaceDetail";
import Button from "./Button";
import InputField from "./InputField";

const WorkspaceUsers = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" ,role:"" ,created_at:""});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const workspaceId = localStorage.getItem("workspace_id");
  const [userid,setuserid]=useState("")
   
   
  // const [workspaceData,setnewData]=useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
   

  const openModal = (e,element) => {
    setIsOpen(true);
    setuserid(element.id)
    
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  
  
  useEffect(() => {
    console.log("Workspace-----:", workspaceId);
    const fetchAllWorkspaces = async () => {
      try {
        console.log("UserID is:", workspaceId);
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/workspace/${workspaceId}/users`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const result = await response.json();
        setData(result.data);
        localStorage.setItem("id", userid.id);
        console.log("this is my userid is------------",userid)
        console.log("API Response:", result);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };
    
    fetchAllWorkspaces();
  }, []);
  // setData(data[1].id)
  // console.log("Data is---",data[1].id)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.email || !formData.role || !formData.name || !formData.created_at) {
        return alert("Both email and  name  and created are required!");
      }
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/workspace/${workspaceId}/users/create`, {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
           
          body: JSON.stringify({
                      email: `${formData.email}`,
                      role: `${formData.role}`,
                    }),
        });
  
        if (response.ok) {
                         
              const result=await response.json()
              setData([...data,result.data])
              console.log("this is my workspaceData------",data)                                  
              console.log("result:",  result) 
                                            
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Something went wrong.");
        }
        
      } catch (error) {
        console.error("Error during login:", error);
        alert("Failed to login. Please try again.");
      }
    };
     
      
  // const handleUpdate = async () => {
  //   try {
  //     // const worspaceUserId=localStorage.getItem("id");
      
  //       const API_URL = import.meta.env.VITE_API_URL;
  //      const response = await fetch(`${API_URL}/workspace/${workspaceId}/users/${userid}`, {
  //       method: "PATCH",
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         role: `${formData.role}`,
  //         // console.log(formData.role);
          
          
  //       })
  //     })
  //     const result = await response.json()
  //     console.log(result);
      

  //     // if (response.ok) {
  //     //   setData((prevData) =>
  //     //     prevData.map((edu) =>
  //     //       edu.id === educationId ? { ...edu, ...formValues } : edu
  //     //     )
  //     //   );

  //     //   closeModal();
  //     // }
  //   }
  //   catch (error) {
  //     console.error(error)
  //   }
  // }
  const handleUpdate = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/workspace/${workspaceId}/users/${userid}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ role: formData.role }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Updated User:", result);
  
         
        setData((prevData) =>
          prevData.map((user) =>
            user.id === userid ? { ...user, role: formData.role } : user
          )
        );
  
        closeModal(); 
      } else {
        console.log("Error updating role:", await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDelete = async (e, element) => {
    e.preventDefault()
    try {
      // DELETE api call 
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/workspace/${workspaceId}/users/${element.id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify()
      })
  
      if (response.ok) {
        setData((prevData) => prevData.filter(user => user.id !== element.id));
        console.log("User successfully deleted!"); 
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  

  let WorkspaceUser = (
    <>
      {data.length > 0 ? (
        data.map((element, index) => (
          <tbody key={index}>
            <tr className="bg-white border-b text-black border-gray-200 hover:bg-gray-50 ">
              <td className="px-6 py-4">{element.workspace_name}</td>
              <td className="px-6 py-4">{element.role}</td>
              <td className="px-6 py-4">{element.created_at}</td>
              <td className="px-6 py-4">{element.status}</td>
              <td class="flex items-center px-5 gap-3 py-4">

                {/* edit icon */}
                <i onClick={(e) => openModal(e, element)} class="cursor-pointer text-blue-600 far fa-edit fa-lg "></i>
                {/* remove icon */}
                <i onClick={(e) => handleDelete(e, element)} class="cursor-pointer text-red-600 fa-solid fa-trash fa-lg"></i>
                
              </td>
            </tr>
          </tbody>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
            No records found
          </td>
        </tr>
      )}
    </>
  );

  return (
    <>

<div className="flex justify-center gap-1 items-center my-4">
    <div className="flex w-full justify-center items-center gap-[1rem]">
      <i className="fa-solid fa-file-invoice text-xl"></i>
      <h2 className="text-xl">Workspace Member</h2>
    </div>
  </div>
      {/* Button to open modal */}
      <div className="button w-[35vw] mx-auto flex justify-end ">
        <div>
        <Button name="Create" className="w-[20vw]" handleClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      {/* Modal using Tailwind */}
      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[35vw] animate-slideUp">
      <h2 className="text-xl font-bold mb-4">Fill the Form</h2>

      {/* Form */}
      <form className="space-y-4 " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="block text-gray-700">Full name</label>
          <InputField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-gray-700">Email</label>
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-gray-700">Role</label>
          <InputField
            type="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text-gray-700">Created at</label>
          <InputField
            type="date"
            name="created_at"
            value={formData.created_at}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 border-2 border-orange-600 rounded-lg transition-all"
          >
            Close
          </button>
          <Button
            type="submit"
            name="Submit"
            handleClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Table */}
      <div className="flex justify-center items-center w-full my-7">
        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg max-w-4xl">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr className="flex  gap-5">
                <th scope="col" className="px-6 py-3">Full Name</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">Created At</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>{WorkspaceUser}</tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-fadeIn">
            <h2 className="text-lg font-bold mb-4">Select an Role</h2>

            {/* Radio Buttons */}
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}

                />
                <span>Admin</span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="radio"
                  name="role"
                  value="employee"
                  checked={formData.role === "employee"}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}

                />
                <span>Employee</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-5">
              <button onClick={closeModal}   className="px-4 py-2 border-2 border-orange-600 rounded-lg transition-all">
                Cancel
              </button>
              <Button className="px-4 py-2  text-white rounded" name="UpdateRole"
              handleClick={handleUpdate}
              >
                
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkspaceUsers;
