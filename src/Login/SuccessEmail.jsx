import React from 'react'
import Logo from '../Components/Logo'
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

const SuccessEmail = () => {
const navigate = useNavigate();
  const Success=()=>{
   navigate('/')
    
  }
  return (
    <>
      <div className=' flex justify-center w-screen '>
        <div className='hidden md:visible w-[50vw] h-screen md:flex justify-center items-center bg-black'>

          {/* left part */}
           <Logo/>
          <h1 className='font-bold text-xl text-white '>Flexbox Technologies</h1>
        </div>

        {/* right part */}
         
          <div className='w-[50vw] h-full'>
            <div className='w-[100%] h-[100vh] flex justify-center items-center '>
              <div className=' w-[25vw]  shadow-2xl flex flex-col gap-5  border-2 border-orange-600 px-5 py-5'>
                <div className='flex justify-center gap-2 items-center mt-[3rem]'>
                    <Logo/>
                   <h1 className='font-bold text-xl '>Flexbox Technologies</h1>
                </div>
                <div className='flex  justify-center items-center  text-center  flex-col  gap-3'>
                  <h1 className='font-bold'>SUCCESS !</h1>
                <h1 className='font-semibold'>You've been verified your email address!</h1>
                <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                </div>
                <div className='flex'>                 
                {/* <button type="submit"
                onClick={Success}
                className="w-[30vw] rounded-md text-white bg-orange-600 text-sm font-medium  bg-primary text-primary-foreground shadow hover:bg-orange-500 px-3 py-2"                                 
                >SIGN IN</button> */}
                 <Button type='submit' handleClick={Success} name='SIGN IN'></Button>
                </div>
              </div>                
            </div> 
          </div>
        </div>
    </>
  )
}

export default SuccessEmail
