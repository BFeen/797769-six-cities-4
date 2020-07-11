import React from "react";
import PropTypes from "prop-types";
import {cities} from "../../common/const.js";
import offerPropTypes from "../../prop-types/offer-prop-types.js"

const CitiesList = (props) => {
  const {offers, onCityChange} = props;
  // const availableCities = cities.filter((city) => offers.find((offer) => offer.city === city.name));
  
  return (
    <ul className="locations__list tabs__list">
      {Object.values(cities).map((city, index) => {
        const isActive = index === 0;
        let className = `locations__item-link tabs__item`;

        if (isActive) {
          className += ` tabs__item--active`;
        }

        return (
          <li
            key={city.name + index}
            className="locations__item"
            onClick={() => {
              onCityChange(city.name)
            }}
          >
            <a className={className} href="#">
              <span>{city.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

CitiesList.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  onCityChange: PropTypes.func.isRequired,
};

export default CitiesList;
