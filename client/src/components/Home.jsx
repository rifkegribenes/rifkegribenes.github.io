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
    marginTop: 20,
    fontSize: "2em"
  },
  homeHead: {
    color: theme.palette.secondary.main
  },
  section: {
    marginBottom: 60,
    paddingTop: 100
  },
  tag: {
    padding: "7px 19px 8px;",
    margin: 10,
    border: `1px solid ${theme.palette.secondary.main}`,
    // textTransform: "capitalize",
    fontWeight: 100
  },
  tagText: {
    // display: "inline-block",
    color: theme.palette.secondary.main,
    fontSize: "1.2em"
  },
  tags: {
    margin: "20px -5px 10px",
    display: "flex",
    flexWrap: "wrap"
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
    const tag_names = [
      "React",
      "Redux",
      "Node",
      "Express",
      "Firebase",
      "OAuth",
      "Passport",
      "MongoDB",
      "Postgres",
      "Knex",
      "WebSockets",
      "Mocha",
      "Chai",
      "es6",
      "Python",
      "Flask",
      "Material UI",
      "Bootstrap",
      "jQuery",
      "Sass",
      "Less",
      "Stylus",
      "Vue",
      "D3"
    ];
    const tags = tag_names.map((tag, idx) => (
      <span className={classes.tag} key={`${tag}-${idx}`}>
        <Typography component="div" className={classes.tagText}>
          {tag}
        </Typography>
      </span>
    ));
    return (
      <div className={classes.home}>
        <div className={classes.homeText}>
          <div className={classes.section} ref={forwardedRef}>
            <Typography variant="h2" className={classes.homeHead}>
              About
            </Typography>
            <Typography variant="body1" className={classes.homeBody}>
              I'm a full-stack engineer and UI/UX designer with 18 years of
              experience building beautiful, interactive, fully-tested web
              applications in the JavaScript ecosystem. I'm passionate about
              developing technology for organizers and activists, and I've been
              working with labor unions and social justice organizations since
              1991. I like solving problems with code.
            </Typography>
          </div>
          <div>
            <Typography variant="h2" className={classes.homeHead}>
              Skills
            </Typography>
            <div className={classes.tags}>{tags}</div>
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
