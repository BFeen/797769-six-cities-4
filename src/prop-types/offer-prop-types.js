import PropTypes from "prop-types";

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.oneOf([`Apartment`, `Room`, `House`, `Hotel`]).isRequired,
  rating: PropTypes.number.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
}).isRequired;
