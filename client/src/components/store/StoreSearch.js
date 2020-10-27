import React from "react";

const StoreSearch = ({ tickSearch, keyword }) => {
  return (
    <div className="store-control-search">
      <input
        type="text"
        name="keyword"
        onChange={tickSearch}
        value={keyword}
        placeholder="Search items..."
      />
      <i className="fas fa-search" />
    </div>
  );
};

export default StoreSearch;
