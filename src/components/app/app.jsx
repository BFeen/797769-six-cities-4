import {BrowserRouter, Switch, Route} from "react-router-dom";
import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import PlaceDetails from "../place-details/place-details.jsx";
import {offerPropTypes} from "../../mocks/offer-prop-type.js";


const handleCardTitleClick = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {cities, placesCount, offers} = this.props;
  
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main
              cities={cities}
              placesCount={placesCount}
              offers={offers}
              onCardTitleClick={handleCardTitleClick}
            />
          </Route>
          <Route exact path="/details">
            <PlaceDetails 
              offer={offers[0]}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
};

App.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  placesCount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
};

export default App;
