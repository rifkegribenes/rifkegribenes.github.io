import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import * as apiContactActions from "../store/actions/apiContactActions";

import { openSnackbar } from "./Notifier";
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

class ContactForm extends React.Component {
  componentDidMount() {}

  sendMessage = () => {
    const { name, fromEmail, subject, body } = this.props.contact.form;
    const message = {
      name,
      fromEmail,
      subject,
      body
    };
    this.props.apiContact
      .sendEmail(message)
      .then(result => {
        if (result === "SEND_EMAIL_FAILURE" || this.props.contact.error) {
          openSnackbar(
            "error",
            this.props.contact.error ||
              "An error occured while trying to send your messagee."
          );
        } else {
          openSnackbar("success", "Message sent.");
          this.props.apiContact.clearForm();
        }
      })
      .catch(err => openSnackbar("error", err));
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ padding: "20 20 0 20" }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          style={{ paddingTop: 20 }}
        >
          Say Hello
        </Typography>
        <form className={classes.form} onError={errors => console.log(errors)}>
          <TextField
            name="name"
            id="name"
            label="Name"
            type="text"
            variant="outlined"
            required
            value={this.props.contact.form.name}
            onChange={this.props.apiContact.handleInput}
            className={classes.input}
          />
          <TextField
            name="fromEmail"
            id="fromEmail"
            label="Email"
            type="email"
            variant="outlined"
            required
            value={this.props.contact.form.fromEmail}
            onChange={this.props.apiContact.handleInput}
            className={classes.input}
          />
          <TextField
            name="subject"
            id="subject"
            label="Subject"
            type="text"
            variant="outlined"
            required
            value={this.props.contact.form.subject}
            onChange={this.props.apiContact.handleInput}
            className={classes.input}
          />
          <TextField
            name="body"
            id="body"
            label="Message"
            multiline
            variant="outlined"
            required
            value={this.props.contact.form.body}
            onChange={this.props.apiContact.handleInput}
            className={classes.textarea}
          />
          <ButtonWithSpinner
            type="button"
            color="secondary"
            className={classes.formButton}
            variant="contained"
            onClick={() => this.sendEmail()}
            loading={this.props.contacg.loading}
          >
            Send email
          </ButtonWithSpinner>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  type: PropTypes.string,
  contact: PropTypes.shape({
    form: PropTypes.shape({
      name: PropTypes.string,
      fromEmail: PropTypes.string,
      subject: PropTypes.string,
      body: PropTypes.string
    }),
    loading: PropTypes.bool
  }).isRequired,
  apiContact: PropTypes.shape({
    handleInput: PropTypes.func,
    sendEmail: PropTypes.func,
    clearForm: PropTypes.func
  }),
  classes: PropTypes.object
};

const mapStateToProps = state => ({
  contact: state.contact
});

const mapDispatchToProps = dispatch => ({
  apiProject: bindActionCreators(apiContactActions, dispatch)
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContactForm)
);
