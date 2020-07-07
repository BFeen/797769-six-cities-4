import PropTypes from "prop-types";

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  details: PropTypes.shape({
    pictures: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    desctiption: PropTypes.arrayOf(PropTypes.string).isRequired,
    bedroomsCount: PropTypes.string.isRequired,
    maxGuests: PropTypes.string.isRequired,
    insideItems: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    host: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
}).isRequired;
