import React from "react";
import PropTypes from "prop-types";
import legos from "../img/isometric_legos_animated.svg";

const Hero = props => {
  return (
    <div className={props.classes.svgContainer}>
      <img
        alt="lego bricks"
        id="lego-svg"
        src={legos}
        class={props.classes.hero}
      />
    </div>
  );
};

Hero.propTypes = {
  classes: PropTypes.object
};

export default Hero;
