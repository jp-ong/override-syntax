import React from "react";
import Brand from "../Brand";
import NavMenu from "./NavMenu";

const NavBar = () => {
  return (
    <div className="nav">
      <NavBrand />
      <NavMenu />
    </div>
  );
};

const NavBrand = () => {
  return (
    <div className="nav-brand">
      <Brand />
    </div>
  );
};

export default NavBar;
