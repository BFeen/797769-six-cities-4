import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ClassNames} from "../../common/const.js";
import {getUserData, getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";


const Header = (props) => {
  const {user, authorizationStatus} = props;
  const {LoginClassNames} = ClassNames;
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
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
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUserData(state),
});

export {Header};
export default connect(mapStateToProps)(Header);
