import React from "react";
import StoreItem from "./StoreItem";

const StoreList = ({
  items,
  active_category,
  active_tags,
  active_sort,
  categories,
  keyword,
}) => {
  const categorizedItems = items.filter((item) => {
    return active_category === "others"
      ? !Object.keys(categories).includes(item.category)
      : item.category === active_category;
  });
  const taggedItems =
    active_tags.length === 0
      ? categorizedItems
      : categorizedItems.filter((item) =>
          active_tags.every((tag) => item.tags.includes(tag))
        );
  const filteredItems = !keyword
    ? taggedItems
    : taggedItems.filter((item) =>
        item.item_name.toLowerCase().includes(keyword.toLowerCase())
      );
  const sortedItems = !active_sort
    ? filteredItems
    : filteredItems.sort((a, b) => {
        switch (active_sort) {
          case "sortAup":
            return a.item_name
              .toLowerCase()
              .localeCompare(b.item_name.toLowerCase());
          case "sortAdn":
            return b.item_name
              .toLowerCase()
              .localeCompare(a.item_name.toLowerCase());
          case "sortNup":
            return a.item_price - b.item_price;
          case "sortNdn":
            return b.item_price - a.item_price;
        }
        return;
      });
  return (
    <div className="store-list">
      {sortedItems.map((item) => (
        <StoreItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default StoreList;
