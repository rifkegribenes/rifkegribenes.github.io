import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import * as apiProjectActions from "../store/actions/apiProjectActions";

import ButtonWithSpinner from "../components/ButtonWithSpinner";

class AddProject extends React.Component {
  saveProject = e => {
    const {
      title,
      body,
      screnshot_url,
      github_url,
      live_url,
      tags
    } = this.props.project.form;
    const newProject = {
      title,
      body,
      screnshot_url,
      github_url,
      live_url,
      tags
    };
    this.props.apiProject.addProject(newProject);
  };

  render() {
    const dialog = this.props.type === "dialog";
    const { classes } = this.props;
    const {
      title,
      body,
      screnshot_url,
      github_url,
      live_url,
      tags
    } = this.props.project.currentProject;
    return (
      <div style={{ padding: "20 20 0 20" }}>
        <Typography
          variant="headline"
          align="center"
          gutterBottom
          style={{ paddingTop: 20 }}
        >
          New Project
        </Typography>
        <form className={classes.form} onError={errors => console.log(errors)}>
          <TextField
            name="imageUrl"
            id="imageUrl"
            label="Image URL"
            type="url"
            variant="outlined"
            required
            value={dialog ? imageUrl || url : this.props.project.form.imageUrl}
            onChange={this.props.apiProject.handleInput}
            InputProps={{
              className: inputClass
            }}
            className={dialog ? classes.hidden : classes.input}
          />
          <TextField
            name="siteUrl"
            id="siteUrl"
            label="Website URL"
            type="url"
            variant="outlined"
            required
            value={
              dialog ? siteUrl || context : this.props.project.form.siteUrl
            }
            onChange={this.props.apiProject.handleInput}
            InputProps={{
              className: inputClass
            }}
            className={dialog ? classes.hidden : classes.input}
          />
          <TextField
            name="title"
            id="title"
            label="Title"
            type="text"
            variant="outlined"
            value={title}
            required
            onChange={this.props.apiProject.handleInput}
            className={classes.input}
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            type="text"
            value={description}
            onChange={this.props.apiProject.handleInput}
            className={classes.input}
          />
          <ButtonWithSpinner
            type="submit"
            color="primary"
            className={classes.button}
            variant="raised"
            onClick={this.saveProject}
            loading={this.props.project.loading}
          >
            Save project
          </ButtonWithSpinner>
        </form>
      </div>
    );
  }
}

AddProject.propTypes = {
  type: PropTypes.string,
  project: PropTypes.shape({
    form: PropTypes.shape({
      imageUrl: PropTypes.string,
      siteUrl: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string
    }),
    loading: PropTypes.bool,
    currentProject: PropTypes.shape({
      imageUrl: PropTypes.string,
      siteUrl: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string
    })
  }).isRequired,
  apiProject: PropTypes.shape({
    handleInput: PropTypes.func,
    addProject: PropTypes.func
  }),
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  classes: PropTypes.object
};

const mapStateToProps = state => ({
  project: state.project
});

const mapDispatchToProps = dispatch => ({
  apiProject: bindActionCreators(apiProjectActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProject);
