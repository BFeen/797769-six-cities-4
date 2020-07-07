import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {CITIES} from "./const.js";
import {offers} from "./mocks/offers.js";
import reviews from "./mocks/reviews.js";

ReactDOM.render(
    <App
      cities={CITIES}
      placesCount={offers.length}
      offers={offers}
      reviews={reviews}
    />,
    document.querySelector(`#root`)
);
