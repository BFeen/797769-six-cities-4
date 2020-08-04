import React from "react";
import PropTypes from "prop-types";


const Button = (props) => {
  const {children} = props;

  return (
    <button
      type="submit"
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
