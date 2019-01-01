import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withWidth from "@material-ui/core/withWidth";
import Rainbow from "./Rainbow";
import legos from "../img/isometric_legos_animated.svg";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    margin: 0,
    padding: 20
  },
  hero: {
    display: "flex",
    flexDirection: "column",
    margin: "60px 0 -60px",
    minHeight: "calc(100vh - 146px)"
  },
  heroRainbowWrap: {
    minHeight: 200,
    width: "100%",
    margin: "20px 0 60px 0",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      marginBottom: 40,
      minHeight: "42vw"
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 40,
      minHeight: "28vw"
    }
  },
  heroSvgWrap: {
    maxWidth: "30vh",
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
    minHeight: "30vh"
  },
  legos: {
    width: "100%",
    maxWidth: 600,
    height: "auto"
  },
  heroText: {
    backgroundColor: theme.palette.bodyBackground,
    width: "100%",
    maxWidth: 900,
    margin: "0 auto",
    [theme.breakpoints.up("md")]: {
      minWidth: "50%"
    }
  },
  heroHead: {
    fontSize: "4.6em",
    textAlign: "center",
    backgroundColor: theme.palette.bodyBackground,
    [theme.breakpoints.down("md")]: {
      fontSize: "4em"
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
  heroButtonWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  }
});

const Hero = React.forwardRef((props, ref) => {
  const { forwardedRef, classes } = props;
  return (
    <div className={classes.hero}>
      <div className={classes.heroRainbowWrap}>
        <Rainbow />
      </div>
      <div className={classes.heroText}>
        <Typography variant="h2" className={classes.heroHead}>
          Hello!
          <br />
          What do you want to build?
        </Typography>
      </div>
      <div className="long-screen">
        <div className={classes.heroSvgWrap}>
          <img src={legos} alt="legos" className={classes.legos} />
        </div>
      </div>
      <div className={classes.heroButtonWrap}>
        <Button
          variant="outlined"
          color="secondary"
          className="heroButton"
          onClick={() => {
            props.scroll(forwardedRef);
          }}
        >
          Get in touch
        </Button>
      </div>
    </div>
  );
});

Hero.propTypes = {
  classes: PropTypes.object
};

export default withWidth()(withStyles(styles)(Hero));
