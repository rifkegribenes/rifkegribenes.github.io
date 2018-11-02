import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  appBar: {
    color: "#212121",
    textColor: "#69f0ae"
  },
  palette: {
    primary1Color: "#00e676",
    primary2Color: "#388e3c",
    accent1Color: "#40c4ff",
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
  overrides: {},
  typography: {
    useNextVariants: true
  }
});
