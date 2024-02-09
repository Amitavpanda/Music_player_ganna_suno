import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { RiCloseCircleFill } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import logo from "../assets/logo.png";
import { links } from "../assets/constants";
import { logout } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const NavLinks = () => {
  return (
    <div className="mt-10">
      {links.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className="relative flex flex-row justify-start items-center my-8"
        >

          <item.icon className="bg-white text-backgroundColor rounded-full mr-5 w-6 h-6 hover:text-skyColor" />

          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Link
              to={item.to}
              className='font-bold text-white text-[1.2rem] transition-all hover:text-skyColor py-1.5 relative z-10'
            >
              {item.name}
            </Link>
          </motion.div>



        </NavLink>
      ))}
    </div>
  );
};

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log("user in sidebar", user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const logOut = () => {
  //   dispatch(logout());
  //   navigate("/auth");
  //   alert("Log Out successfully");
  //   console.log("log out succesfully");
  // };

  return (
    <>
      <div className="md:flex hidden flex-col  items-center w-[240px] py-10 px-4 bg-gradient-to-br from-[#121212] to-backgroundColor">
        <img alt="logo" src={logo} className="w-full h-40 object-contain" />
        <NavLinks />
        {user ? (
          <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2 }}>
            <Link to="/auth" className="text-white hover:text-skyColor font-bold" >Log Out</Link>
          </motion.div>
        ) : (
          <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2 }}>
            <Link to="/auth" >Sign In</Link>

          </motion.div>
        )}
      </div>

      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseCircleFill
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`absolute flex flex-col items-center align-center top-0 h-screen w-1/3 bg-gradient-tl from-white/10 to-backgroundColor backdrop-blur-lg z-10 md:hidden smooth-transition ${mobileMenuOpen ? "left-0" : "-left-full"
          }`}
      >
        <img alt="logo" src={logo} className="w-full h-40 object-contain" />
        <NavLinks />
        {user ? (
          <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2 }}>
            <Link to="/auth" className="text-white hover:text-skyColor font-bold" >Log Out</Link>
          </motion.div>
        ) : (
          <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2 }}>
            <Link to="/auth" >Sign In</Link>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default SideBar;
