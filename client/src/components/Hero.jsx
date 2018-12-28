import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withWidth from "@material-ui/core/withWidth";
import Rainbow from "./Rainbow";
// import rainbow from "../img/neonrainbow_l2r.svg";
// import rainbow_noglow from "../img/neonrainbow_noglow-01_animated.svg";
// import legos from "../img/isometric_legos_animated.svg";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    margin: 0,
    padding: 20
  },
  hero: {
    display: "flex",
    margin: "60px 0 -60px",
    minHeight: "70vh",
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap"
    }
  },
  heroSvgWrap: {
    // height: "100%",
    width: "100%",
    // margin: "60px 60px 60px 0",
    position: "relative"
  },
  heroCanvasWrap: {
    position: "relative"
  },
  heroCanvas: {
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    margin: "0 auto",
    padding: "73px 0 63px 0"
  },
  heroSvg: {
    maxHeight: "80vh",
    width: "auto",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  heroText: {
    // padding: 60,
    backgroundColor: theme.palette.bodyBackground,
    width: "100%",
    maxWidth: 900,
    margin: "0 auto",
    [theme.breakpoints.up("md")]: {
      minWidth: "50%"
      // padding: "60px 0 60px 60px"
    },
    [theme.breakpoints.down("sm")]: {
      // padding: 20
    }
  },
  heroHead: {
    fontSize: "6.75em",
    backgroundColor: theme.palette.bodyBackground,
    [theme.breakpoints.down("lg")]: {
      fontSize: "4.75em"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "3em"
    }
  },
  heroBody: {
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.bodyBackground,
    fontSize: "3.5em",
    padding: "40px 0",
    [theme.breakpoints.down("lg")]: {
      fontSize: "2.5em"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2em"
    }
  },
  heroAvatar: {
    width: 100,
    height: 100,
    border: `1px solid ${theme.palette.secondary.main}`
  },
  heroButton: {
    marginTop: 50
  }
});

const Hero = React.forwardRef((props, ref) => {
  const { forwardedRef, width, classes } = props;
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
        <Button
          variant="outlined"
          color="secondary"
          className={classes.heroButton}
          onClick={() => {
            props.scroll(forwardedRef);
          }}
        >
          Say Hello
        </Button>
      </div>
      <div className={classes.heroSvgWrap}>
        <Rainbow />
      </div>
    </div>
  );
});

Hero.propTypes = {
  classes: PropTypes.object
};

export default withWidth()(withStyles(styles)(Hero));
