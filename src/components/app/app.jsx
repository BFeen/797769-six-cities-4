import React from "react";
import Main from "../main/main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {cities, placesToStay, offers} = props;

  return (
    <Main
      cities={cities}
      placesToStay={placesToStay}
      offers={offers}
    />
  );
};

export default App;
