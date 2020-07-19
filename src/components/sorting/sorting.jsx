import React from "react";


const SortType = {
  POPULAR: {
    value: `popular`,
    name: `Popular`,
  },
  LOW_TO_HIGH: {
    value: `to-high`,
    name: `Price: low to high`,
  },
  HIGH_TO_LOW: {
    value: `to-low`,
    name: `Price: high to low`,
  },
  RATING: {
    value: `top-rated`,
    name: `Top rated first`, 
  },
};

const Sorting = (props) => {
  const {onSortTypeChange} = props;

  return (
    <select className="places__sorting-type" id="places-sorting" defaultValue="popular">
      {Object.values(SortType).map((type) => {
        return (
          <option
            key={type.value}
            className="places__option"
            value={type.value}
            onChange={() => {
              onSortTypeChange(type.name);
            }}
          >
            {type.name}
          </option>
        );
      })}
    </select>
  );
};

Sorting.propTypes = {};

export default Sorting;
