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
        fontWeight: 400
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
