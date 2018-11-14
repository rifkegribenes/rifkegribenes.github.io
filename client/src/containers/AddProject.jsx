import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import * as apiProjectActions from "../store/actions/apiProjectActions";

import ButtonWithSpinner from "../components/ButtonWithSpinner";

const styles = theme => ({
  root: {},
  form: {
    maxWidth: 600,
    margin: "auto"
  },
  input: {
    width: "100%",
    margin: "0 0 20px 0"
  },
  textarea: {
    width: "100%",
    margin: "0 0 20px 0"
  },
  formButton: {
    width: "100%",
    padding: 20
  }
});

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
    console.log(newProject);
    this.props.apiProject.addProject(newProject);
  };

  render() {
    const { classes } = this.props;
    // const {
    //   title,
    //   body,
    //   screnshot_url,
    //   github_url,
    //   live_url,
    //   tags
    // } = this.props.project.currentProject;
    return (
      <div style={{ padding: "20 20 0 20" }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          style={{ paddingTop: 20 }}
        >
          New Project
        </Typography>
        <form className={classes.form} onError={errors => console.log(errors)}>
          <TextField
            name="title"
            id="title"
            label="Title"
            type="text"
            variant="outlined"
            required
            value={this.props.project.form.title}
            onChange={this.props.apiProject.handleInput}
            className={classes.input}
          />
          <TextField
            name="body"
            id="body"
            label="Body"
            multiline
            variant="outlined"
            required
            value={this.props.project.form.body}
            onChange={this.props.apiProject.handleInput}
            className={classes.textarea}
          />
          <TextField
            name="screenshot_url"
            id="screenshot_url"
            label="Screenshot URL"
            type="url"
            variant="outlined"
            required
            value={this.props.project.form.screenshot_url}
            onChange={this.props.apiProject.handleInput}
            className={classes.input}
          />
          <TextField
            name="github_url"
            id="github_url"
            label="Github URL"
            type="url"
            variant="outlined"
            required
            value={this.props.project.form.github_url}
            onChange={this.props.apiProject.handleInput}
            className={classes.input}
          />
          <TextField
            name="live_url"
            id="live_url"
            label="Live URL"
            type="url"
            variant="outlined"
            required
            value={this.props.project.form.live_url}
            onChange={this.props.apiProject.handleInput}
            className={classes.input}
          />
          <TextField
            name="tags"
            id="tags"
            label="Tags"
            type="text"
            variant="outlined"
            required
            value={this.props.project.form.tags}
            onChange={this.props.apiProject.handleInput}
            className={classes.input}
          />
          <ButtonWithSpinner
            type="submit"
            color="secondary"
            className={classes.formButton}
            variant="contained"
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddProject)
);
