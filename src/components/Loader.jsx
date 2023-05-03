import React from "react";
import loader from "../assets/loader.svg";
function Loader({title}) {
  return <div className="w-full flex justify-center items-center flex-col ">
    <img src={loader} alt="loader" className="w-36 h-36 object-contain" />
    <h2 className="font-bold text-2xl text-white mt-2">
      {title || "Loading..."}
    </h2>
  </div>;
}

export default Loader;
