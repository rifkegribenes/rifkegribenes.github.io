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
// import Avatar from "@material-ui/core/Avatar";

// import { BASE_URL } from "../store/actions/apiConfig.js";
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
    backgroundColor: theme.palette.primary.main,
    position: "fixed"
  },
  menuButton: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      position: "absolute",
      right: 20
    }
  },
  menuWrap: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  menuLink: {
    color: theme.palette.secondary.main,
    textTransform: "capitalize",
    fontSize: "1em"
  },
  title: {
    flexGrow: 1,
    color: theme.palette.secondary.main,
    fontFamily: '"Titillium Web", sans-serif',
    fontSize: "1.7em",
    textDecoration: "none",
    paddingLeft: 10,
    fontWeight: 200,
    [theme.breakpoints.down("md")]: {
      fontSize: "1.1rem",
      fontWeight: 400
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
    const { about_ref, contact_ref, projects_ref, classes } = this.props;
    const refsObj = {
      about_ref,
      contact_ref,
      projects_ref
    };
    const { anchorEl } = this.state;
    const { loggedIn } = this.props.appState;
    const links = ["about", "projects", "contact"];
    const adminLinks = ["new", "logout"];
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
    const mobileLinks = links.map((link, index) => (
      <ListItemLink
        to={`/${link}`}
        key={index}
        primary={link}
        handleClose={this.handleClose}
      />
    ));
    const adminMenuLinks = adminLinks.map((link, index) => {
      return (
        <Button key={index} className={classes.menuLink} href={`/${link}`}>
          {link}
        </Button>
      );
    });
    const menuLinks = links.map((link, index) => {
      const linkRef = refsObj[`${link}_ref`];
      return (
        <Button
          key={index}
          className={classes.menuLink}
          onClick={() => {
            console.log(linkRef);
            if (this.props.location.pathname === "/") {
              console.log("homepage: scroll");
              this.props.scroll(linkRef);
            } else {
              console.log("other page: redirect");
              this.props.history.push(`/#${link}`);

              // this.props.history.push(`/${link}`);
            }
          }}
        >
          {link}
        </Button>
      );
    });
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
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
              {mobileLinks}
            </Menu>
            {loggedIn ? (
              <nav className={classes.menuWrap}>
                {menuLinks}
                {adminMenuLinks}
              </nav>
            ) : (
              <nav className={classes.menuWrap}>{menuLinks}</nav>
            )}
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
