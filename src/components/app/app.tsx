import * as React from "react";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Favorites from "../favorites/favorites";
import Main from "../main/main";
import PlaceDetails from "../place-details/place-details";
import PrivateRoute from "../private-route/private-route";
import SignIn from "../sign-in/sign-in";
import withActiveCard from "../../hocs/with-active-card/with-active-card";
import {getCurrentCity} from "../../reducer/application/selectors";
import {getOffersByCity, getOffers, getError} from "../../reducer/data/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {Operation as DataOperation} from "../../reducer/data/data";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user";
import {AppRoute} from "../../common/const";
import {IOffer, ICity} from "../../common/types";
import history from "../../history";


interface Props {
  errorMessage: string;
  authorizationStatus: string;
  offers: IOffer[];
  offersAll: IOffer[];
  currentCity: ICity;
  handleCardTitleClick: (offer: IOffer) => void;
  handleBookmarkClick: (offerId: number, status: number) => void;
  loadFavorites: () => IOffer[];
  login: (authData: {
    login: string;
    password: string;
  }) => void;
}

const MainWrapped = withActiveCard(Main);

class App extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);

    this._onBookmarkClick = this._onBookmarkClick.bind(this);
  }

  render() {
    const {
      authorizationStatus,
      errorMessage,
      currentCity,
      offers,
      handleCardTitleClick,
    } = this.props;
    const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

    if (errorMessage) {
      return <Redirect to={AppRoute.ROOT} />;
    }

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}
            render={() => (
              <MainWrapped
                errorMessage={errorMessage}
                city={currentCity}
                offers={offers}
                onCardTitleClick={handleCardTitleClick}
                isAuthorized={isAuthorized}
                onBookmarkClick={this._onBookmarkClick}
              />
            )}
          />
          <Route exact path={`${AppRoute.DETAILS}/:id`}
            render={({match}) => (
              this._renderDetailsScreen(match.params.id)
            )}
          />
          <Route exact path={AppRoute.LOGIN}
            render={() => (this._renderSignIn())}
          />
          <PrivateRoute exact path={AppRoute.FAVORITES}
            render={() => (
              <Favorites
                onCardTitleClick={handleCardTitleClick}
                onBookmarkClick={this._onBookmarkClick}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }

  _onBookmarkClick(offerId: number, isFavorite: boolean) {
    if (this.props.authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return <Redirect to={AppRoute.LOGIN} />;
    }

    const {handleBookmarkClick} = this.props;
    const status = +!isFavorite;

    handleBookmarkClick(offerId, status);

    return true;
  }

  _renderSignIn() {
    const {login, authorizationStatus} = this.props;

    if (authorizationStatus === AuthorizationStatus.AUTH) {
      return <Redirect to={AppRoute.FAVORITES} />;
    }

    return (
      <SignIn
        onSubmit={login}
      />
    );
  }

  _renderDetailsScreen(offerId: string) {
    const isLoading = this.props.offersAll.length === 0;

    if (isLoading) {
      return (
        <div>Loading...</div>
      );
    }

    const {
      offersAll,
      authorizationStatus,
      handleCardTitleClick,
    } = this.props;

    const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
    const currentOffer = offersAll.find((item) => item.id === parseInt(offerId, 10));

    return (
      <PlaceDetails
        currentOffer={currentOffer}
        onCardTitleClick={handleCardTitleClick}
        isAuthorized={isAuthorized}
        onBookmarkClick={this._onBookmarkClick}
      />
    );
  }

  _renderFavorites() {
    const {handleCardTitleClick, loadFavorites} = this.props;
    loadFavorites();

    return (
      <Favorites
        onCardTitleClick={handleCardTitleClick}
        onBookmarkClick={this._onBookmarkClick}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: getError(state),
  authorizationStatus: getAuthorizationStatus(state),
  currentCity: getCurrentCity(state),
  offers: getOffersByCity(state),
  offersAll: getOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  loadFavorites() {
    dispatch(DataOperation.loadFavorites());
  },
  handleCardTitleClick(offer) {
    dispatch(DataOperation.loadNearby(offer.id));
    dispatch(DataOperation.loadReviews(offer.id));
  },
  handleBookmarkClick: (offerId, status) => {
    dispatch(DataOperation.postFavorites(offerId, status));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
