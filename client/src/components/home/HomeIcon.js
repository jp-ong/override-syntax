import React from "react";
import { Link } from "react-router-dom";

const HomeIcon = ({ icon, title }) => {
  return (
    <Link to={`/store/${title}`} className="home-icons-icon">
      <div
        className="home-icons-icon-image"
        style={{ backgroundImage: `url(${icon})` }}
      ></div>
      <div className="home-icons-icon-title">
        <span>{title}</span>
      </div>
    </Link>
  );
};

export default HomeIcon;
