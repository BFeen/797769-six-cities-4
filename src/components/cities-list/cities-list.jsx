import React from "react";
import PropTypes from "prop-types";
import {cities} from "../../common/const.js";
import offerPropTypes from "../../prop-types/offer-prop-types.js"

const CitiesList = (props) => {
  const {offers} = props;
  const availableCities = cities.filter((city) => offers.find((offer) => offer.city === city.name));
  
  return (
    <ul className="locations__list tabs__list">
      {availableCities.map((city, index) => {
        const isActive = index === 3;
        let className = `locations__item-link tabs__item`;

        if (isActive) {
          className += ` tabs__item--active`;
        }

        return (
          <li key={city.name + index} className="locations__item">
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
};

export default CitiesList;
