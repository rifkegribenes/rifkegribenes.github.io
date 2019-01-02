import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import Rainbow from "./Rainbow";
import legos from "../img/isometric_legos_animated.svg";
import { glow } from "../utils";

const styles = theme => ({
  root: {
    margin: 0,
    padding: 20
  },
  hero: {
    display: "flex",
    flexDirection: "column",
    margin: "30px 0 0 0",
    minHeight: "calc(100vh - 120px)",
    [theme.breakpoints.down("md")]: {
      minHeight: "calc(100vh - 40px)"
    },
    paddingBottom: 126
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
    flex: 1,
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
  }
});

class Hero extends React.Component {
  componentDidMount() {
    glow();
  }

  render() {
    const { forwardedRef, classes } = this.props;
    return (
      <div className={classes.hero}>
        <div className="heroRainbowWrap">
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
          <div className="heroSvgWrap">
            <img src={legos} alt="legos" className={classes.legos} />
          </div>
        </div>
        <div className="heroButtonWrap">
          <Button
            variant="outlined"
            color="secondary"
            className="heroButton"
            onClick={() => {
              this.props.scroll(forwardedRef);
            }}
          >
            Get in touch
          </Button>
        </div>
      </div>
    );
  }
}

Hero.propTypes = {
  classes: PropTypes.object
};

export default withWidth()(withStyles(styles)(Hero));
