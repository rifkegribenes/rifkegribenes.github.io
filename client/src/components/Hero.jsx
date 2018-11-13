import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import Avatar from "@material-ui/core/Avatar";
import withWidth from "@material-ui/core/withWidth";
// import legos from "../img/isometric_legos_animated.svg";
// import avatarPic from "../img/sarah_2018_200.png";

const Hero = props => {
  const { width, classes } = props;
  console.log(width);
  return (
    <div className={classes.hero}>
      <div className={classes.heroText}>
        <Typography variant="h2" className={classes.heroHead}>
          Hello!
          <br />
          What do you
          {width === "xs" || width === "sm" ? <br /> : " "}
          want to build?
        </Typography>
        <Typography variant="body1" className={classes.heroBody}>
          I'm a software engineer
          {width === "xs" || width === "sm" ? <br /> : " "}
          and UI/UX designer
          {width === "xs" || width === "sm" ? <br /> : " "}
          and I'd love to help you build it!
        </Typography>
        {/*        <Avatar
          alt="Sarah Schneider"
          className={classes.heroAvatar}
          src={avatarPic}
        />*/}
        <Button
          variant="outlined"
          color="secondary"
          className={classes.loginButton}
          href="/contact"
        >
          Get started
        </Button>
      </div>
      {/*<div className={classes.heroSvgWrap}>
                <img
          alt="lego bricks"
          id="lego-svg"
          src={legos}
          class={classes.heroSvg}
        />
      </div>*/}
      <div className={classes.heroSvgWrap}>
        <canvas id="canvas" className={classes.heroSvg} />
      </div>
    </div>
  );
};

Hero.propTypes = {
  classes: PropTypes.object
};

export default withWidth()(Hero);
