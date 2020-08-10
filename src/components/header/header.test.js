import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {Header} from "./header.jsx";
import history from "../../history.js";


const userDataMock = {
  id: 0,
  name: `Max`,
  avatar: `img/img.png`,
  isPro: false,
  email: `max@mail.ru`,
};

describe(`Header snapshot testing`, () => {
  it(`Header with userData rendering correctly`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Header
            authorizationStatus={`AUTH`}
            user={userDataMock}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Header without authorization rendering correctly`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Header
            authorizationStatus={`NO_AUTH`}
            user={{}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
