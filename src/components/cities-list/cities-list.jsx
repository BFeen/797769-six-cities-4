import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {cities} from "../../common/const.js";
import cityPropTypes from "../../prop-types/city-prop-types.js";

class CitiesList extends PureComponent {
  render() {
    const {currentCity, onCityChange} = this.props;

    return (
      <ul className="locations__list tabs__list">
        {Object.values(cities).map((city, index) => {
          const activeClassName = `tabs__item--active`;

          return (
            <li
              key={city.name + index}
              className="locations__item"
              onClick={() => {
                onCityChange(city);
              }}
            >
              <a
                className={`locations__item-link tabs__item ${currentCity === city ? activeClassName : ``}`}
                href="#"
              >
                <span>{city.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}

CitiesList.propTypes = {
  currentCity: cityPropTypes,
  onCityChange: PropTypes.func.isRequired,
};

export default CitiesList;
