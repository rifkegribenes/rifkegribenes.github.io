import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as apiProjectActions from "../store/actions/apiProjectActions";

import Button from "@material-ui/core/Button";
import ProjectGrid from "./ProjectGrid";
import { openSnackbar } from "./Notifier";

class Projects extends Component {
  componentDidMount() {
    if (this.props.data === "featured") {
      this.props.apiProject
        .getFeaturedProjects()
        .then(result => {
          if (
            result.type === "GET_FEATURED_PROJECTS_FAILURE" ||
            this.props.project.error
          ) {
            openSnackbar(
              "error",
              this.props.project.error ||
                "Sorry, something went wrong while fetching projects."
            );
          }
        })
        .catch(err => {
          console.log(err);
          openSnackbar("error", err);
        });
    } else if (this.props.data === "more") {
      console.log(this.props.data);
      this.props.apiProject
        .getMoreProjects()
        .then(result => {
          console.log(result.payload);
          if (
            result.type === "GET_MORE_PROJECTS_FAILURE" ||
            this.props.project.error
          ) {
            openSnackbar(
              "error",
              this.props.project.error ||
                "Sorry, something went wrong while fetching projects."
            );
          }
        })
        .catch(err => {
          console.log(err);
          openSnackbar("error", err);
        });
    }
  }

  render() {
    const { forwardedRef } = this.props;
    const more = this.props.data === "more";
    return (
      <div className="projectList">
        <ProjectGrid
          forwardedRef={forwardedRef}
          type={this.props.data}
          data={
            more
              ? this.props.project.moreProjects
              : this.props.project.featuredProjects
          }
        />
        {!more && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              this.props.toggleMore();
            }}
          >
            More Projects
          </Button>
        )}
      </div>
    );
  }
}

Projects.propTypes = {
  project: PropTypes.shape({
    error: PropTypes.string
  }),
  apiProject: PropTypes.shape({
    getAllProjects: PropTypes.func
  })
};

const mapStateToProps = state => ({
  project: state.project
});

const mapDispatchToProps = dispatch => ({
  apiProject: bindActionCreators(apiProjectActions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Projects)
);
