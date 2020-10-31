import React from "react";

const StoreTags = ({ tags, tickTags, active_tags }) => {
  return (
    <div className="store-filter-tags">
      <span>TAGS</span>
      {tags ? (
        tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => tickTags(tag)}
            className={active_tags.includes(tag) ? "active" : ""}
          >
            {tag}
          </button>
        ))
      ) : (
        <React.Fragment />
      )}
    </div>
  );
};

export default StoreTags;
