import React, { useEffect, useState } from 'react'
import Logo from '../Components/Logo'
import { data, Link, useSearchParams  } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
 

const EmailVarify = () => {
  // const {token}=useParams()

  const [searchParam]=useSearchParams()
  const token=searchParam.get('token')
  // console.log(token)

   
  const navigate = useNavigate();

   
  const  [email,setEmail]=useState({
    email:''
  })
    

   useEffect(() => {
    // console.log("Token from URL:", token);

    const API_URL = import.meta.env.VITE_API_URL;

    // API call karne ke liye token ka use karein
     fetch(`${API_URL}/email-verification/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })

      .then((res) => res.json())
      .then((res) => setEmail( res.data.email))
      console.log(email)

      // .catch((err) => console.log("Error:", err));
       
  }, []);




    const accept= async()=>{
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API_URL}/email-verification/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:`${email}`}),
    })
      // .then((res) => res.json())
      // .then((data) => console.log("API Response:", data))
      // .catch((err) => console.log("Error:", err));
      navigate('/successemail')
  }
    return (
      
     <>

     
          <div className=' flex justify-center w-screen '>
        <div className='hidden  visible  w-[50vw] h-screen md:flex justify-center items-center bg-black'>

          {/* left part */}
           <Logo/>
          <h1 className='font-bold text-xl text-white '>Flexbox Technologies</h1>
        </div>

        {/* right part */}
         
          <div className='w-[50vw] h-screen '>
            <div className='w-[100%] h-[100vh] flex justify-center items-center '>
              <div className=' w-[35vw] h-[50vh] shadow-2xl flex flex-col gap-5  border-2 border-orange-600 px-5 py-5'>
                <div className='flex justify-center gap-2 items-center mt-[3rem]'>
                   <Logo />
                   <h1 className='font-bold text-xl '>Flexbox Technologies</h1>
                </div>
                <div className='flex  justify-center items-center  text-center  flex-col  gap-3'>
                <h1 className=''>Verify your Email Address</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, veritatis lo?</p>
                </div>
                <div className='flex gap-2'>
                <button type="submit"
                className="w-full rounded-md text-black border-2 border-orange-600 text-sm font-medium  bg-primary -foreground shadow hover:bg-orange-500 px-3 py-2 hover:text-white"                                 
                >DECLINE</button>
                {/* <Button type='submit' name='DECLINE' ></Button>  */}
                {/* <button type="submit" 
                onClick={accept}
                className="w-full rounded-md text-white bg-orange-600 text-sm font-medium  bg-primary text-primary-foreground shadow hover:bg-orange-500 px-3 py-2"                                 
                >ACCEPT</button> */}
                  <Button type='submit' handleClick={accept} name='ACCEPT' ></Button>
                </div>
              </div>                
            </div> 
          </div>
        </div>
     </>
  )
}     


export default EmailVarify
