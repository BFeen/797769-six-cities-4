import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";


const Settings = {
  RENTAL_OFFERS: 100500,
};

ReactDOM.render(
    <App placesToStay={Settings.RENTAL_OFFERS}/>,
    document.querySelector(`#root`)
);
