import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import SignIn from "./sign-in.jsx";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";


it(`SignIn rendering correctly`, () => {

  const tree = renderer.create(
      <SignIn
        onSubmit={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
