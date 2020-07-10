import {BrowserRouter, Switch, Route} from "react-router-dom";
import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import PlaceDetails from "../place-details/place-details.jsx";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import reviewPropTypes from "../../prop-types/review-prop-types.js";
import {MapClassNames} from "../../common/const.js";


class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offerId: -1,
    };

    this._handleCardTitleClick = this._handleCardTitleClick.bind(this);
  }

  render() {
    const {offers, reviews} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainPage()}
          </Route>
          <Route exact path="/details">
            <PlaceDetails
              mapClassName={MapClassNames.PROPERTY}
              offerId={0}
              offers={offers}
              reviews={reviews}
              onCardTitleClick={this._handleCardTitleClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderMainPage() {
    const {offers, reviews} = this.props;
    const {offerId} = this.state;
    const offer = offers.find((item) => item.id === offerId);

    if (!offer) {
      const {placesCount} = this.props;
      return (
        <Main
          placesCount={placesCount}
          offers={offers}
          mapClassName={MapClassNames.CITIES}
          onCardTitleClick={this._handleCardTitleClick}
        />
      );
    } else {
      return (
        <PlaceDetails
          offerId={offerId}
          offers={offers}
          reviews={reviews}
          mapClassName={MapClassNames.PROPERTY}
          onCardTitleClick={this._handleCardTitleClick}
        />
      );
    }
  }

  _handleCardTitleClick(id) {
    this.setState(() => ({
      offerId: id,
    }));
  }
}

App.propTypes = {
  placesCount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
};

export default App;
