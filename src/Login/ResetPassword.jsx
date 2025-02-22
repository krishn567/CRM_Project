import React, { useEffect, useState } from 'react'
import Logo from '../Components/Logo'
import Button from '../Components/Button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import InputField from '../Components/InputField'
import FlexboxTechno from '../Components/FlexboxTechno'


const ResetPassword = () => {
  const navigate = useNavigate();  

  const [changepass ,ResetPassword] =useState({
    password:'',
    confirmPassword: ''     
  })
  const [Email,setEmail]=useState('')
  const [User,SetUser]=useState('')
  // const(Password,SetPassword)=useState('')

  
  const [searchParam]=useSearchParams()
  const token=searchParam.get('token')
  console.log(token)
  const [errors,setErrors] = useState({})


   const handleChange = (e)=>{
    const { name, value } = e.target
    // ResetPassword(e.target.value)
    ResetPassword({ ...changepass, [name]: value })
    console.log(changepass);
   }

   const validateForm =()=>{

    const errors ={}
   
    if(!changepass.password ){
      errors.password='passworsdd is required'
    }
    if(!changepass.confirmPassword){
      errors.confirmPassword='ConfirmPassword is required'

    }
      else if(changepass.confirmPassword !== changepass.password){
        errors.confirmPassword='Both Password must be match'
    }
    // else {
    //   alert('Successfully changed password')

    // }
    return errors;
  }
    
  // console.log("Token from URL:", token);
  useEffect(() => {
    
    const API_URL = import.meta.env.VITE_API_URL;

    // API call karne ke liye token ka use karein
     fetch(`${API_URL}/password-resets/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify()
    })
    .then(res => res.json())
    .then(res => {
      SetUser(res.data.user)
      setEmail(res.data.email)
       
      console.log(User)
      console.log(Email)
    }
   )
     
        //  console.log(res)        
     
       
      // .catch((err) => console.log("Error:", err));       
  },[]);

      const handleSubmit = async (e)=>{
      e.preventDefault()
        // console.log(changepass)
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
          alert("Successfully changed password!");
          console.log("Password changed:", changepass);
        }
           

          // try {
                const API_URL = import.meta.env.VITE_API_URL;

            // post api call
            const response = await fetch(`${API_URL}/users/${User}`, {
              method: "POST",
              headers: {
                "Content-Type": "application./json"
                // "Accept": "application/json",
              },
              body: JSON.stringify({
                password_reset_token: token,
                password: changepass.password
              })
              
            })
            // then((res)=> (res.json()))
            //    .then((res)=>console.log(res))
      
            if (!response.ok) {
              const errorData = await response.json();
              console.log("Error:", errorData);
            }
            navigate('/successemail')
            return;
      
            alert("Password reset email sent!");
          // } catch (error) {
          //   // alert("Network error:", error);
          // }

       
        
                                   
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
                <h1 className='text-xl'>Change Your Password</h1>
                <p className=" text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, veritatis lo?</p>
                </div>
                 

                 <form 
                 onSubmit={handleSubmit}
                 >
                <div className="flex flex-col gap-6">

                   
                    <div className="flex flex-col gap-5">
                 
                
                {/* <label htmlFor="password" className="block  text-sm font-medium text-gray-900 ">Set New Password</label>
                <input type="password" id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name='password'
                  value={changepass.password}
                  onChange={handleChange}
                  // required 
                  /> */}
                  <InputField
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type='password'
                    id="password"
                    name='password'
                    value={changepass.password}
                    label="password"
                    onChange={handleChange} >
                  </InputField>
                  {errors.password && <p className='text-red-600'>{'*' +errors.password}</p>}

             
                {/* <label htmlFor="confirmPassword" className="block  text-sm font-medium text-gray-900 ">Confirm Password</label>
                <input type="password" id="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name='confirmPassword'
                  value={changepass.confirmPassword}
                  onChange={handleChange}  
                  
                  // required 
                  /> */}
                     <InputField
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type='password'
                    id="confirmPassword"
                    name='confirmPassword'
                    value={changepass.confirmPassword}
                    label="Confirm Password"
                    onChange={handleChange} >
                  </InputField>

                  {errors.confirmPassword && <p className='text-red-600'>{'*' +errors.confirmPassword}</p>}
                                           
                  </div>
                <button type="submit"
                 onClick={handleSubmit}            
                className="w-full rounded-md text-white bg-orange-600 text-sm font-medium  bg-primary text-primary-foreground shadow hover:bg-orange-500 px-4 py-2"
                                           
                >Change Password</button>                                

                {/* <Button type='submit' name='Change Password'></Button> */}
                </div>
                </form>                
              </div>                
            </div> 
          </div>
        </div>
    </>
  )
}
  export default ResetPassword 
 