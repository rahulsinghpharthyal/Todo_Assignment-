import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Title always visible */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
          <Link to="/" className="text-2xl font-bold text-black">
            TODO
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
