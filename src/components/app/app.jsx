import {BrowserRouter, Switch, Route} from "react-router-dom";
import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import PlaceDetails from "../place-details/place-details.jsx";
import {offerPropTypes} from "../../mocks/offer-prop-type.js";
import {MapClassNames} from "../../const.js";


class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offerId: -1,
    };

    this._handleCardTitleClick = this._handleCardTitleClick.bind(this);
  }

  render() {
    const {offers} = this.props;

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
              onCardTitleClick={this._handleCardTitleClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderMainPage() {
    const {offers} = this.props;
    const {offerId} = this.state;
    const offer = offers.find((item) => item.id === offerId);

    if (!offer) {
      const {cities, placesCount} = this.props;
      return (
        <Main
          cities={cities}
          placesCount={placesCount}
          offers={offers}
          mapClassName={MapClassNames.CITIES}
          onCardTitleClick={this._handleCardTitleClick}
        />
      );
    } else {
      return (
        <PlaceDetails
          mapClassName={MapClassNames.PROPERTY}
          offerId={offerId}
          offers={offers}
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
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  placesCount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
};

export default App;
