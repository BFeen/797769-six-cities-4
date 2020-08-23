import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {ClassNames, AppRoute} from "../../common/const";
import {IUserWithEmail} from "../../common/types";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus, getUserData} from "../../reducer/user/selectors";


interface Props {
  authorizationStatus: string;
  user: IUserWithEmail;
};

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const {
    user,
    authorizationStatus,
  } = props;
  const {LoginClassNames} = ClassNames;
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link header__logo-link--active"
              to={AppRoute.ROOT}
            >
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={AppRoute.LOGIN}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper" />
                  <span
                    className={isAuthorized ? LoginClassNames.AUTH : LoginClassNames.NO_AUTH}
                  >
                    {isAuthorized ? user.email : `Sign in`}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUserData(state),
});

export {Header};
export default connect(mapStateToProps)(Header);
