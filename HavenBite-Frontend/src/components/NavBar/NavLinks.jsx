import React from 'react'
import {Link} from 'react-router-dom'

const NavLinks = ({isMobile = false}) => {
 const baseStyle = "text-gray-600 hover:text-gray-900 transition";

  return (
    <div
      className={
        isMobile
          ? "flex flex-col space-y-4"
          : "hidden md:flex items-center space-x-8"
      }
    >
      {/* <a href="#" className={baseStyle}>
        How It Works
      </a>
      <a href="#" className={baseStyle}>
        Substitutions
      </a> */}
      
     
      <Link to='/' className={baseStyle}>
        Home
      </Link>
       <Link to='/about' className={baseStyle}>
        About
      </Link>
    </div>
  );
}

export default NavLinks