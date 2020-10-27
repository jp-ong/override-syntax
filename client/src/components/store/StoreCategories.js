import React from "react";
import { Link } from "react-router-dom";

const StoreCategories = ({ categories, active_category }) => {
  return (
    <div className="store-filter-categories">
      <span>CATEGORIES</span>
      {Object.keys(categories).map((category, index) => (
        <Link
          key={index}
          to={`/store/${category}`}
          className={category === active_category ? "active" : ""}
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default StoreCategories;
