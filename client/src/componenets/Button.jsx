import React from 'react'

const Button = (
    {children, onClick, label, color, width, height, fontSize, rounded, weight, px, py}
) => {
  return (
    <button className={`${color? color: 'bg-accent'} ${width? width : 'w-auto'} ${height? height : 'h-auto'}
      ${px?px:'px-6'} ${py?py:'py-2'} rounded-xl ${fontSize? fontSize : 'text-lg'} ${weight && weight} font-inter text-white shadow-lg`}>
        {label}
    </button>
  )
}

export default Button