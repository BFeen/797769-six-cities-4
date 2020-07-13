import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {cities} from "../../common/const.js";
import offerPropTypes from "../../prop-types/offer-prop-types.js"

class CitiesList extends PureComponent {

  render() {
    const {offers, onCityChange} = this.props;
    // const availableCities = cities.filter((city) => offers.find((offer) => offer.city === city.name));
    
    return (
      <ul className="locations__list tabs__list">
        {Object.values(cities).map((city, index) => {
          let className = `locations__item-link tabs__item`;

          if (city.isActive) {
            className += ` tabs__item--active`;
          }

          return (
            <li
              key={city.name + index}
              className="locations__item"
              onClick={() => {
                this._onViewChange(city.name);
                onCityChange(city.name);
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
  }

  _onViewChange(cityName) {
    cities.forEach((item) => {
      if (item.name !== cityName) {
        item.isActive = false;
      } else {
        item.isActive = true;
      }
    });
  }
};

CitiesList.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  onCityChange: PropTypes.func.isRequired,
};

export default CitiesList;
