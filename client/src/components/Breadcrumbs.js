import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ show, crumbs }) => {
  const isLast = (arr, i) => {
    return arr.length - 1 === i;
  };
  return show ? (
    <div className="breadcrumbs">
      {crumbs.map((crumb, index) => (
        <div className="breadcrumbs-link">
          <Link
            to={crumb.link}
            className={isLast(crumbs, index) ? "active" : ""}
          >
            {crumb.text}
          </Link>
          {isLast(crumbs, index) ? <React.Fragment /> : <span>{">"}</span>}
        </div>
      ))}
    </div>
  ) : (
    <React.Fragment />
  );
};

export default Breadcrumbs;
