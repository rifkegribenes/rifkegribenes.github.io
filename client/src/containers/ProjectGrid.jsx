import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import Delete from "@material-ui/icons/Delete";
import Create from "@material-ui/icons/Create";

import * as apiProjectActions from "../store/actions/apiProjectActions";
import Project from "../components/Project";

const styles = theme => ({
  root: {
    margin: "0 auto",
    width: "100%",
    maxWidth: 1920,
    paddingBottom: 60
  },
  section: {
    padding: "60px 0 0 0"
  },
  head: {
    color: theme.palette.secondary.main
  },
  buttonEdit: {
    position: "absolute",
    bottom: 20,
    right: 20,
    visibility: "hidden"
  },
  actionArea: {
    borderRadius: 6,
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,.05)"
    },
    "&:hover $buttonEdit": {
      visibility: "visible"
    }
  },
  gridWrapper: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "50px 0",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 0px"
    }
  },
  card: {
    width: "31%",
    padding: 20,
    margin: "10px",
    position: "relative",
    border: `1px solid ${theme.palette.secondary.main}`,
    [theme.breakpoints.down("md")]: {
      width: "47%"
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "10px 0px"
    }
  }
});

class ProjectGrid extends React.Component {
  render() {
    const { classes, forwardedRef, data, type } = this.props;
    const { loggedIn } = this.props.appState;
    return (
      <div className={classes.section} ref={forwardedRef}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          className={classes.head}
          style={{ paddingTop: 20 }}
        >
          {type === "featured" ? "Projects" : "More Projects"}
        </Typography>
        <div className={classes.gridWrapper}>
          {data.map(project => {
            const { github_url, live_url } = project;
            const link_url = live_url ? live_url : github_url;
            return (
              <div className={classes.card} key={project.id}>
                <div
                  className={classes.actionArea}
                  tabIndex={0}
                  onClick={() =>
                    loggedIn
                      ? this.props.history.push(`/edit/${project.id}`)
                      : window.open(link_url, "_blank")
                  }
                >
                  {loggedIn && (
                    <Button
                      className={classes.buttonEdit}
                      onClick={() =>
                        this.props.history.push(`/edit/${project.id}`)
                      }
                      color="primary"
                      variant="fab"
                      aria-label="Edit Project"
                    >
                      <Create />
                    </Button>
                  )}
                </div>
                <Project project={project} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

ProjectGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  listType: PropTypes.string,
  appState: PropTypes.shape({
    loggedIn: PropTypes.bool
  }),
  apiProject: PropTypes.shape({
    setFlickr: PropTypes.func,
    handleAddProjectOpen: PropTypes.func
  }),
  profile: PropTypes.shape({
    profile: PropTypes.shape({
      _id: PropTypes.string
    })
  }),
  handleDeleteDialogOpen: PropTypes.func,
  project: PropTypes.shape({
    imageSearchResults: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        url: PropTypes.string,
        snippet: PropTypes.string
      })
    ),
    loggedInUserProjects: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        imageUrl: PropTypes.string,
        siteUrl: PropTypes.string,
        title: PropTypes.string,
        userId: PropTypes.string,
        userName: PropTypes.string
      })
    ),
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        imageUrl: PropTypes.string,
        siteUrl: PropTypes.string,
        title: PropTypes.string,
        userId: PropTypes.string,
        userName: PropTypes.string
      })
    )
  })
};

const mapStateToProps = state => ({
  appState: state.appState,
  profile: state.profile,
  project: state.project
});

const mapDispatchToProps = dispatch => ({
  apiProject: bindActionCreators(apiProjectActions, dispatch)
});

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ProjectGrid)
  )
);
