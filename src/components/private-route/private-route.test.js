import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {PrivateRoute} from "./private-route.jsx";
import history from "../../history.js";


describe(`PrivateRoute snapshot test`, () => {
  it(`PrivateRoute rendering correctly`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <PrivateRoute
            exact={true}
            path={`/favorite`}
            authorizationStatus={`AUTH`}
            render={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`PrivateRoute redirected unauthorized user and rendering correctly`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <PrivateRoute
            exact={true}
            path={`/favorite`}
            authorizationStatus={`NO_AUTH`}
            render={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
