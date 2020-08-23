import * as React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import {AppRoute} from "../../common/const";


interface Props {
  path: string;
  exact: boolean;
  authorizationStatus: string;
  render: () => React.ReactNode;
};

const PrivateRoute: React.FunctionComponent<Props> = (props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
