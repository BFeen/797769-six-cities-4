import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";


const handleCardTitleClick = () => {};

const App = (props) => {
  const {cities, placesCount, offers} = props;

  return (
    <Main
      cities={cities}
      placesCount={placesCount}
      offers={offers}
      onCardTitleClick={handleCardTitleClick}
    />
  );
};

App.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  placesCount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.oneOf([`Apartment`,`Room`,`House`,`Hotel`]).isRequired,
    rating: PropTypes.number.isRequired,
  })).isRequired,
};

export default App;
