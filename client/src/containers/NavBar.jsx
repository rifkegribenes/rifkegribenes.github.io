import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import { BASE_URL } from "../store/actions/apiConfig.js";
import { skip } from "../utils";
import rainbowIcon from "../img/rainbow_icon.svg";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100vw",
    color: theme.palette.primary.main
  },
  flex: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: theme.palette.primary.main
  },
  menuButton: {
    marginLeft: 12
    // marginRight: 20,
    // [theme.breakpoints.down("xs")]: {
    //   marginRight: 0
    // }
  },
  title: {
    flexGrow: 1,
    color: theme.palette.secondary.main,
    fontFamily: '"Titillium Web", sans-serif',
    fontSize: "1.7em",
    textDecoration: "none",
    paddingLeft: 10,
    fontWeight: 200,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem"
    },
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  loginButton: {
    textDecoration: "none"
  },
  avatar: {
    marginRight: 20,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  admin: {
    display: "flex"
  },
  skip: {
    position: "absolute",
    top: "-1000px",
    left: "-1000px",
    height: "1px",
    width: "1px",
    textAlign: "left",
    overflow: "hidden",

    "&:focus": {
      position: "relative",
      top: 0,
      left: "-13px",
      width: "auto",
      height: "auto",
      overflow: "visible",
      textAlign: "center",
      zIndex: "1000"
    }
  },
  menuItem: {
    padding: "24px 16px",
    fontFamily: [
      '"Titillium Web"',
      '"Helvetica Neue"',
      "Helvetica",
      "Arial",
      "sans-serif"
    ].join(","),
    fontWeight: 400,
    color: theme.palette.secondary.main
  },
  logo: {
    height: 40,
    width: "auto",
    marginRight: 10
  }
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const { loggedIn } = this.props.appState;
    const links = ["about", "projects", "contact"];
    const linkList = !loggedIn
      ? links
      : ["about", "projects", "contact", "logout"];
    const ListItemLink = props => {
      const { primary, to, handleClose } = props;
      return (
        <MenuItem
          button
          component={Link}
          to={to}
          onClick={handleClose}
          className={classes.menuItem}
        >
          <ListItemText primary={primary} />
        </MenuItem>
      );
    };
    const menuLinks = linkList.map((link, index) => (
      <ListItemLink
        to={`/${link}`}
        key={index}
        primary={links[index]}
        handleClose={this.handleClose}
      />
    ));
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Button
              color="primary"
              variant="contained"
              className={classes.skip}
              onClick={() => skip("main")}
            >
              Skip to content &rsaquo;
            </Button>
            <img src={rainbowIcon} alt="" className={classes.logo} />
            <Typography variant="h6" color="inherit" className={classes.title}>
              <Link to="/" className={classes.title}>
                rifkegribenes.io
              </Link>
            </Typography>
            {loggedIn ? (
              <div className={classes.admin}>
                <Avatar
                  alt={this.props.profile.profile.username}
                  className={classes.avatar}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.loginButton}
                  href="/logout"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                href={`${BASE_URL}/api/auth/github`}
                className={classes.loginButton}
                onClick={() => {
                  if (this.props.location.pathname !== "/logout") {
                    window.localStorage.setItem(
                      "redirect",
                      this.props.location.pathname
                    );
                  }
                }}
              >
                Login
              </Button>
            )}
            <IconButton
              className={classes.menuButton}
              color="secondary"
              aria-label="Menu"
              aria-owns={anchorEl ? "nav-menu" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="nav-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              component="nav"
            >
              {menuLinks}
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  appState: PropTypes.shape({
    loggedIn: PropTypes.bool
  }),
  profile: PropTypes.shape({
    profile: PropTypes.shape({
      username: PropTypes.string
    })
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

const mapStateToProps = state => ({
  appState: state.appState,
  profile: state.profile
});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(NavBar)));
