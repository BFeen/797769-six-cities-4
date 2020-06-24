import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";
import {offerPropTypes} from "../../mocks/offer-prop-type.js";


class PlaceCardList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: {},
    };
  }

  render() {
    const {offers, onCardTitleClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer, index) => {
          return (
            <PlaceCard
              key={`${offer.title + index}`}
              offer={offer}
              onCardMouseEnter={(currentOffer) => {
                this.setState({
                  activeCard: currentOffer
                });
              }}
              onCardTitleClick={onCardTitleClick}
            />
          );
        })}
      </div>
    );
  }
}

PlaceCardList.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

export default PlaceCardList;
