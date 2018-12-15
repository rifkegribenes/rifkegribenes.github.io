import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as apiProjectActions from "../store/actions/apiProjectActions";

import ProjectGrid from "./ProjectGrid";
import { openSnackbar } from "./Notifier";

class AllProjects extends Component {
  componentDidMount() {
    this.props.apiProject
      .getAllProjects()
      .then(result => {
        if (
          result.type === "GET_ALL_PROJECTS_FAILURE" ||
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

  render() {
    const { forwardedRef } = this.props;
    return (
      <div className="projectList">
        <ProjectGrid forwardedRef={forwardedRef} />
      </div>
    );
  }
}

AllProjects.propTypes = {
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
  )(AllProjects)
);
