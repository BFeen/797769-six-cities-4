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
    const {offers, onCardTitleClick, isMain} = this.props;
    const listClassName = isMain ? `cities__places-list tabs__content` : `near-places__list`;
    const cardClassName = isMain ? `cities__place-card` : `near-places__card`;

    return (
      <div className={`places__list ${listClassName}`}>
        {offers.map((offer) => {
          return (
            <PlaceCard
              key={`${offer.id}`}
              offer={offer}
              className={cardClassName}
              onCardMouseEnter={(currentOffer) => {
                this.setState({
                  activeCard: currentOffer,
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
  isMain: PropTypes.bool.isRequired,
};

export default PlaceCardList;
