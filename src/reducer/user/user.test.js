import {reducer, ActionCreator, ActionType, AuthorizationStatus, Operation} from "./user.js";
import {createAPI} from "../../api.js";
import MockAdapter from "axios-mock-adapter";


const api = createAPI(() => {});

const userDataMock = {
  id: 0,
  name: `Max`,
  avatar: `img/img.png`,
  isPro: false,
  email: `max@mail.ru`,
};

describe(`User reducer testing`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      user: {},
    });
  });

  it(`Reducer should change authorizationStatus by a given value`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    });
  });

  it(`Reducer should change user data by a given value`, () => {
    expect(reducer({
      user: {},
    }, {
      type: ActionType.CHANGE_USER_DATA,
      payload: userDataMock,
    })).toEqual({
      user: userDataMock,
    });

    expect(reducer({
      user: userDataMock,
    }, {
      type: ActionType.CHANGE_USER_DATA,
      payload: {},
    })).toEqual({
      user: {}
    });
  });

  describe(`User ActionCreator works correctly`, () => {
    it(`ActionCreator for require authorization returns correct action`, () => {
      expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
        type: ActionType.REQUIRED_AUTHORIZATION,
        payload: AuthorizationStatus.NO_AUTH,
      });

      expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
        type: ActionType.REQUIRED_AUTHORIZATION,
        payload: AuthorizationStatus.AUTH,
      });
    });

    it(`ActionCreator for require userData returns correct action`, () => {
      expect(ActionCreator.saveUserData(userDataMock)).toEqual({
        type: ActionType.CHANGE_USER_DATA,
        payload: userDataMock,
      });
    });
  });
});

describe(`User Operation works correctly`, () => {
  it(`Should make a correct API 'GET' call to '/login'`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authChecker = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, [AuthorizationStatus.AUTH]);

    return authChecker(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it(`Should make a correct API 'POST' call to '/login'`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const dataMock = {
      email: `e@mail.com`,
      password: `1234`,
    };
    const loginer = Operation.login(dataMock);

    apiMock
      .onPost(`/login`)
      .reply(200, [{
        email: dataMock.email,
        id: `1`,
      }]);

    return loginer(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });
});
