import {reducer, ActionType} from "./reducer.js";


describe(`Reducer testing`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      offerId: -1,
    });
  });
  
  it(`Reducer should assign given value`, () => {
    expect(reducer({
      offerId: -1,
    }, {
      type: ActionType.CHANGE_OFFER_ID,
      payload: 3,
    })).toEqual({
      offerId: 3,
    });

    
    expect(reducer({
      offerId: 2,
    }, {
      type: ActionType.CHANGE_OFFER_ID,
      payload: -1,
    })).toEqual({
      offerId: -1,
    });
  });
});