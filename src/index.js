import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {Cities, Offers} from "./const.js";


ReactDOM.render(
    <App
      cities={Cities}
      placesToStay={Offers.length}
      offers={Offers}
    />,
    document.querySelector(`#root`)
);
