import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      main: "rgb(10,10,10)" // dark gray
    },
    secondary: {
      main: "#76ff03" // lime green
    },
    textColor: "rgba(255, 255, 255, 0.87)",
    secondaryTextColor: "#9e9e9e",
    bodyBackground: "rgb(48,48,48)",
    type: "dark"
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      lg: 960,
      xl: 1280
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      '"Titillium Web"',
      '"Helvetica Neue"',
      "Helvetica",
      "Arial",
      "sans-serif"
    ].join(",")
  },
  overrides: {
    MuiMenu: {
      paper: {
        position: "absolute",
        top: "56px !important",
        right: "0 !important",
        left: "50% !important",
        borderRadius: "0 !important",
        bottom: "0 !important",
        maxHeight: "calc(100vh - 109px) !important",
        filter: "none !important"
      }
    },
    MuiButton: {
      root: {
        borderRadius: 0,
        fontFamily: [
          '"Titillium Web"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif"
        ].join(","),
        fontWeight: 400,
        textDecoration: "none"
      }
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "secondary"
        }
      },
      focused: {
        "&$focused": {
          color: "secondary"
        }
      }
    },
    "MuiButton-outlinedSecondary": {
      border: 2
    },
    MuiTypography: {
      root: {
        fontFamily: [
          '"Titillium Web"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif"
        ].join(",")
      }
    }
  }
});
