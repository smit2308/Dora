import React from 'react'

const Button = (
    {children,type, label, color, width, height, fontSize, rounded, weight, px, py, handleClick}
) => {
  return (
    <button className={`${color? color: 'bg-accent text-white'} ${width&& width} ${height&& height}
      ${px?px:'px-6'} ${py?py:'py-2'} ${rounded ? rounded : 'rounded-lg'} ${fontSize? fontSize : 'text-lg'} ${weight && weight} font-inter  shadow-xl
      `}
      onClick={handleClick}
      type={type? type: 'button'}
      >
        {label}
    </button>
  )
}

export default Button