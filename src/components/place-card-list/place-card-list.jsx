import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";


class PlaceCardList extends PureComponent {
  constructor(props) {
    super(props);
  }

  HandleCardMouseEnter(evt) {
    console.log(evt.target);
  }

  render() {
    const {offers} = this.props;
    
    return offers.map((offer) => {
      return (
        <PlaceCard
          offer={offer}
          onMouseEnter={HandleCardMouseEnter}
        />
      );
    });
  };
}

PlaceCardList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.oneOf([`Apartment`,`Room`,`House`,`Hotel`]).isRequired,
    rating: PropTypes.number.isRequired,
  })).isRequired,
  onMouseEnter: PropTypes.func.isRequired,
};

export default PlaceCardList;
