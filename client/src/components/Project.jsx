import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    margin: 20,
    padding: 20,
    maxWidth: 1200
  },
  button: {
    margin: theme.spacing.unit,
    flex: "0 0 auto",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      right: 7,
      top: 20,
      flex: "1 1 auto"
    }
  },
  deleteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    visibility: "hidden",
    zIndex: 2
  },
  contentBold: {
    fontWeight: 700
  },
  contentLight: {
    fontWeight: 100
  },
  contentRegular: {
    fontWeight: 400
  },
  project: {},
  title: {
    fontSize: 36,
    fontWeight: 100,
    marginTop: 20,
    textTransform: "capitalize",
    lineHeight: "1em"
  },
  body: {
    fontSize: "1.1em",
    fontWeight: 100,
    marginTop: 10
  },
  spinner: {
    position: "absolute",
    left: "calc(50% - 10px)",
    top: "calc(50% - 10px)"
  },
  tag: {
    padding: "3px 5px",
    margin: 5,
    border: `1px solid ${theme.palette.secondary.main}`,
    textTransform: "capitalize",
    fontWeight: 100
  },
  tagText: {
    display: "inline",
    color: theme.palette.secondary.main
  },
  tags: {
    margin: "20px -5px 10px"
  },
  cardImage: {
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    filter: "contrast(70%)",
    overflow: "hidden",
    position: "relative",
    transition: "filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91)",
    "&::before": {
      paddingTop: "66.6%",
      content: "",
      display: "block",
      [theme.breakpoints.down("md")]: {
        paddingTop: "56.25%"
      }
    }
  }
});

const Project = props => {
  const { classes, project } = props;
  const {
    title,
    body,
    screenshot_url,
    // github_url,
    // live_url,
    tag_names
  } = project;
  const tags = tag_names.map((tag, idx) => (
    <span className={classes.tag} key={`${tag}-${idx}`}>
      <Typography component="span" className={classes.tagText}>
        {tag}
      </Typography>
    </span>
  ));
  return (
    <React.fragment>
      <div
        className={classes.cardImage}
        style={`backgroundImage: ${screenshot_url}`}
      />
      <div className={classes.cardContent}>
        <Typography component="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography component="p" className={classes.body}>
          {body}
        </Typography>
        <div className={classes.tags}>{tags}</div>
      </div>
    </React.fragment>
  );
};

Project.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    screenshot_url: PropTypes.string,
    github_url: PropTypes.string,
    live_url: PropTypes.string,
    tag_names: PropTypes.arrayOf(PropTypes.string)
  }),
  classes: PropTypes.object
};

export default withStyles(styles)(Project);
