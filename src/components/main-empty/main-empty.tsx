import * as React from "react";
import {ICity} from "../../common/types";


interface Props {
  errorMessage: string;
  city: ICity;
}

const MainEmpty: React.FunctionComponent<Props> = (props) => {
  const {city, errorMessage} = props;
  const message = errorMessage ? errorMessage : `No places to stay available`;

  return (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">{message}</b>
          <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  );
};

export default MainEmpty;
