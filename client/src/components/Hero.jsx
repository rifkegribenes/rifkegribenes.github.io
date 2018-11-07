import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import legos from "../img/isometric_legos_animated.svg";
import avatarPic from "../img/sarah_2018_200.png";

const Hero = props => {
  return (
    <div className={props.classes.hero}>
      <div className={props.classes.heroText}>
        <Typography variant="h2" className={props.classes.heroHead}>
          Hello!
          <br />
          What do you
          <br />
          want to build?
        </Typography>
        <Typography variant="body1" className={props.classes.heroBody}>
          I'm a software engineer and UI/UX designer
          <br />
          and I'd love to help you build it!
        </Typography>
        <Avatar
          alt="Sarah Schneider"
          className={props.classes.heroAvatar}
          src={avatarPic}
        />
      </div>
      <div className={props.classes.heroSvgWrap}>
        {/*        <img
          alt="lego bricks"
          id="lego-svg"
          src={legos}
          class={props.classes.heroSvg}
        />*/}
        <canvas id="canvas" className={props.classes.heroCanvas} />
      </div>
    </div>
  );
};

Hero.propTypes = {
  classes: PropTypes.object
};

export default Hero;
