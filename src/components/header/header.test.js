import React from "react";
import renderer from "react-test-renderer";
import Header from "./header.jsx";


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
      <Header
        authorizationStatus={`AUTH`}
        user={userDataMock}
        handleLogoClick={() => {}}
        handleSignInClick={() => {}}
      />
    ).toJSON();
  
    expect(tree).toMatchSnapshot();
  });

  it(`Header without authorization rendering correctly`, () => {
    const tree = renderer.create(
      <Header
        authorizationStatus={`NO_AUTH`}
        user={{}}
        handleLogoClick={() => {}}
        handleSignInClick={() => {}}
      />
    ).toJSON();
  
    expect(tree).toMatchSnapshot();
  })
});
