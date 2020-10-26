import React, { useState } from "react";

import MenuLinks from "./NavMenuLinks";

const NavMenu = () => {
  const [isOpen, toggle] = useState(false);

  return (
    <div className="nav-menu" onMouseLeave={() => toggle(false)}>
      <div
        className="nav-menu-control"
        onClick={() => toggle(!isOpen)}
        onMouseEnter={() => toggle(true)}
      >
        <span>MY ACCOUNT</span>
        <i className="fas fa-bars" />
      </div>
      {isOpen ? (
        <div className="nav-menu-links">
          <MenuLinks />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavMenu;
