import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import SignIn from "./sign-in.jsx";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";


const mockStore = configureStore([]);

const userDataMock = {
  id: 0,
  name: `Max`,
  avatar: `img/img.png`,
  isPro: false,
  email: `max@mail.ru`,
};

it(`SignIn rendering correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      user: userDataMock,
    }
  })
  const tree = renderer.create(
    <Provider store={store}>
      <SignIn
        onSubmit={() => {}}
      />
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
