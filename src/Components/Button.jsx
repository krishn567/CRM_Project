import React from 'react'

const Button = (props) => {
  return (
     <>
        <button type={props.type}        
                className="w-full rounded-md text-white bg-orange-600 text-sm font-medium  bg-primary text-primary-foreground shadow hover:bg-orange-500 px-4 py-2"
                onClick={props.handleClick}                
                > {props.name}  
                </button>
     </>
  )
}

export default Button
