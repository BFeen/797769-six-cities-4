import PropTypes from "prop-types";

export default PropTypes.shape({
  description: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.oneOf([`Apartment`, `Room`, `House`, `Hotel`]).isRequired,
  rating: PropTypes.number.isRequired,
}).isRequired;
