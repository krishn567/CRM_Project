  
import React, { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import Logo from "../Components/Logo";
import Button from "../Components/Button";
// import AcceptInvitation from "../Components/AcceptInvitation";
import InputField from "../Components/InputField";
import FlexboxTechno from "../Components/FlexboxTechno";

const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  
  
  // const [Data,SetData]=useState({
  //   user_id:''
  // })

    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.email || !formValues.password) {
      return alert("Both email and password are required!");
    }
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/auth/session/sign-in`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
         
        body: JSON.stringify({
                    email: `${formValues.email}`,
                    password: `${formValues.password}`,
                  }),
      });

      if (response.ok) {
        // alert("Login Successfull");                 
            const result=await response.json()
            console.log("result:",  result)            
           const demo = fetchworckspace(result.data.user_id)
          //  console.log("demo:", demo)
          const userId = result.data.user_id
          console.log(userId);
          
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Something went wrong.");
      }
      
    } catch (error) {
      console.error("Error during login:", error);
      alert("Failed to login. Please try again.");
    }
  };
  
  const fetchworckspace = async (userId) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/users/${userId}/workspaces`, {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      const newResponse = await response.json();
      
    //   if (newResponse.data.user_id) {   
      //     console.log("ID saved in localStorage:", newResponse.data.user_id);
      // } else {
        //     console.log("ID not found in response");
        // }
            localStorage.setItem("userId", `${userId}`);
            console.log(localStorage.getItem("userId"));
            
            // localStorage.setItem("demoid", `${demoid}`);
            // console.log(localStorage.getItem("demoid"));
            
        
      const newarray=(newResponse.data[0]);
      console.log(newResponse.workspace_id)
      if (newarray && newarray.workspace_id) {                
        // const storedWorkspaceId = localStorage.getItem("workspaceId");
        console.log("Workspace ID stored:", newarray.workspaceId);
      } else {
        console.error("Workspace ID not found!");
      }
      
      console.log("Workspace fetched successfully:", newResponse.data?.length);
      const allNull = newResponse.data.every((item) => item.user_id === null);
      
      if (response.ok) {
        const workspaceid = localStorage.getItem("workspaceid")
        console.log(workspaceid)
        if (newResponse.data?.length === 0) {
          navigate("/workspacepage");
        }
        else if (allNull){
          navigate("/worksspaceall",{ state: {workspaceId:newarray.workspace_id}});
          // navigate(`/worksspaceall/${workspaceId}`);
        }
        else{
              navigate(`/home/${newarray.workspace_id}`);

        }
        //  else {
        //   if (allNull) {
            
        //     navigate("/worksspaceall");
        //   } else {
        //     navigate("/dashboard");
        //   }
        // }
      } 
      // else {
      //   console.error("Error fetching workspace data");
      //   alert("Failed to fetch workspace data.");
      // }
    } catch (error) {
      console.error("Error during workspace fetch:", error);
      alert("Something went wrong while fetching workspace.");
    }
  };

  return (
    <>
      <div className="flex justify-center w-screen mx-auto">
        {/* <div
          className="hidden md:visible w-1/2 h-screen md:flex justify-center items-center"
          style={{ backgroundColor: "#181818" }}
        >
          <Logo />
          <h1 className="font-bold text-xl text-white">Flexbox Technologies</h1>
        </div> */}
        <FlexboxTechno/>
        <div className="w-full h-screen md:w-1/2 flex justify-center items-center">
          <div className="w-[90%] md:w-[75%] mx-auto">
            <div className="flex justify-center items-center flex-col">
              <h1 className="font-semibold text-2xl tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to login your account
              </p>
            </div>

            <form className="max-w-sm mx-auto my-4" onSubmit={handleSubmit}>
              <div className="mb-5">
                {/* <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                /> */}
                  <InputField
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                    type='email'
                    id="email"
                    name='email'
                    value={formValues.email}
                    label="Email"
                    onChange={handleChange} 
                    required>
                    </InputField>
              </div>

              <div className="mb-5">
                {/* <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  required

                /> */
                <InputField
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                    type='password'
                    id="password"
                    name='password'
                    value={formValues.password}
                    label="password"
                    onChange={handleChange} 
                    required>
                    </InputField>
                }
                 
              </div>
              
          
              <div className="flex justify-between">
                <div className="flex items-start mb-5">
                  <label
                    htmlFor="remember_me"
                    className="inline-flex items-center"
                  >
                    <input
                      id="remember_me"
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                      name="remember"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                </div>

                <Link
                  to="/login/forgotpassword"
                  className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md"
                >
                  Forgot your password?
                </Link>
              </div>
              <Button type="submit" handleClick={handleSubmit} name="Sign in" />

              <div className="flex justify-evenly items-center my-4">
                <span className="text-sm text-gray-600">
                  Don't have an account?
                </span>
                <Link
                  to="/sign-up"
                  className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md"
                >
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;

