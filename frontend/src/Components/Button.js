import React from 'react'

const Button = ({buttonText, handleClick}) => {
  return (
    <button className = "m-4 p-2 bg-[#DA4453] hover:bg-[#c33342] text-[#ffdde1] font-serif rounded-md" onClick={handleClick}>{buttonText}</button>
  )
}

export default Button