import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";


const CardTitleClickHandler = () => {};

const App = (props) => {
  const {cities, placesToStay, offers} = props;

  return (
    <Main
      cities={cities}
      placesToStay={placesToStay}
      offers={offers}
      onCardTitleClick={CardTitleClickHandler}
    />
  );
};

App.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  placesToStay: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
