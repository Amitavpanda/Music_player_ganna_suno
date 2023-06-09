import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { RiCloseCircleFill } from "react-icons/ri";
import {HiOutlineMenu} from "react-icons/hi";
import logo from "../assets/logo.png";
import { links } from "../assets/constants";
import { logout } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

const NavLinks = () => {
  return (
    <div className="mt-10">
      {links.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log("user",user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const logOut = () => {
    dispatch(logout());
    navigate("/auth");
    alert("Log Out successfully");
    console.log("log out succesfully");
  }

  return (
    <>
      <div className="md:flex hidden flex-col  items-center w-[240px] py-10 px-4 bg-gradient-to-br from-[#121212] to-backgroundColor">
        <img alt="logo" src={logo} className="w-full h-40 object-contain" />
        <NavLinks />
        {
          user ? (
            <button onClick={logOut} className="mt-50 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
<Link to="/auth">Log Out</Link>
</button>
          ) : (
<button className="mt-50 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
<Link to="/auth">Sign In</Link>
</button>
          )
        }
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
