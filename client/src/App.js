import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import smoothscroll from "smoothscroll-polyfill";
import Fade from "react-reveal/Fade";

import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";

import * as Actions from "./store/actions";
import * as apiProjectActions from "./store/actions/apiProjectActions";
import * as apiProfileActions from "./store/actions/apiProfileActions";

import NavBar from "./containers/NavBar";
import Hero from "./components/Hero";
import Home from "./components/Home";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import AlertDialog from "./components/AlertDialog";
import Dashboard from "./containers/Dashboard";
import Logout from "./containers/Logout";
import AddProject from "./containers/AddProject";
import Projects from "./containers/Projects";
import ContactForm from "./containers/ContactForm";

import Notifier, { openSnackbar } from "./containers/Notifier";

const styles = theme => ({
  root: {
    flexGrow: 1,
    boxSizing: "border-box"
  },
  notFound: {
    height: "80vh",
    width: "auto",
    marginTop: "-60px"
  },
  container: {
    maxWidth: 1200,
    padding: 60,
    [theme.breakpoints.down("md")]: {
      padding: 20
    },
    margin: "auto",
    height: "100%",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  message: {
    margin: "auto",
    width: "50%",
    textAlign: "center",
    height: "50%",
    lineHeight: "2em"
  },
  row: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap"
    }
  },
  button: {
    height: 100,
    margin: "20px auto",
    width: 100
  },
  footer: {
    width: "100vw",
    margin: "auto",
    position: "fixed",
    backgroundColor: theme.palette.primary.main,
    bottom: 0,
    padding: 5,
    height: 73,
    [theme.breakpoints.down("sm")]: {
      height: 53
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "middle",
    boxShadow: "0 1px 5px 2px rgba(0,0,0,.2)",
    zIndex: 2
  },
  footerIcon: {
    width: 30,
    height: "auto",
    marginTop: 15,
    [theme.breakpoints.down("sm")]: {
      marginTop: 5
    },
    fill: theme.palette.secondary.main
  },
  spinner: {
    margin: theme.spacing.unit,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.contact_ref = React.createRef();
    this.about_ref = React.createRef();
    this.projects_ref = React.createRef();
    this.skills_ref = React.createRef();
    this.state = {
      deleteDialogOpen: false,
      animation: false,
      more: false
    };
  }

  scroll(ref) {
    ref.current.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  toggleMore = () => {
    const newState = { ...this.state };
    newState.more = !this.state.more;
    this.setState(newState);
  };

  componentDidMount() {
    smoothscroll.polyfill();

    // If not logged in, check local storage for authToken
    // if it doesn't exist, it returns the string "undefined"
    if (!this.props.appState.loggedIn) {
      let token = window.localStorage.getItem("authToken");
      if (token && token !== "undefined") {
        token = JSON.parse(token);
        const userId = JSON.parse(window.localStorage.getItem("userId"));
        if (userId) {
          this.props.apiProfile.validateToken(token, userId).then(result => {
            if (result === "VALIDATE_TOKEN_FAILURE") {
              window.localStorage.clear();
            } else if (result === "VALIDATE_TOKEN_SUCESS") {
            }
          });
        }
      } else {
        // console.log("no token found in local storage");
      }
    } else {
      // console.log("logged in");
    }
  }

  handleDeleteDialogOpen = project => {
    if (project) {
      if (!this.props.appState.loggedIn) {
        openSnackbar("error", "Please log in to delete a project");
        return;
      } else {
        this.props.apiProject.handleDeleteOpen(project);
      }
    }
  };

  render() {
    const { deleteDialogOpen, currentProject } = this.props.project;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar
          scroll={this.scroll}
          contact_ref={this.contact_ref}
          about_ref={this.about_ref}
          projects_ref={this.projects_ref}
          skills_ref={this.skills_ref}
        />
        <Notifier />
        <main className={classes.container} id="main">
          {deleteDialogOpen && (
            <AlertDialog
              open={deleteDialogOpen}
              handleClose={this.handleDeleteDialogClose}
              content={`Delete Project?`}
              action={() => {
                this.deleteProject(currentProject);
                this.props.apiProject.handleDeleteClose();
              }}
              buttonText="Delete"
            />
          )}
          <Switch>
            <Route
              exact
              path="/"
              render={routeProps => (
                <React.Fragment>
                  <Hero
                    scroll={this.scroll}
                    forwardedRef={this.contact_ref}
                    {...routeProps}
                  />
                  <Fade bottom>
                    <Home
                      forwardedRef={this.about_ref}
                      contact_ref={this.contact_ref}
                      about_ref={this.about_ref}
                      projects_ref={this.projects_ref}
                      skills_ref={this.skills_ref}
                      scroll={this.scroll}
                      {...routeProps}
                    />
                  </Fade>
                  <Fade bottom>
                    <Projects
                      data="featured"
                      forwardedRef={this.projects_ref}
                      toggleMore={this.toggleMore}
                      more={this.state.more}
                      classes={this.props.classes}
                      {...routeProps}
                    />
                  </Fade>
                  {this.state.more && (
                    <Fade bottom>
                      <Projects
                        data="more"
                        classes={this.props.classes}
                        {...routeProps}
                      />
                    </Fade>
                  )}
                  <Fade bottom>
                    <ContactForm
                      forwardedRef={this.contact_ref}
                      {...routeProps}
                    />
                  </Fade>
                </React.Fragment>
              )}
            />
            <Route
              path="/admin/:id?/:token?"
              render={routeProps => <Dashboard {...routeProps} />}
            />
            <Route
              path="/new"
              render={routeProps => (
                <AddProject setRedirect={this.setRedirect} {...routeProps} />
              )}
            />
            <Route
              path="/edit/:id"
              render={routeProps => (
                <AddProject
                  edit={true}
                  setRedirect={this.setRedirect}
                  {...routeProps}
                />
              )}
            />
            <Route
              path="/contact"
              render={routeProps => <ContactForm {...routeProps} />}
            />
            <Route
              path="/logout"
              render={routeProps => (
                <Logout classes={this.props.classes} {...routeProps} />
              )}
            />
            <Route
              path="*"
              render={routeProps => (
                <NotFound classes={this.props.classes} {...routeProps} />
              )}
            />
          </Switch>
        </main>
        <Footer classes={this.props.classes} />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  appState: PropTypes.shape({
    loggedIn: PropTypes.bool,
    authToken: PropTypes.string
  }).isRequired,
  apiProfile: PropTypes.shape({
    validateToken: PropTypes.func
  }).isRequired,
  apiProject: PropTypes.shape({
    addProject: PropTypes.func,
    deleteProject: PropTypes.func,
    clearForm: PropTypes.func
  }).isRequired,
  project: PropTypes.shape({
    form: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
      screenshot_url: PropTypes.string,
      github_url: PropTypes.string,
      live_url: PropTypes.string,
      dialogOpen: PropTypes.bool
    }),
    error: PropTypes.string,
    deleteDialogOpen: PropTypes.bool,
    currentProject: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
      screenshot_url: PropTypes.string,
      github_url: PropTypes.string,
      live_url: PropTypes.string
    })
  }).isRequired,
  profile: PropTypes.shape({
    profile: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string
    })
  }).isRequired
};

const mapStateToProps = state => ({
  appState: state.appState,
  profile: state.profile,
  project: state.project
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
  apiProject: bindActionCreators(apiProjectActions, dispatch),
  apiProfile: bindActionCreators(apiProfileActions, dispatch)
});

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(App)
  )
);
