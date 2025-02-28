import React, { useEffect, useRef, useState } from 'react'
import Button from '../Components/Button' 
import { useLocation } from 'react-router-dom'
import InputField from '../Components/InputField'

const Education = () => {

  // data state 
  const [data, setData] = useState([])

  // form values state 
  const [formValues, setFormValues] = useState({
    school: "",
    degree: "",
    study: "",
    grade: ""
  })

  // is modal open state
  const [isModalOpen, setIsModalOpen] = useState(false)

  // is update state
  const [isUpdate, setIsUpdate] = useState(false)

  // education id state
  const [educationId, setEducationId] = useState(null)

  // errors state
  const [errors, setErrors] = useState({})

  // open modal function
  const openModal = (e, education) => {
    e.preventDefault()
    setIsModalOpen(true)

    if (education) {
      setIsUpdate(true)
      setFormValues({
        school: education.school,                        
        degree: education.degree,                        
        study: education.study,                        
        grade: education.grade,                        
      })
      setEducationId(education.id)
    }
    else {
      setIsUpdate(false)

      setFormValues({
        school: "",
        degree: "",
        study: "",
        grade: "",
      })
    }
  }

  // close modal function
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // handle change function
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
    console.log(formValues)

    // setting image
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  }

  
  // form validation
  const validateForm = () => {
    const errors = {}

    if ((formValues.school).trim() === "") {
      errors.school = "School name is required"
    }
    if ((formValues.degree).trim() === "") {
      errors.degree = "Degree field is required"
    }
    if ((formValues.study).trim() === "") {
      errors.study = "Study field is required"
    }
    if ((formValues.grade).trim() === "") {
      errors.grade = "Grade field is required"
    }
    return errors
  }

  // handle add education details function
  const handleAddEducationDetails = async (e) => {

    e.preventDefault()

    // checking errors
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {

        // POST api call for creating education detail
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/educations/create`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            school: formValues.school,
            degree: formValues.degree,
            study: formValues.study,
            grade: formValues.grade
          })
        })
        const result = await response.json()


        if (result.data) {
          const newData = [...data, result.data];
          setData(newData);

          // Save all education details in Local Storage
          // localStorage.setItem("educationData", JSON.stringify(newData));
        }


        closeModal()
        const educationId = result.data.id
        localStorage.setItem("educationid", educationId)

      }
      catch (error) {
        console.log("error occured:", error)
      }
    }
  }


  useEffect(() => {
    const educationid = localStorage.getItem("educationid")
    setEducationId(educationid)


    const fetchEducationDetails = async () => {
      try {
        // GET api call 
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/educations`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
        const result = await response.json()   

        setData(result.data);

      }
      catch (error) {
        alert(error)
      }
    }
    fetchEducationDetails();
  }, [])

  // handle delete function
  const handleDelete = async (e, element) => {
    e.preventDefault()

    try {
      // DELETE api call 
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/educations/${element.id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify()
      })

      // updating current data  
      if (response.ok) {
        setData((prevData) => prevData.filter(edu => edu.id !== element.id))
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  const handleUpdate = async () => {
    try {
        const API_URL = import.meta.env.VITE_API_URL;
       const response = await fetch(`${API_URL}/educations/${educationId}`, {
        method: "PATCH",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
          school: formValues.school,
          degree: formValues.degree,
          study: formValues.study,
          grade: formValues.grade
        })
      })
      const result = await response.json()

      if (response.ok) {
        setData((prevData) =>
          prevData.map((edu) =>
            edu.id === educationId ? { ...edu, ...formValues } : edu
          )
        );

        closeModal();
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  // display data 
  let educationData = (
    <>
      {data.length > 0 ? (
        data.map((element) => (
          <tbody>
            {/* rows */}
            <tr className="bg-white border-b text-black  border-gray-200 hover:bg-gray-50  
            flex justify-center items-center gap-6">

              {/* school field */}
              <td class="px-6 py-4  ">
                {element.school}
              </td>

              {/* degree field */}
              <td class="px-6 py-4">
                {element.degree}

              </td>
              {/* study field */}
              <td class="px-6 py-4">
                {element.study}

                {/* grade field */}
              </td>
              <td class="px-6 py-4">
                {element.grade}

              </td>


              {/* button field */}
              <td class="flex items-center px-6 gap-3 py-4">

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

  const sectionRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("education")) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
    // <>
    //   <div ref={sectionRef} className=" mx-auto my-10 flex flex-col justify-center ">


    //     {/* basic profile line */}
    //     {/* <div className="flex justify-center gap-1 items-center mb-4">
    //       <hr className="h-[2px]  w-full bg-black"></hr>
    //       <div className="flex  w-full justify-center items-center gap-3">
    //         <i className="fa-solid fa-file-invoice"></i>
    //         <p>Education Details</p>
    //       </div>
    //       <hr className="h-[2px] w-full bg-black"></hr>
    //     </div> */}
    //       <div className="p-[10px] mt-[1rem] flex  items-center  justify-center">
        
    //     {/* <hr className="bg-black h-[3px] w-[1vw]"/> */}
    //     <div className='w-[8%]'>
    //     <i className="fa-solid fa-file-invoice"></i>
    //     </div>
    //       <h2 className='text-xl'>Education Details</h2>
    //       {/* <hr className="bg-black h-[3px] w-[15vw]"/> */}
           
    //     </div>

    //     {/* table start */}
    //     <div className='flex justify-end mx-3 mb-5'>
    //       <div className="button w-fit ">
    //         {/* <div className='flex justify-end w-[50vw]'> */}
    //             <div className=''>
    //         <Button name="Add details"  className="w-40" handleClick={openModal} />               
    //                 {/* </div>                                */}
                 
    //         </div>
    //         {isModalOpen && (
    //           <div className="modal-overlay ">
    //             <div className="modal-content text-black ">
    //               <div className='text-end rounded-t-md bg-slate-100 border-2 '>
    //                 {/* <Button handleClick={closeModal}  name='close'><i class="fa-solid fa-xmark"></i></Button> */}
    //                 {/* <button  onClick={closeModal} className='mt-5'>X</button> */}
    //               </div>
    //               <div className='flex justify-center flex-col w-[40vw] items-center my-10'>                    
    //               <div className='rounded-b-md bg-slate-100 p-5 border-2 border-t-0 border-primary w-[30vw]  '>
    //                 <div className='border-orange-600 border-2 p-5'>
    //                 <h2 className='text-xl font-semibold text-center' >Add Education Details</h2>

    //                 {/* name field */}
    //                 <div className='text-center mb-5'>
    //                   <p className='text-center'>Education details</p>
    //                   <div className='flex flex-col justify-center'>
    //                   <label for="school" class="block text-start mb-2 text-sm  text-black font-bold">School</label>

    //                   <InputField
    //                     type="school"
    //                     id="school"
    //                     name="school"
    //                     value={formValues.school}
    //                     onChange={handleChange}            
    //                     placeholder="school name"
    //                      className='p-2 '
    //                   />
    //                   </div>
    //                   {errors.school && <p className='text-sm text-red-600'>{'*' + errors.school}</p>}
    //                 </div>


    //                 {/* website field */}
    //                 <div className='text-center mb-5'>
    //                     <div className='flex justify-center flex-col '>
    //                   <label for="degree" class="block text-start mb-2 text-sm font-medium text-black font-bold">Degree</label>
    //                   <InputField
    //                     type="degree"
    //                     id="degree"
    //                     name="degree"
    //                     value={formValues.degree || data.degree}
    //                     onChange={handleChange}
    //                     placeholder="Master"
    //                     className='p-2'
    //                   />
    //                   </div>
    //                   {errors.degree && <p className='my-0 text-sm text-red-600'>{'*' + errors.degree}</p>}
    //                 </div>
    //                 {/* website field */}
    //                 <div className='text-center mb-5'>
    //                     <div className='flex justify-center flex-col'>

    //                   <label for="study" class="block text-start mb-2 text-sm font-medium text-black font-bold">Study</label>

    //                   <InputField
    //                     type="study"
    //                     id="study"
    //                     name="study"
    //                     value={formValues.study}
    //                     onChange={handleChange}
    //                     placeholder="MCA"
    //                     className='p-2'
    //                   />
    //                   </div>
    //                   {errors.study && <p className='text-sm text-red-600'>{'*' + errors.study}</p>}
    //                 </div>

    //                 {/* website field */}
    //                 <div className='text-center mb-5'>
    //                     <div className='flex justify-end flex-col'>

    //                   <label for="grade" class="block text-start mb-2 text-sm font-medium text-black ">Grade</label>

    //                   <InputField
    //                     type="grade"
    //                     id="grade"
    //                     name="grade"
    //                     value={formValues.grade}
    //                     onChange={handleChange}
    //                     placeholder="grade A+"
    //                     className='p-2'
    //                   />
    //                   </div>
    //                   {errors.grade && <p className='text-sm text-red-600'>{'*' + errors.grade}</p>}
    //                 </div>
    //                 <div className="buttons flex justify-end gap-6">
    //                   <button onClick={closeModal}>Close</button>

    //                   {!isUpdate &&
    //                     <Button
    //                       handleClick={handleAddEducationDetails}
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

    //                 </div>
    //                </div>

    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>
        
    //     {/* education detail design page */}
    //     <div className='flex justify-center items-center w-[100%]'>
    //     <div class="relative overflow-x-auto shadow-xl sm:rounded-lg ">
    //       <table class=" text-sm text-left rtl:text-right text-gray-500 justify-center items-center  mx-auto">
    //         <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
    //           <tr>

    //             <th scope="col" class="px-6 py-3">
    //               {/* school: "", 
    //               degree: "", 
    //               study: "", 
    //               grade: "" */}
    //               <h2>School</h2>
    //             </th>

    //             <th scope="col" class="px-6 py-3">
    //               Degree
    //             </th>
    //             <th scope="col" class="px-6 py-3">
    //               Study
    //             </th>

    //             <th scope="col" class="px-6 py-3">
    //               grade
    //             </th>
    //             <th scope="col" class="px-6 py-3">
    //              Status
    //             </th>
    //           </tr>
    //         </thead>
    //         {educationData}
    //       </table>
    //     </div>
    //     <div/>
    //   </div>
    //               </div>


      
    // </>
    <>
    <div ref={sectionRef} className="mx-auto my-10 flex flex-col justify-center">
  {/* Basic profile line */}
  <div className="p-[10px] mt-[0rem] flex items-center justify-center">
    <div className=" flex gap-10 w-[8%] ">
      <i className="fa-solid fa-file-invoice text-xl"></i>
    </div>
    <h2 className="text-xl">Education Details</h2>
  </div>

  {/* Table start */}
  <div className="flex justify-end mx-3 my-5 w-[35vw]">   
    <div className="button ">
      <Button name="Add details" className="w-40" handleClick={openModal} />
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Add Education Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-4">
                {/* School Field */}
                <div>
                  <label htmlFor="school" className="block text-sm font-medium text-gray-700 font-bold">
                    School
                  </label>
                  <InputField
                    type="text"
                    id="school"
                    name="school"
                    value={formValues.school}
                    onChange={handleChange}
                    placeholder="School Name"
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                  {errors.school && <p className="text-sm text-red-600">{'*' + errors.school}</p>}
                </div>

                {/* Degree Field */}
                <div>
                  <label htmlFor="degree" className="block text-sm font-medium text-gray-700 font-bold">
                    Degree
                  </label>
                  <InputField
                    type="text"
                    id="degree"
                    name="degree"
                    value={formValues.degree || data.degree}
                    onChange={handleChange}
                    placeholder="Master"
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                  {errors.degree && <p className="text-sm text-red-600">{'*' + errors.degree}</p>}
                </div>

                {/* Study Field */}
                <div>
                  <label htmlFor="study" className="block text-sm font-medium text-gray-700 font-bold">
                    Study
                  </label>
                  <InputField
                    type="text"
                    id="study"
                    name="study"
                    value={formValues.study}
                    onChange={handleChange}
                    placeholder="MCA"
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                  {errors.study && <p className="text-sm text-red-600">{'*' + errors.study}</p>}
                </div>

                {/* Grade Field */}
                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                    Grade
                  </label>
                  <InputField
                    type="text"
                    id="grade"
                    name="grade"
                    value={formValues.grade}
                    onChange={handleChange}
                    placeholder="Grade A+"
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                  {errors.grade && <p className="text-sm text-red-600">{'*' + errors.grade}</p>}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-4 p-4 border-t">
              <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Close
              </button>
              {!isUpdate && (
                <Button
                  handleClick={handleAddEducationDetails}
                  name="Create New"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                />
              )}
              {isUpdate && (
                <Button
                  handleClick={handleUpdate}
                  name="Update"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>

  {/* Education detail design page */}
  <div className="flex justify-center items-center w-full">
    <div className="relative overflow-x-auto shadow-xl sm:rounded-lg  max-w-4xl">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr className='flex '>
            <th scope="col" className="px-6 py-3">
              School
            </th>
            <th scope="col" className="px-6 py-3">
              Degree
            </th>
            <th scope="col" className="px-6 py-3">
              Study
            </th>
            <th scope="col" className="px-6 py-3">
              Grade
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>{educationData}</tbody>
      </table>
    </div>
  </div>
</div>
    </>
  )
}

export default Education