/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}'
  ],

  theme: {

    fontSize: {
      xs: '12px',
      sm: '16px',
      lg: '20px',
      xl: '24px', 
      '2xl': '32px',
      '3xl': '40px',
      '4xl': '48px',
      '5xl': '60px',
      '6xl': '72px',
      '7xl': '80px',
    },
    

    extend: {

      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'grotesk': ['"Familjen Grotesk"', 'sans-serif'],
      },

      colors: {
        'primary': "#F1F1F1",
        "secondary": "#333333",
        "accent": "#b7404b",
      },

      boxShadow: {
         'element1': "0px 12px 42px -4px rgba(24, 39, 75, 0.12)",
         'element2': "0px 8px 18px -6px rgba(24, 39, 75, 0.12)",
          'image1': "7px 11px 27.3px 8px rgba(0, 0, 0, 0.20)",
          'image2' : "4px 6px 15.9px 4px rgba(0, 0, 0, 0.18)",
          'inner': " 0px 0px 35px 6px rgba(0, 0, 0, 0.25) inset; "
      },

      screens: {
        
        'xs': '480px',

        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
         '>md': '769px', 
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1440px', 
        // => @media (min-width: 1440px) { ... }

        
    },
  },
},
  plugins: [

  ],
}

