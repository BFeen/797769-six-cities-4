import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {SortType} from "../../common/const.js";

class Sorting extends PureComponent {
  render() {
    const {
      currentSortType,
      onSelectSortType,
      onMenuClick,
    } = this.props;

    const {isOpened} = this.props;
    const defaultSortType = Object.values(SortType).find((item) => item === currentSortType);
    const openedMenuClass = isOpened ? `places__options--opened` : ``;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          tabIndex="0"
          onClick={onMenuClick}
        >
          {defaultSortType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select" />
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${openedMenuClass}`}>

          {Object.values(SortType).map((type, index) => {
            const activeOptionClass = type === currentSortType ? `places__option--active` : ``
            return (
              <li
                key={type + index}
                tabIndex="0"
                className={`places__option ${activeOptionClass}`}
                onClick={() => {
                  onSelectSortType(type);
                }}
              >
                {type}
              </li>
            );
          })}
        </ul>
      </form>
    );
  }
}

Sorting.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  currentSortType: PropTypes.string.isRequired,
  onSelectSortType: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

export default Sorting;
