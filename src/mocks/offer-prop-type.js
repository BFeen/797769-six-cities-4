import PropTypes from "prop-types";

const offerPropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.oneOf([`Apartment`, `Room`, `House`, `Hotel`]).isRequired,
  rating: PropTypes.number.isRequired,
}).isRequired;

const offerDetailsPropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
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

export {offerPropTypes, offerDetailsPropTypes};
