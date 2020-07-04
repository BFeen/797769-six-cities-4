import PropTypes from "prop-types";

export default PropTypes.shape({
  offerId: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
});
