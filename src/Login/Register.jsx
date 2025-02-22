import React from "react";
import Logo from "../Components/Logo";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";
import FlexboxTechno from "../Components/FlexboxTechno";

const Register = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    // confirmPassword:""
  });

  const [errors, setErrors] = useState({});

  // getting data from whole form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // form validation
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // firstname validation
    if (!formValues.first_name) {
      errors.first_name = "firstname is required.";
    }

    // lastname validation
    if (!formValues.last_name) {
      errors.last_name = "lastname is required.";
    }

    // email validation
    if (!formValues.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formValues.email)) {
      errors.email = "invalid email format.";
    }

    // password validation
    if (!formValues.password) {
      errors.password = "Please enter a valid password.";
    } else if (formValues.password.length < 6) {
      errors.password = "Please enter at least 6 character";
    }
    // confirm password
    // if(formValues.confirmPassword !== formValues.password){
    //     errors.confirmPassword = "Password do not match."
    // }

    return errors;
  };
  // const Emailv = ()=>{
  //      navigate('/emailvarify')

  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formValues);

    // calling function and storing all errors
    const validationErrors = validateForm();
    setErrors(validationErrors);
    // Navigate

    if (Object.keys(validationErrors).length === 0) {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        // const endpoint = "/auth/session/sign-up";
        // console.log(apiUrl)

        const response = await fetch(`${API_URL}/auth/session/sign-up`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: `${formValues.first_name}`,
            last_name: `${formValues.last_name}`,
            email: `${formValues.email}`,
            password: `${formValues.password}`,
          }),
        });

        console.log("Response:", response);

        if (response.ok) {
          alert("Registration Successfull");
          navigate("/login");
        } else {
          const errorData = await response.json();
          console.log("Error:", errorData);
          alert(errorData.message || "Something went wrong");
          alert("Registration not successfull");
        }
      } catch (error) {
        alert("Error occured while submitting form");
      }
    }
  };

  return (
    <>
      <div className=" flex justify-center w-[100vw] mx-auto">
        {/* <div className='hidden md:visible w-1/2 h-screen md:flex justify-center items-center bg-[#181818]'>      
                    <Logo />
                    <h1 className='font-bold text-xl text-white'>Flexbox Technologies</h1>

                </div>
                 */}
        
        <FlexboxTechno/>
                 {/* right part */}
        <div className="w-full md:w-1/2 flex h-screen justify-center items-center">
          <div className="w-[90%] mx-auto">
            {/* header */}
            <div className="flex justify-center items-center flex-col gap-2 ">
              <h1 className="font-semibold text-2xl tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to create new account
              </p>
            </div>

            <form
              className="md:w-[70%] mx-auto flex justify-between  flex-col gap-8 my-4"
              onSubmit={handleSubmit}
            >
              <div className="fullname flex justify-between gap-4">
                {/* firstname field */}
                <div className="w-1/2 firstname">
                  {/* <label htmlFor="first_name" className="block mb-1 text-sm font-medium text-gray-900 ">Firstname</label>
                                    
                                    <input type="text" id="first_name" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-1" 
                                        name='first_name' 
                                        value={formValues.first_name} 
                                        onChange={handleChange} required /> */}

                  <InputField
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formValues.first_name}
                    label="Firstname"
                    onChange={handleChange}
                    required
                  ></InputField>
                  {errors.firstname && (
                    <p className="text-red-700">{"*" + errors.first_name}</p>
                  )}
                </div>

                {/* lastname field */}
                <div className="w-1/2 last_name">
                  {/* <label htmlFor="last_name" className="block mb-1 text-sm font-medium text-gray-900 ">Lastname</label>
                                    
                                    <input type="text" id="last_name" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" 
                                        name='last_name' 
                                        value={formValues.last_name} 
                                        onChange={handleChange} required /> */}

                  <InputField
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formValues.last_name}
                    label="Lastname"
                    onChange={handleChange}
                    required
                  ></InputField>

                  {errors.lastname && (
                    <p className="text-red-600">{"*" + errors.lastname}</p>
                  )}
                </div>
              </div>

              {/* email field */}
              <div>
                {/* <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 ">Email</label>
                                
                                <input type="email" id="email" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" 
                                    name='email' 
                                    value={formValues.email} 
                                    onChange={handleChange} required /> */}
                <InputField
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email}
                  label="email"
                  onChange={handleChange}
                  required
                ></InputField>
                {errors.email && (
                  <p className="text-red-600">{"*" + errors.email}</p>
                )}
              </div>

              {/* password field */}
              <div>
                {/* <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" id="password" 
                                name='password'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" onChange={handleChange} required />
                                {errors.password && <p className='text-red-600'>{'*' +errors.password}</p>} */}
                <InputField
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
                  type="password"
                  id="password"
                  name="password"
                  value={formValues.password}
                  label="password"
                  onChange={handleChange}
                  required
                ></InputField>
              </div>

              {/* confirm password field */}
              {/* <div className="">
                            
                                <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-900 ">Confirm Password</label>
                                <input type="password" id="confirmPassword" 
                                name='confirmPassword'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  block w-full p-1" onChange={handleChange} required />
                                {errors.confirmPassword && <p className='text-red-600'> {'*' +errors.confirmPassword}</p>}
                            </div> */}

              {/* Sign in button field */}
              {/* <button type="submit" className="w-full rounded-md text-white bg-orange-600 text-sm font-medium  bg-primary text-primary-foreground shadow hover:bg-orange-500 px-4 py-2" >Sign Up</button> */}

              <Button name="Sign Up" type="submit" color="red" />

              {/* sign in link footer field */}
              <div className="flex justify-center gap-4  items-center my-4">
                <span className="text-sm text-gray-600">
                  Already have an account?
                </span>
                <Link
                  to="/login"
                  className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
