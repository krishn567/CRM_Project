 import React from 'react'
 
 const InputField = ({name,value,label,placeholder,type,onChange,className,id}) => {
   return (
     <>
     {label && <label htmlFor='input'>{label}</label>}
     <input 
     type={type}
     id={id}
     value={value}
     name={name}
     placeholder={placeholder}
     className={className}
     onChange={onChange}></input>     
     
     </>
   )
 }
 
 export default InputField
 