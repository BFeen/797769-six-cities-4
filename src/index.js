import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore} from "redux"
import {Provider} from "react-redux";
import {CITIES} from "./common/const.js";
import {offers} from "./mocks/offers.js";
import reviews from "./mocks/reviews.js";
import {reducer} from "./reducer.js";


const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <App
        cities={CITIES}
        placesCount={offers.length}
        offers={offers}
        reviews={reviews}
      />
    </Provider>,
    document.querySelector(`#root`)
);
