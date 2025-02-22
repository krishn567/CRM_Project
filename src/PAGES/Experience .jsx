import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'; 
import InputField from '../Components/InputField';
import Button from '../Components/Button';


const Experience = () => {

  const [data, setData] = useState([])
  // formvalues state
  const [formValues, setFormValues] = useState({
    designation: "",
    employment: "",
    company_name: "",
    experience_certificate: "",
  })

  // is modal open state
  const [isModalOpen, setIsModalOpen] = useState(false)

  // is update state
  const [isUpdate, setIsUpdate] = useState(false)

  // errors state
  const [errors, setErrors] = useState({})

  // exp id state
  const [experienceId, setExperienceId] = useState(null)

  const validateForm = () => {
    const errors = {};
    if (!formValues.designation.trim()) errors.designation = "Designation is required";
    if (!formValues.employment.trim()) errors.employment = "Employment time is required";
    if (!formValues.company_name.trim()) errors.company_name = "Company name is required";
    if (!formValues.experience_certificate) errors.experience_certificate = "Experience certificate is required";
    return errors;
  };
  useEffect(() => {
    const getAllExperienceDetails = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/user-experiences`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
          },
          credentials: "include",
          body: JSON.stringify()
        })

        const result = await response.json()

        setData(result.data)
        console.log(data)

      } catch (error) {
        console.error(error)
      }
    }

    getAllExperienceDetails();
  }, [])

  // handle update function
  const handleUpdate = async () => {

    try {
    const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/user-experiences/${experienceId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
          designation: formValues.designation,
          employment: formValues.employment,
          company_name: formValues.company_name,
          experience_certificate: formValues.experience_certificate,
        }),
      })

      const result = await response.json();

      if (response.ok) {
        setData((prevData) =>
          prevData.map((exp) =>
            exp.id === experienceId ? { ...exp, ...formValues } : exp
          )
        );
        closeModal();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // handle delete function
  const handleDelete = async (e, element) => {
    e.preventDefault();

    try {
        const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/user-experiences/${element.id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify()
      })

      if (response.ok) {
        setData((prevData) => prevData.filter(exp => exp.id !== element.id))
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  // open modal function
  const openModal = (e, experience) => {
    e.preventDefault()
    setIsModalOpen(true)

    if (experience) {
      setIsUpdate(true)
      setFormValues({
        designation: experience.designation,
        employment: experience.employment,
        company_name: experience.company_name,
        experience_certificate: experience.experience_certificate,
      })
      setExperienceId(experience.id)
    }
    else {

      setIsUpdate(false);

      setFormValues({
        designation: "",
        employment: "",
        company_name: "",
        experience_certificate: "",
      })
    }
    setIsModalOpen(true)
  }

  // close modal function
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // handle change function
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "experience_certificate" && files.length > 0) {
      const file = files[0];

      if (file.type !== "application/pdf") {
        setErrors((prev) => ({ ...prev, experience_certificate: "Only PDF files are allowed" }));
        setFormValues((prev) => ({ ...prev, experience_certificate: null })); // Reset file
        return;
      } else {
        setErrors((prev) => ({ ...prev, experience_certificate: "" }));
      }

      setFormValues((prev) => ({ ...prev, experience_certificate: file }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };



  const handleAddExperience = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
    
    try {
        const API_URL = import.meta.env.VITE_API_URL;
        const formData = new FormData();
            formData.append("designation", formValues.designation);
            formData.append("employment", formValues.employment);
            formData.append("company_name", formValues.company_name);
            formData.append("experience_certificate", formValues.experience_certificate); // File append

        const response = await fetch(`${API_URL}/user-experiences/create`, {
          method: "POST",
          headers: {
            Accept: "application/json"
          },
          body: formData, 
          credentials: "include",
        });
      
        const result = await response.json();
      
        if (response.ok) {
          localStorage.setItem("experienceId", result.data.id);           
          setData((prevData) => [...prevData, result.data]);
          setIsModalOpen(false); // Close modal
        } else {
          console.error("Upload Failed:", result);
        }
      } catch (error) {
        console.error("Error Occurred:", error);
      }
      
    }
  };

  const sectionRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("experience")) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  let experiencedEmployee = (
    <>
      {data.length > 0 ? (
        data.map((element) => (
          <tbody>
            <tr className="bg-white border-b text-black  border-gray-200 hover:bg-gray-50  flex  justify-center items-center gap-6 ">
              <td className='px-8 py-4'>
                {element.designation}
              </td>
              <td className='px-8 py-4'>
                {element.employment}
              </td>
              <td className='px-8 py-4'>
                {element.company_name}
              </td>
              
              {/* button field */}
              <td class="flex justify-center items-center  gap-4 py-4">
                  
                {/* eye icon */}

                <i class="fa-regular fa-eye fa-xl cursor-pointer" 
                onClick={() => { window.open(element.experience_certificate, '_blank') }}
                ></i>
                {/* edit icon */}
                <i onClick={(e) => openModal(e, element)} class="cursor-pointer text-blue-600 far fa-edit fa-lg"></i>

                {/* remove icon */}
                <i onClick={(e) => handleDelete(e, element)} class="cursor-pointer text-red-600 fa-solid fa-trash fa-lg"></i>

              </td>
            </tr>
          </tbody>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No education records found</td>
        </tr>
      )}
    </>
  )

  return (
  
    
    //   <div ref={sectionRef} className=" mx-auto my-10 flex flex-col justify-center ">


    //     {/* Experience line */}
    //     <div className="flex justify-center gap-1 items-center mb-4 ">
    //       {/* <hr className="h-[2px]  w-full bg-black"></hr> */}
    //       <div className="flex  w-full justify-center items-center gap-[1rem]">
    //         <i className="fa-solid fa-file-invoice"></i>
    //         <p className='text-xl'>Experience Details</p>
    //       </div>
    //       {/* <hr className="h-[2px] w-full bg-black"></hr> */}
    //     </div>

    //     {/* table start */}
    //     <div className='flex justify-end mx-3 mb-5'>
    //       <div className="button w-fit ">
    //         <Button name="Add details" handleClick={openModal} />
    //         {isModalOpen && (
    //           <div className="modal-overlay ">
    //             <div className="modal-content text-black ">
    //               <div className='text-end rounded-t-md bg-slate-100 border-2 border-b-0 border-primary'>
    //                 <button onClick={closeModal} className=''><i class="fa-solid fa-xmark"></i></button>
    //               </div>
    //               <div className='rounded-b-md bg-slate-100 p-3 border-2 border-t-0 border-primary my-10 w-[30vw]'>
    //               <div className='border-orange-600 border-2 p-5'>
    //                 <h2 className='text-xl font-semibold text-center' >Add Experience Details</h2>
    //                 {/* name field */}
    //                 <div className='text-start mb-5'>
    //                     <div className='text-center'>
    //                   <p >Experience details</p>
    //                     </div>
    //                     <div className='flex justify-center flex-col '>

    //                   <label for="designation" class="block text-start mb-2 text-sm font-medium text-black ">Designation</label>

    //                   <InputField
    //                     type="text"
    //                     id="designation"
    //                     name="designation"
    //                     value={formValues.designation}
    //                     onChange={handleChange}
    //                     placeholder="employee"
    //                     className='p-2'
    //                   />
    //                   </div>
    //                   {errors.designation && (<p className="text-red-500 text-sm">{errors.designation}</p>)}
    //                 </div>


    //                 {/* website field */}
    //                 <div className='text-start mb-5'>
    //                 <div className='flex justify-center flex-col '>

    //                   <label for="employment" class="block text-start mb-2 text-sm font-medium text-black ">Employment Time</label>


    //                   <InputField
    //                     type="text"
    //                     id="employment"
    //                     name="employment"
    //                     value={formValues.employment}
    //                     onChange={handleChange}
    //                     placeholder="Full Time"
    //                     className='p-2'
    //                   />
    //                   </div>
    //                   {errors.employment && (<p className="text-red-500 text-sm">{errors.employment}</p>)}
    //                 </div>
    //                 {/* website field */}
    //                 <div className='text-start mb-5'>
    //                 <div className='flex justify-center flex-col '>
    //                   <label for="company_name" class="block text-start mb-2 text-sm font-medium text-black ">Company Name</label>
    //                   <InputField
    //                     type="text"
    //                     id="company_name"
    //                     name="company_name"
    //                     value={formValues.company_name}
    //                     className='p-2'
    //                     onChange={handleChange}
    //                     placeholder="Google"
    //                   />
    //                   </div>
    //                   {errors.company_name && (<p className="text-red-500 text-sm">{errors.company_name}</p>)}
    //                 </div>

    //                 {/* website field */}
    //                 <div className='text-start mb-5'>
    //                 <div className='flex justify-center flex-col '>
    //                   <label for="experience_certificate" class="block text-start mb-2 text-sm font-medium text-black ">Experience Certificate</label>
    //                   <InputField
    //                     type="file"
    //                     id="experience_certificate"
    //                     name="experience_certificate"
    //                     onChange={handleChange}
    //                     placeholder="abc.pdf"
    //                     className='p-2'
    //                   />
    //                   </div>
    //                   {errors.experience_certificate && (<p className="text-red-500 text-sm">{errors.experience_certificate}</p>)}
    //                 </div>
    //                 <div className="buttons flex justify-end gap-10">
    //                   <button onClick={closeModal}>Close</button>

    //                   {!isUpdate &&
    //                     <Button
    //                       handleClick={handleAddExperience}
    //                       name="Create New"
    //                     />
    //                   }
    //                   {isUpdate &&
    //                     <Button
    //                       handleClick={handleUpdate}
    //                       name="Update"
    //                     />
    //                   }

    //                 </div>
    //               </div>
    //               </div>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>

    //     {/* education detail design page */}
    //     <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    //       <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
    //         <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
    //           <tr>

    //             <th scope="col" class="px-6 py-3">
    //               Designation
    //             </th>

    //             <th scope="col" class="px-6 py-3">
    //               Employment
    //             </th>
    //             <th scope="col" class="px-6 py-3">
    //               Company Name
    //             </th>

    //             <th scope="col" class="px-6 py-3">
    //               Actions
    //             </th>
    //           </tr>
    //         </thead>

    //         {experiencedEmployee}
    //       </table>
    //     </div>
    //   </div>
    // </>
    <>
    <div ref={sectionRef} className="mx-auto my-10 flex flex-col justify-center">
  {/* Experience line */}
  <div className="flex justify-center gap-1 items-center mb-4">
    <div className="flex w-full justify-center items-center gap-[1rem]">
      <i className="fa-solid fa-file-invoice text-xl"></i>
      <h2 className="text-xl">Experience Details</h2>
    </div>
  </div>

  {/* Table start */}
  <div className="flex justify-end mx-3 mb-5">
    <div className="button w-fit">
      <Button name="Add details" handleClick={openModal} />
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Add Experience Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Designation field */}
                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                    Designation
                  </label>
                  <InputField
                    type="text"
                    id="designation"
                    name="designation"
                    value={formValues.designation}
                    onChange={handleChange}
                    placeholder="Employee"
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                  {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
                </div>

                {/* Employment field */}
                <div className=''>
                  <label htmlFor="employment" className="block text-sm font-medium text-gray-700">
                    Employment Time
                  </label>
                  <InputField
                    type="text"
                    id="employment"
                    name="employment"
                    value={formValues.employment}
                    onChange={handleChange}
                    placeholder="Full Time"
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                  {errors.employment && <p className="text-red-500 text-sm">{errors.employment}</p>}
                </div>

                {/* Company Name field */}
                <div>
                  <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <InputField
                    type="text"
                    id="company_name"
                    name="company_name"
                    value={formValues.company_name}
                    onChange={handleChange}
                    placeholder="Google"
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                  {errors.company_name && <p className="text-red-500 text-sm">{errors.company_name}</p>}
                </div>

                {/* Experience Certificate field */}
                <div>
                  <label htmlFor="experience_certificate" className="block text-sm font-medium text-gray-700">
                    Experience Certificate
                  </label>
                  <InputField
                    type="file"
                    id="experience_certificate"
                    name="experience_certificate"
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                  {errors.experience_certificate && <p className="text-red-500 text-sm">{errors.experience_certificate}</p>}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 p-4 border-t">
              <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Close
              </button>
              {!isUpdate && (
                <Button handleClick={handleAddExperience} name="Create New" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" />
              )}
              {isUpdate && (
                <Button handleClick={handleUpdate} name="Update" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>

  {/* Education detail design page */}
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr className='flex gap-4'>
          <th scope="col" className="px-6 py-3">
            Designation
          </th>
          <th scope="col" className=" py-3">
            Employment
          </th>
          <th scope="col" className="px-6 py-3">
            Company Name
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>{experiencedEmployee}</tbody>
    </table>
  </div>
</div>
    </>
  )
}

export default Experience