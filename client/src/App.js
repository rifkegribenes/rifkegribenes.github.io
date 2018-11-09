import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";

import * as Actions from "./store/actions";
import * as apiProjectActions from "./store/actions/apiProjectActions";
import * as apiProfileActions from "./store/actions/apiProfileActions";

import NavBar from "./containers/NavBar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import AlertDialog from "./components/AlertDialog";
import Dashboard from "./containers/Dashboard";
import Logout from "./containers/Logout";

import Notifier, { openSnackbar } from "./containers/Notifier";
import nodeAnimation from "./utils/nodeAnimation";

const styles = theme => ({
  root: {
    flexGrow: 1
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
    [theme.breakpoints.down("sm")]: {
      padding: 0
    },
    margin: "auto",
    height: "100%",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  hero: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap"
    }
  },
  heroSvgWrap: {
    height: "100%",
    minHeight: "80vh",
    width: "100%",
    padding: "60px 60px 60px 0"
  },
  heroCanvas: {
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    margin: "0 auto",
    padding: "73px 0 63px 0"
  },
  heroSvg: {
    maxHeight: "80vh",
    width: "auto"
  },
  heroText: {
    padding: 60,
    width: "100%",
    maxWidth: 900,
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      padding: 20
    }
  },
  heroHead: {
    fontSize: "6.75em",
    [theme.breakpoints.down("md")]: {
      fontSize: "4.75em"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "3em"
    }
  },
  heroBody: {
    color: theme.palette.secondary.light,
    fontSize: "3.5em",
    padding: "40px 0",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.5em"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2em"
    }
  },
  heroAvatar: {
    width: 100,
    height: 100,
    border: `1px solid ${theme.palette.secondary.main}`
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
    fill: theme.palette.secondary.main
  }
});

class App extends Component {
  state = {
    deleteDialogOpen: false,
    animation: false
  };

  componentDidMount() {
    if (document.getElementById("canvas") && !this.state.animation) {
      nodeAnimation();
      const newState = { ...this.state };
      newState.animation = true;
      this.setState(newState);
    }

    if (this.props.location.hash) {
      const hash = this.props.location.hash.slice(2);
      const url = `/${hash.split("=")[1]}`;
      this.props.history.push(url);
    }
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
        console.log("no token found in local storage");
      }
    } else {
      // console.log("logged in");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.animation && document.getElementById("canvas")) {
      nodeAnimation();
      const newState = { ...this.state };
      newState.animation = true;
      this.setState(newState);
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
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
        <Notifier />
        <main className="main" id="main">
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
                <Hero classes={this.props.classes} {...routeProps} />
              )}
            />
            <Route
              path="/admin/:id?/:token?"
              render={routeProps => <Dashboard {...routeProps} />}
            />
            {/*            <Route
              path="/mypins"
              render={routeProps => (
                <UserPins
                  removePin={this.removePin}
                  handleDeleteDialogOpen={this.handleDeleteDialogOpen}
                  {...routeProps}
                />
              )}
            />
            <Route
              path="/userpins/:userId"
              render={routeProps => (
                <UserPins
                  removePin={this.removePin}
                  handleDeleteDialogOpen={this.handleDeleteDialogOpen}
                  {...routeProps}
                />
              )}
            />
            <Route
              path="/pin/:pinId"
              render={routeProps => (
                <SinglePin
                  removePin={this.removePin}
                  handleDeleteDialogOpen={this.handleDeleteDialogOpen}
                  handleDeleteDialogClose={
                    this.props.apiPin.handleDeleteDialogClose
                  }
                  {...routeProps}
                />
              )}
            />
            <Route
              path="/new"
              render={routeProps => (
                <AddPin
                  addPin={this.addPin}
                  setRedirect={this.setRedirect}
                  {...routeProps}
                />
              )}
            />
            <Route
              path="/all"
              render={routeProps => <AllPins {...routeProps} />}
            />*/}
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
