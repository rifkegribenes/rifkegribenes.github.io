import React from "react";
import PropTypes from "prop-types";

import github from "../img/github-lime.svg";

const Footer = props => (
  <div className={props.classes.footer}>
    <a
      href="https://github.com/rifkegribenes/rifkegribenes.github.io"
      rel="noopener noreferrer"
      target="_blank"
      className={props.classes.footerLink}
    >
      <img src={github} className={props.classes.footerIcon} alt="github" />
    </a>
  </div>
);

Footer.propTypes = {
  classes: PropTypes.object
};

export default Footer;
