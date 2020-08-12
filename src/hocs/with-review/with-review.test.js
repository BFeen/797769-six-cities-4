import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import withReview from "./with-review.js";
import NameSpace from "../../reducer/name-space.js";


const mockStore = configureStore([]);

const MockComponent = () => {
  return (
    <div></div>
  );
};

MockComponent.propTypes = {};

const MockComponentWrapped = withReview(MockComponent);

const userDataMock = {
  id: 0,
  name: `Max`,
  avatar: `img/img.png`,
  isPro: false,
  email: `max@mail.ru`,
};

describe(`withReview HOC snapshot testing`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      reviews: [],
    },
    [NameSpace.APPLICATION]: {
      offerId: 3,
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      user: userDataMock,
    }
  });

  it(`withReview HOC rendering correctly`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <MockComponentWrapped
            offerId={0}
            handleSubmit={() => {}}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
