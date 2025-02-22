import React, { useState } from "react";
import Logo from "../Components/Logo";
import { useNavigate} from "react-router-dom";
import Button from "../Components/Button";
import InputField from "../Components/InputField";
import FlexboxTechno from "../Components/FlexboxTechno";

const ForgotPassword = () => {
  // const [searchParam]=useSearchParams()
  // const token=searchParam.get('token')

    const navigate = useNavigate();

    const [email,resetEmail]=useState('')
       const changeEmail = (e)=>{
        resetEmail(e.target.value);
        console.log(email)
       }   
       
       
      //  async function handleSubmit(e) {
      //   e.preventDefault();
      //   console.log("Email:", email);
      
      //   // API URL from environment variable
      //   const API_URL = import.meta.env.VITE_API_URL;
      
      //   try {
      //     // Email ko object ke form mein bhejna hoga
      //     const response = await fetch(`${API_URL}/password-resets`, {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //         // 'Accept': "application/json",
      //       },
      //       body: JSON.stringify({ email }), // Object format mein send karo
      //     });
      
      //     // Response ko check karte hain
      //     if (response.ok) {
      //       // const result = await response.json();
      //       console.log("Password reset successful:", result);
      
      //       // Redirect or navigate if needed
      //       // navigate('/reset-password');
      //     // } else {
      //     //   // Agar error hai, toh usko handle karo
      //     //   const errorData = await response.json();
      //     //   console.log("Error from server:", errorData);
      //     //   alert(`Error: ${errorData.message || "Unable to process request"}`);
      //     }
      //   } 
      //   catch (error) {
      //     // Network ya unknown error ko handle karo
      //     console.log("Network error:", error);
      //     alert("Something went wrong! Please try again.");
      //   }
      // }
      
        const handleSubmit = async (e) => {
          e.preventDefault();
      
          // const validationErrors = validateform();
          // setErrors(validationErrors)
      
          try {
                  const API_URL = import.meta.env.VITE_API_URL;

            // post api call
            const response = await fetch(`${API_URL}/password-resets`, {
              method: "POST",
              headers: {
                "Content-Type": "application./json"
                // "Accept": "application/json",
              },
              body: JSON.stringify({ email:`${email}`})
            })
      
            if (!response.ok) {
              const errorData = await response.json();
              console.log("Error:", errorData);
            }
            return;
      
            alert("Password reset email sent!");
          } catch (error) {
            // alert("Network error:", error);
          }

          navigate('/reset-password')
       
      

        }

       
 

  return (
    <>
         <div className=' flex justify-center w-screen '>
        {/* <div className='hidden  visible  w-[50vw] h-screen md:flex justify-center items-center bg-black'>         
           <Logo/>
          <h1 className='font-bold text-xl text-white '>Flexbox Technologies</h1>
        </div> */}
        <FlexboxTechno/>
        {/* right part */}         
          <div className='w-[50vw] h-screen '>
            <div className='w-[100%] h-[100vh] flex justify-center items-center '>
              <div className=' w-[35vw] h-[auto] shadow-2xl flex flex-col gap-5  border-2 border-orange-600 px-5 py-5'>
                <div className='flex justify-center gap-2 items-center mt-[3rem]'>
                   <Logo />
                   <h1 className='font-bold text-xl '>Flexbox Technologies</h1>
                </div>
                <div className='flex  justify-center items-center  text-center  flex-col  gap-3'>
                <h1 className='text-xl'>Reset E-mail</h1>
                <p className=" text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, veritatis lo?</p>
                </div>
                 

                 <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                 
                {/* <label htmlFor="email"
                  className="block  text-lg font-medium text-gray-900 ">Email</label>
                <input type="email" id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  name='email'                   
                  onChange={changeEmail}
                  value={email}
                  required /> */}
                                  
                     
                  <InputField                     
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    type='email'
                    id="Email"
                    name='email'
                    value={email}
                    label='Email'
                    onChange={changeEmail} 
                    required >
                    </InputField>
                     
                  </div>
                <button type="submit"
                onClick={handleSubmit}
                className="w-full rounded-md text-white bg-orange-600 text-sm font-medium  bg-primary text-primary-foreground shadow hover:bg-orange-500 px-4 py-2"
                 
                >Send Me Link</button>                         

                {/* <Button type='submit' name='Send Me Link' handleClick={handleSubmit}></Button> */}
                </div>
                </form>                
              </div>                
            </div> 
          </div>
        </div>
    </>
  );
};

export default ForgotPassword;
