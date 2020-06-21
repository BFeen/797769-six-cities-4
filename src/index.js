import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {CITIES} from "./const.js";
import Offers from "./mocks/offers.js";


ReactDOM.render(
    <App
      cities={CITIES}
      placesCount={Offers.length}
      offers={Offers}
    />,
    document.querySelector(`#root`)
);
