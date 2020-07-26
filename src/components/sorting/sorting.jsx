import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {SortType} from "../../common/const.js";

class Sorting extends PureComponent {
  render() {
    const {onSortTypeChange} = this.props;

    return (
      <select
        className="places__sorting-type"
        id="places-sorting"
        defaultValue="popular"
        onChange={(evt) => {
          onSortTypeChange(evt.target.value);
        }}
      >
        {Object.values(SortType).map((type, index) => {
          return (
            <option
              key={type.value + index}
              className="places__option"
              value={type.value}
            >
              {type.name}
            </option>
          );
        })}
      </select>
    );
  }
}

Sorting.propTypes = {
  onSortTypeChange: PropTypes.func.isRequired,
};

export default Sorting;
