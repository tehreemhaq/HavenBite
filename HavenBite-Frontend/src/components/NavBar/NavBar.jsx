import React , {useState} from 'react'
import { Menu, X } from "lucide-react";
import NavAuthBtns from './NavAuthBtns'
import NavLinks from './NavLinks'
import Logo from '../Logo'
const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#FAF9F3] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <Logo />
          <NavLinks />
          <NavAuthBtns />

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          <NavLinks isMobile />
          <NavAuthBtns isMobile />
        </div>
      )}
    </nav>
  )
}

export default NavBar