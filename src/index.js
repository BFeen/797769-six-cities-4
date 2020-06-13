import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";


const Offers = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal view Princengracht`,
  `Nice, cozy, warm big bed apartment`,
];

const Cities = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`,
];

ReactDOM.render(
    <App
      cities={Cities}
      placesToStay={Offers.length}
      offers={Offers}
    />,
    document.querySelector(`#root`)
);
