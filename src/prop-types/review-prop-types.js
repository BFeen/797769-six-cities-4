import PropTypes from "prop-types";

const reviewPropTypes = {
  userName: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
}

export default reviewPropTypes;
