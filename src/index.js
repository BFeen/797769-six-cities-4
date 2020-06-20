import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {CITIES, OFFERS} from "./const.js";


ReactDOM.render(
    <App
      cities={CITIES}
      placesToStay={OFFERS.length}
      offers={OFFERS}
    />,
    document.querySelector(`#root`)
);
