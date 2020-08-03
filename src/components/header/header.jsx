import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ClassNames, ScreenMode} from "../../common/const.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus, getUserData} from "../../reducer/user/selectors.js";
import {ActionCreator} from "../../reducer/application/application.js";


const Header = (props) => {
  const {
    user,
    authorizationStatus,
    handleLogoClick,
    handleSignInClick,
  } = props;
  const {LoginClassNames} = ClassNames;
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a
              className="header__logo-link header__logo-link--active"
              onClick={handleLogoClick}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a
                  className="header__nav-link header__nav-link--profile"
                  href="#"
                  onClick={handleSignInClick}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper" />
                  <span
                    className={isAuthorized ? LoginClassNames.AUTH : LoginClassNames.NO_AUTH}
                  >
                    {isAuthorized ? user.email : `Sign in`}
                  </span>
                </a>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  user: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
    }),
    PropTypes.object,
  ]).isRequired,
  handleLogoClick: PropTypes.func.isRequired,
  handleSignInClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleLogoClick: () => {
    dispatch(ActionCreator.changeScreen(ScreenMode.MAIN));
  },
  handleSignInClick: () => {
    dispatch(ActionCreator.changeScreen(ScreenMode.SIGN_IN));
  }
});

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
