import * as React from "react";
import {Cities} from "../../common/const";
import {ICity} from "../../common/types";


interface Props {
  currentCity: ICity;
  onItemClick: (city: ICity) => void;
}

const CitiesList: React.FunctionComponent<Props> = (props: Props) => {
  const cities: ICity[] = Cities.slice();
  const {currentCity, onItemClick} = props;

  return (
    <ul className="locations__list tabs__list">
      {Object.values(cities).map((city, index) => {
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

export default CitiesList;
