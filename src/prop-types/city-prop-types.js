import PropTypes from "prop-types";


export default PropTypes.shape({
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
}).isRequired;
