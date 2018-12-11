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
  home: {},
  homeText: {
    margin: 20,
    padding: "20px 60px",
    maxWidth: 1200
  },
  section: {
    marginBottom: 40
  }
});

const Home = props => {
  const { classes } = props;
  return (
    <div className={classes.home}>
      <div className={classes.homeText}>
        <div className={classes.section}>
          <Typography variant="h2">About</Typography>
          <Typography variant="body1" className={classes.heroBody}>
            I'm a full-stack JavaScript engineer and UI/UX designer with 25
            years of experience working with labor and social justice
            organiations. I like solving problems with code.
          </Typography>
        </div>
        <div className={classes.section}>
          <Typography variant="h2">Skills</Typography>
          <Typography variant="body1">Blah blah blah</Typography>
        </div>
        <div className={classes.section}>
          <Typography variant="h2">Contact</Typography>
          <Typography variant="body1">Blah blah blah</Typography>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Home);
