import React from "react";
import { Link } from "react-router-dom";

const StoreCategories = ({ categories, active_category }) => {
  return (
    <div className="store-filter-categories">
      <span>CATEGORIES</span>
      {Object.values(categories).map(({ title, icon }, index) => (
        <Link
          key={index}
          to={`/store/${title}`}
          className={title === active_category ? "active" : ""}
          style={{ backgroundImage: `url(${icon})` }}
        >
          <span>{title}</span>
        </Link>
      ))}
    </div>
  );
};

export default StoreCategories;
