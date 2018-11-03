import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary1Color: "#00e676", // dark gray
    primary2Color: "#388e3c",
    primary3Color: "#212121", // medium gray
    accent1Color: "#40c4ff",
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
    // fontFamily: [
    //   '"Titillium Web"',
    //   '"Helvetica Neue"',
    //   'Helvetica',
    //   'Arial',
    //   'sans-serif'
    // ].join(','),
    fontFamily: '"Titillium Web", sans-serif'
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
  },
  typography: {
    useNextVariants: true
  }
});
