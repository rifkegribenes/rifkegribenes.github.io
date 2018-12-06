import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    margin: 20,
    padding: 20,
    maxWidth: 1200
  },
  home: {}
});

const Home = props => {
  const { classes } = props;
  return (
    <div className={classes.home}>
      <div className={classes.homeText}>
        <Typography variant="h2">About</Typography>
        <Typography variant="body1">Blah blah blah</Typography>
        <Typography variant="h2">Skills</Typography>
        <Typography variant="body1">Blah blah blah</Typography>
        <Typography variant="h2">Contact</Typography>
        <Typography variant="body1">Blah blah blah</Typography>
      </div>
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Home);
