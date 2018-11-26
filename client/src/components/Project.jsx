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
  metaWrap: {
    padding: 40,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 10px",
      width: "100%"
    }
  },
  pinButton: {
    width: 100
  },
  siteLink: {
    marginTop: 15
  },
  pinIcon: {
    height: 27,
    marginLeft: -9,
    width: "auto"
  },
  arrow: {
    height: 20,
    width: "auto"
  },
  owner: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      marginTop: 10,
      padding: "0 10px"
    }
  },
  userName: {
    marginLeft: 10,
    textDecoration: "none",
    "&:hover": {
      borderBottom: "1px dotted #ccc"
    }
  },
  imageWrap: {
    position: "relative",
    width: 500,
    maxWidth: "100%",
    display: "flex",
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      padding: 0
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
  container: {
    width: "100%",
    height: "100%",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 40,
    alignItems: "flex-start",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap"
    }
  },
  item: {
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap"
    }
  },
  divider: {
    margin: "20px 0px"
  },
  actionArea: {
    borderRadius: 6,
    zIndex: 1,
    width: 500,
    maxWidth: "100%",
    cursor: "zoom-in",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,.05)"
    },
    "&:hover $pinButton": {
      visibility: "visible"
    },
    "&:hover $deleteButton": {
      visibility: "visible"
    }
  },
  ownerInfo: {
    display: "flex",
    alignItems: "center",
    fontWeight: 100,
    textDecoration: "none"
  },
  pinInfo: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "0 10px"
    }
  },
  avatar: {},
  title: {
    fontSize: 36,
    fontWeight: 100,
    marginTop: 20,
    textTransform: "capitalize"
  },
  description: {
    fontSize: "1.1em",
    fontWeight: 100,
    marginTop: 10
  },
  error: {
    fontWeight: 400,
    color: theme.palette.error.main,
    textAlign: "center"
  },
  spinner: {
    position: "absolute",
    left: "calc(50% - 10px)",
    top: "calc(50% - 10px)"
  }
});

const Project = props => {
  const { classes, project } = props;
  const {
    title,
    body,
    // screenshot_url,
    // github_url,
    // live_url,
    tag_names
  } = project;
  return (
    <div className={classes.container}>
      <Typography component="h2" className={classes.title}>
        {title}
      </Typography>
      <Typography component="p" className={classes.body}>
        {body}
      </Typography>
      <Typography component="p" className={classes.tags}>
        {tag_names.join(", ")}
      </Typography>
    </div>
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
