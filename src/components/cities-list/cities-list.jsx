import React from "react";
import PropTypes from "prop-types";
import {cities} from "../../common/const.js";
import offerPropTypes from "../../prop-types/offer-prop-types.js"

const CitiesList = (props) => {
  const {offers} = props;
  return;
};

CitiesList.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
};

export default CitiesList;
