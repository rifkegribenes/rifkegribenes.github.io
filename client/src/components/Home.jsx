import React from "react";
import PropTypes from "prop-types";
import Fade from "react-reveal/Fade";
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
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "middle",
    maxWidth: 600
  },
  homeBody: {
    marginTop: 20,
    fontSize: "1.2em"
  },
  homeHead: {
    color: theme.palette.secondary.main
  },
  section: {
    margin: "0 auto 30px auto",
    paddingTop: 100,
    maxWidth: 600
  },
  tag: {
    color: "white",
    display: "inline-block",
    fontWeight: 100,
    "&::after": {
      content: "",
      width: "1em"
    },
    "&:last-child": {
      "&::after": {
        content: null
      }
    }
  },
  tagText: {
    // display: "inline-block",
    color: theme.palette.secondary.main,
    fontSize: "1em"
  },
  tagHeading: {
    color: theme.palette.secondary.main
  },
  tags: {
    margin: "20px -5px 10px"
  },
  gridWrapper: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "50px 0",
    [theme.breakpoints.down("sm")]: {
      padding: 10
    }
  },
  card: {
    width: "23%",
    padding: 20,
    margin: "10px",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      width: "47%"
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  cardHead: {
    fontSize: "1em",
    color: "white"
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
    const tag_names = {
      js: ["es6", "React", "Vue", "D3", "jQuery"],
      css: ["Material UI", "Bootstrap", "Sass", "Less", "Stylus"],
      backEnd: [
        "Node",
        "Express",
        "Firebase",
        "MongoDB",
        "Postgres",
        "Python",
        "Flask"
      ],
      testing: ["Mocha", "Chai", "Enzyme", "Jest"]
    };
    const tags = section =>
      tag_names[section].map((tag, idx) => (
        <span className={classes.tag} key={`${tag}-${idx}`}>
          {tag}
        </span>
      ));
    const tagHeadings = Object.keys(tag_names).map((heading, idx) => (
      <span className={classes.tagHeading} key={`${heading}-${idx}`}>
        {heading}: {tags(heading)}
      </span>
    ));
    return (
      <div className={classes.home}>
        <div className={classes.homeText}>
          <div className={classes.section} ref={forwardedRef}>
            <Typography
              variant="h2"
              align="center"
              className={classes.homeHead}
            >
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
          <Fade bottom>
            <div>
              <Typography
                variant="h2"
                align="center"
                className={classes.homeHead}
              >
                Skills
              </Typography>
              <Typography variant="body1" className={classes.homeBody}>
                {tagHeadings}
              </Typography>
            </div>
          </Fade>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Home);
