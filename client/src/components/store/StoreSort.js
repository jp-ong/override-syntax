import React, { useState } from "react";
const StoreSort = ({ toggleSort }) => {
  const [isOpen, toggle] = useState(false);
  return (
    <div className="store-control-sort" onMouseLeave={() => toggle(false)}>
      <div
        className="store-control-sort-button"
        onClick={() => toggle(!isOpen)}
      >
        <span>Sort By</span>
        <i className="fas fa-sort" />
      </div>
      {isOpen ? (
        <div className="store-control-sort-menu">
          <div
            className="store-control-sort-menu-option"
            onClick={() => toggleSort("sortAup")}
          >
            <span>Alphabetical A-Z</span>
            <i className="fas fa-sort-alpha-down" />
          </div>
          <div
            className="store-control-sort-menu-option"
            onClick={() => toggleSort("sortAdn")}
          >
            <span>Alphabetical Z-A</span>
            <i className="fas fa-sort-alpha-up" />
          </div>
          <div
            className="store-control-sort-menu-option"
            onClick={() => toggleSort("sortNup")}
          >
            <span>Price Low-High</span>
            <i className="fas fa-sort-numeric-down" />
          </div>
          <div
            className="store-control-sort-menu-option"
            onClick={() => toggleSort("sortNdn")}
          >
            <span>Price High-Low</span>
            <i className="fas fa-sort-numeric-up" />
          </div>
        </div>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
};

export default StoreSort;
