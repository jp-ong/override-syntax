import React from "react";
import { Link } from "react-router-dom";
import BrandImage from "../assets/images/brand.png";

const Brand = () => {
  return (
    <Link to="/">
      <img src={BrandImage} alt="Override" className="brand" />
    </Link>
  );
};

export default Brand;
