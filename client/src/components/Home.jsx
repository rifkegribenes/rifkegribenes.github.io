import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    margin: 20,
    // padding: 20,
    maxWidth: 1200
  },
  home: {},
  homeText: {
    margin: "20px 0",
    // padding: "20px 60px",
    maxWidth: 1200
  },
  homeBody: {
    fontSize: "2em"
  },
  homeHead: {
    color: theme.palette.secondary.main
  },
  section: {
    marginBottom: 40,
    paddingTop: 100
  }
});

class Home extends React.Component {
  componentDidMount() {
    if (this.props.location.hash) {
      // check if hash is anchor link or deep link
      const anchorLink = this.props.location.hash.slice(1);
      const anchorLinks = ["projects", "contact", "about"];
      if (anchorLinks.indexOf(anchorLink) === -1) {
        const hash = this.props.location.hash.slice(2);
        const url = `/${hash.split("=")[1]}`;
        this.props.history.push(url);
      }
    }
  }

  render() {
    const {
      forwardedRef,
      about_ref,
      contact_ref,
      projects_ref,
      classes
    } = this.props;
    if (this.props.location.hash && projects_ref) {
      // check for hash fragment to set page scroll position
      const anchorLink = this.props.location.hash.slice(1);
      const anchorLinks = ["projects", "contact", "about"];
      if (anchorLinks.indexOf(anchorLink) !== -1) {
        const refsObj = {
          about_ref,
          contact_ref,
          projects_ref
        };
        const linkRef = refsObj[`${anchorLink}_ref`];
        if (linkRef.current) {
          this.props.scroll(linkRef);
        }
      }
    }
    return (
      <div className={classes.home}>
        <div className={classes.homeText}>
          <div className={classes.section} ref={forwardedRef}>
            <Typography variant="h2" className={classes.homeHead}>
              About
            </Typography>
            <Typography variant="body1" className={classes.homeBody}>
              I'm a full-stack JavaScript engineer and UI/UX designer with 18
              years of experience building beautiful, interactive web
              applications. I'm passionate about developing technology for
              organizers and activists. I like solving problems with code.
            </Typography>
          </div>
          <div>
            <Typography variant="h2" className={classes.homeHead}>
              Skills
            </Typography>
            <Typography variant="body1" className={classes.homeBody}>
              Blah blah blah
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Home);
