import React from "react";
import ReactVivus from "react-vivus";
import PropTypes from "prop-types";
import legos from "../img/isometric_legos.svg";

const Hero = props => {
  return (
    <ReactVivus
      id="foo"
      option={{
        file: legos,
        animTimingFunction: "EASE",
        type: "oneByOne",
        onReady: console.log
      }}
      class={props.classes.hero}
      callback={console.log}
    />
  );
};

Hero.propTypes = {
  classes: PropTypes.object
};

export default Hero;
