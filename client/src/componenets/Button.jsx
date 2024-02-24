import React from 'react'

const Button = (
    {children, label, color, width, height, fontSize, rounded, weight, px, py, handleClick}
) => {
  return (
    <button className={`${color? color: 'bg-accent'} ${width&& width} ${height&& height}
      ${px?px:'px-6'} ${py?py:'py-2'} ${rounded ? rounded : 'rounded-lg'} ${fontSize? fontSize : 'text-lg'} ${weight && weight} font-inter text-white shadow-xl
      `}
      onClick={handleClick}
      >
        {label}
    </button>
  )
}

export default Button