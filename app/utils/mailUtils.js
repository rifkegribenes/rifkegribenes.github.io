/* ================================= SETUP ================================= */

const nodemailer = require("nodemailer");
const mailgunTransport = require("nodemailer-mailgun-transport");

// Configure transport options
const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_ACTIVE_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};
const transport = mailgunTransport(mailgunOptions);
const emailClient = nodemailer.createTransport(transport);

const APP_HOST = process.env.APP_HOST;
const CLIENT_URL =
  process.env.NODE_ENV === "production" ? APP_HOST : "http://localhost:3000";
const SERVER_URL =
  process.env.NODE_ENV === "production" ? APP_HOST : "//localhost:3001";

/* =============================== UTILITIES =============================== */

/* Send email using mailgunTransport (nodemailer)
 *
 * @params    [string]   fromEmail [email address of sender]
 * @params    [string]   subject   [subject line]
 * @params    [string]   html      [html version of message]
 * @params    [string]   text      [text of message]
 *
*/
function sendMail(fromEmail, subject, html, text) {
  return new Promise((resolve, reject) => {
    emailClient.sendMail(
      {
        fromEmail,
        to: "rifkegribenes@gmail.com",
        subject,
        html,
        text
      },
      (err, info) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(info);
        }
      }
    );
  });
}

/* ============================== EXPORT API =============================== */

module.exports = { sendMail };
