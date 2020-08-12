import React from "react";
import PropTypes from "prop-types";
import {Cities} from "../../common/const.js";
import cityPropTypes from "../../prop-types/city-prop-types.js";

const CitiesList = (props) => {
  const {currentCity, onItemClick} = props;

  return (
    <ul className="locations__list tabs__list">
      {Object.values(Cities).map((city, index) => {
        const activeClassName = currentCity === city ? `tabs__item--active` : ``;

        return (
          <li
            key={city.name + index}
            className="locations__item"
            onClick={() => {
              onItemClick(city);
            }}
          >
            <a
              className={`locations__item-link tabs__item ${activeClassName}`}
            >
              <span>{city.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

CitiesList.propTypes = {
  currentCity: cityPropTypes,
  onItemClick: PropTypes.func.isRequired,
};

export default CitiesList;
