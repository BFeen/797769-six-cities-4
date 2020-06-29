import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {CITIES} from "./const.js";
import {offers} from "./mocks/offers.js";

ReactDOM.render(
    <App
      cities={CITIES}
      placesCount={offers.length}
      offers={offers}
    />,
    document.querySelector(`#root`)
);
