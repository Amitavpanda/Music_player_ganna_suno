import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { RiCloseCircleFill } from "react-icons/ri";
import {HiOutlineMenu} from "react-icons/hi";
import logo from "../assets/logo.png";
import { links } from "../assets/constants";

const NavLinks = () => {
  return (
    <div className="mt-10">
      {links.map((item) => (
        <NavLink
          key={item.name}
          className="flex flex-row justify-start
      items-center my-8"
        >
          <item.icon className="bg-white text-backgroundColor rounded-full hover:text-white hover:bg-skyColor mr-5 w-6 h-6 " />
          <div className="bg-white text-backgroundColor rounded-lg hover:text-white hover:bg-skyColor px-4 py-2 font-bold">
            <Link to={item.to} >{item.name}</Link>
            
          </div>
        </NavLink>
      ))}
    </div>
  );
};

function SideBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="md:flex hidden flex-col  items-center w-[240px] py-10 px-4 bg-gradient-to-br from-[#121212] to-backgroundColor">
        <img alt="logo" src={logo} className="w-full h-40 object-contain" />
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-6 right-3">
        {
          mobileMenuOpen ? (
            <RiCloseCircleFill className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(false)}/>
          ) : 
            <HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(true)}/>
        }
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-tl from-white/10 to-backgroundColor backdrop-blur-lg z-10 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
      <img alt="logo" src={logo} className="w-full h-40 object-contain" />
        <NavLinks/>
      </div>
    </>
  );
}

export default SideBar;
